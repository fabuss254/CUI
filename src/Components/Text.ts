import Vide from "@rbxts/vide";
import { TextView } from "./Views/Text";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Text extends UIComponent<TextView.T_UI> {
	// @outline PROPERTIES

	private TextContent: Vide.Source<string | undefined>;
	private DoResize = false;
	private TextRevision = 0;
	private ResizeRevision = 0;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const TextContent = Vide.source<string | undefined>(undefined);
		super(Manager, ID, (Props) => TextView.Create({ ...Props, Text: TextContent }));
		this.TextContent = TextContent;

		this.Janitor.Add(
			this.GetMainContainer().OnUpdateWidth.Connect(() => this.Resize()),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	private Resize() {
		if (!this.DoResize || this.IsDestroyed()) return;
		const Revision = ++this.ResizeRevision;

		this.Janitor.Add(
			task.spawn(() => {
				const Bound = new Instance("GetTextBoundsParams");
				Bound.Width = this.GetWidth() - this.UI.TextLabel.Size.X.Offset;
				Bound.Text = Vide.untrack(this.TextContent) ?? this.UI.TextLabel.Text;
				Bound.Font = this.UI.TextLabel.FontFace;
				Bound.Size = this.UI.TextLabel.TextSize;

				const BoundSize = game.GetService("TextService").GetTextBoundsAsync(Bound);
				Bound.Destroy();
				if (this.IsDestroyed() || !this.DoResize || this.ResizeRevision !== Revision) return;
				this.SetRootSize(new UDim2(1, 0, 0, BoundSize.Y + 4));
				this.UpdateParentHeight();
			}),
			true,
		);
	}

	// @outline METHODS

	SetRichTextEnabled(Enabled: boolean) {
		if (this.Destroyed) return this;

		this.UI.TextLabel.RichText = Enabled;
		this.Resize();
		return this;
	}

	SetAutoResize(DoResize: boolean) {
		if (this.Destroyed) return this;

		this.DoResize = DoResize;
		this.Resize();
		return this;
	}

	SetTextColor(NewTextColor: Color3) {
		if (this.Destroyed) return this;

		this.UI.TextLabel.TextColor3 = NewTextColor;
		return this;
	}

	SetText(NewText: string | Promise<string>) {
		if (this.Destroyed) return this;
		const Revision = ++this.TextRevision;

		if (typeIs(NewText, "table")) {
			this.TextContent("<LOADING>");
			this.Janitor.AddPromise(
				NewText.then((Text) => {
					if (this.IsDestroyed() || this.TextRevision !== Revision) return;
					this.TextContent(Text);
					this.Resize();
				}).catch(() => {
					if (this.IsDestroyed() || this.TextRevision !== Revision) return;
					this.TextContent("<ERROR>");
					this.Resize();
				}),
			);

			return this;
		}

		this.TextContent(NewText);
		this.Resize();
		return this;
	}

	SetYSize(Size: number) {
		if (this.Destroyed) return this;

		this.SetRootSize(new UDim2(1, 0, 0, Size));
		this.SetAutoResize(false);
		return this;
	}

	SetTextSize(Size: number) {
		if (this.Destroyed) return this;

		this.UI.TextLabel.TextSize = Size;
		this.Resize();
		return this;
	}

	SetTextXAlignment(Alignment: Enum.TextXAlignment) {
		if (this.Destroyed) return this;

		this.UI.TextLabel.TextXAlignment = Alignment;
		return this;
	}

	SetTextYAlignment(Alignment: Enum.TextYAlignment) {
		if (this.Destroyed) return this;

		this.UI.TextLabel.TextYAlignment = Alignment;
		return this;
	}

	SetFontWeight(Weight: Enum.FontWeight) {
		if (this.Destroyed) return this;

		const Font = this.UI.TextLabel.FontFace;
		Font.Weight = Weight;

		this.UI.TextLabel.FontFace = Font;
		this.Resize();
		return this;
	}
}
