import { Richtext } from "../Libraries/Richtext";
import { RichTextEditorView } from "./Views/RichTextEditor";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class RichtextEditor extends UIComponent<RichTextEditorView.T_UI> {
	// @outline PROPERTIES

	private IsPreviewing = false;
	private CurValue = "";
	private CurrentSelection: [number, number] = [0, 0];

	private CurrentColor: Color3 = new Color3(1, 1, 1);
	private OnChanged = (Value: string) => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, RichTextEditorView.Create);

		this.Janitor.Add(
			this.UI.Content.TextBox.GetPropertyChangedSignal("Text").Connect(() => {
				if (!this.UI.FindFirstChild("Content")) return; // If the component has been destroyed, we don't need to do anything

				const NewValue = this.UI.Content.TextBox.Text;
				if (NewValue === this.CurValue) return; // No change, no need to

				this.CurValue = NewValue;
				this.UpdateHeight();
				this.OnChanged(NewValue);
			}),
			"Disconnect",
		);

		const UpdateSelection = () => {
			const TextBox = this.UI.Content.TextBox;
			if (!TextBox.IsFocused()) return;
			const CursorPosition = TextBox.CursorPosition;
			const StartPosition = TextBox.SelectionStart;
			this.CurrentSelection = [math.min(CursorPosition, StartPosition), math.max(CursorPosition, StartPosition)];
		};
		this.Janitor.Add(
			this.UI.Content.TextBox.Focused.Connect(() => this.UpdateHeight()),
			"Disconnect",
		);
		this.Janitor.Add(this.UI.Content.TextBox.GetPropertyChangedSignal("CursorPosition").Connect(UpdateSelection), "Disconnect");
		this.Janitor.Add(this.UI.Content.TextBox.GetPropertyChangedSignal("SelectionStart").Connect(UpdateSelection), "Disconnect");

		this.Janitor.Add(
			this.UI.Content.TextBox.FocusLost.Connect(() => {
				if (!this.UI.FindFirstChild("Content")) return;
				this.UpdateHeight();
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Top.ColorBox.TextBox.Focused.Connect(() => {
				if (!this.UI.FindFirstChild("Content")) return;
				this.UI.Top.ColorBox.TextBox.CursorPosition = this.UI.Top.ColorBox.TextBox.Text.size() + 1;
				this.UI.Top.ColorBox.TextBox.SelectionStart = 1;
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Top.ColorBox.TextBox.FocusLost.Connect((Enter) => {
				if (!this.UI.FindFirstChild("Content")) return;
				if (!Enter) {
					this.SetFontColor(this.CurrentColor);
					return;
				}

				const NewColor = Richtext.TextToColor(this.UI.Top.ColorBox.TextBox.Text);
				this.SetFontColor(NewColor ?? this.CurrentColor);
			}),
			"Disconnect",
		);

		this.UI.Top.GetChildren()
			.filter((v): v is typeof this.UI.Top.Bold => v.IsA("Frame") && v.FindFirstChild("Interactibility") !== undefined)
			.forEach((Button) => {
				this.Janitor.Add(
					Button.Interactibility.MouseEnter.Connect(() => {
						Button.BackgroundTransparency = 0.9;
					}),
					"Disconnect",
				);
				this.Janitor.Add(
					Button.Interactibility.MouseLeave.Connect(() => {
						Button.BackgroundTransparency = 1;
					}),
					"Disconnect",
				);

				this.Janitor.Add(
					Button.Interactibility.MouseButton1Down.Connect(() => {
						if (Button.Name === "Bold") {
							this.AppendToSelectedText("<b>", "</b>");
						} else if (Button.Name === "Italic") {
							this.AppendToSelectedText("<i>", "</i>");
						} else if (Button.Name === "Underline") {
							this.AppendToSelectedText("<u>", "</u>");
						} else if (Button.Name === "FontColor") {
							this.AppendToSelectedText(`<font color='rgb(${this.UI.Top.ColorBox.TextBox.Text})'>`, `</font>`);
						}
						this.ClearSelectedText();
					}),
					"Disconnect",
				);
			});
	}

	// @outline METHODS

	ClearSelectedText() {
		this.CurrentSelection = [0, 0];
	}

	GetSelectedText(): string {
		const Text = this.UI.Content.TextBox.Text;
		const [Start, End] = this.CurrentSelection;

		if (Start === End) return ""; // No selection

		return Text.sub(Start, End - 1);
	}

	AppendToSelectedText(Prefix: string, Suffix = Prefix) {
		const CurrentText = this.UI.Content.TextBox.Text;
		const [Start, End] = this.CurrentSelection;

		if (Start === End) return; // No selection, nothing to append to

		const NewText = `${CurrentText.sub(0, Start - 1)}${Prefix}${CurrentText.sub(Start, End - 1)}${Suffix}${CurrentText.sub(End)}`;
		this.UI.Content.TextBox.Text = NewText;
		this.SetValue(NewText);
	}

	SetFontColor(Color: Color3) {
		this.CurrentColor = Color;
		this.UI.Top.ColorBox.TextBox.Text = `${math.floor(this.CurrentColor.R * 255)}, ${math.floor(this.CurrentColor.G * 255)}, ${math.floor(this.CurrentColor.B * 255)}`;
		this.UI.Top.FontColor.Icon.ImageColor3 = this.CurrentColor;
	}

	SetText(Text: string) {
		this.UI.Top.InBetween.TextLabel.Text = Text;
		return this;
	}

	SetValue(Value: string) {
		this.UI.Content.TextBox.Text = Value;
		this.CurValue = Value;
		this.UpdateHeight();
		this.OnChanged(Value);

		return this;
	}

	GetValue() {
		return this.CurValue;
	}

	SetOnChanged(Callback: ((Value: string) => void) | undefined) {
		this.OnChanged = Callback ?? (() => {});
		return this;
	}

	UpdateHeight(IsGlobal?: boolean): this {
		const CurrentSize = this.UI.Size.Y.Offset;
		const TextBound = new Instance("GetTextBoundsParams");
		TextBound.Text = this.UI.Content.TextBox.IsFocused() ? this.UI.Content.TextBox.Text : this.UI.Content.TextBox.ContentText;
		TextBound.Font = this.UI.Content.TextBox.FontFace;
		TextBound.Size = this.UI.Content.TextBox.TextSize;
		TextBound.Width = this.UI.Content.TextBox.AbsoluteSize.X;

		const Bound = game.GetService("TextService").GetTextBoundsAsync(TextBound);
		TextBound.Destroy();
		if (this.IsDestroyed()) return this;
		const TargetHeight = Bound.Y - this.UI.Content.TextBox.Size.Y.Offset;
		const NewSize = new UDim2(1, 0, 0, TargetHeight + this.UI.Top.Size.Y.Offset + 1 + 2); // 1 is the separator height, 2 is the component's borders

		if (CurrentSize !== NewSize.Y.Offset) {
			this.SetRootSize(NewSize);
			this.UpdateParentHeight();
		}
		return this;
	}
}
