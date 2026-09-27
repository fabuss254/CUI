import Vide from "@rbxts/vide";
import { FieldView } from "./Views/Field";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Field<TValue = string> extends UIComponent<FieldView.T_UI> {
	// @outline PROPERTIES

	private OnChangedRaw = (Value: string) => {};
	private OnChangedEntered: (Value: TValue) => void = () => {};

	private Filter = (Value: string) => Value;

	private DoSelectAllOnFocus = true;
	private DoEnterCheck = false;

	private IsFocused = false;
	private CurValue = undefined as TValue;
	private CurText = "";
	private ValueText: Vide.Source<string>;
	private ValueRevision = 0;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const ValueText = Vide.source("0");
		super(Manager, ID, (Props) => FieldView.Create({ ...Props, ValueText }));
		this.ValueText = ValueText;

		this.Janitor.Add(
			this.UI.Right.TextBox.GetPropertyChangedSignal("Text").Connect(() => {
				if (!this.UI.FindFirstChild("Right")) return;
				this.ValueText(this.UI.Right.TextBox.Text);
				this.OnChangedRaw(this.UI.Right.TextBox.Text);
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.TextBox.Focused.Connect(() => {
				this.IsFocused = true;

				if (!this.UI.FindFirstChild("Right")) return;
				this.UI.Right.TextBox.TextTruncate = Enum.TextTruncate.None;

				if (!this.DoSelectAllOnFocus) return;
				this.UI.Right.TextBox.CursorPosition = this.UI.Right.TextBox.Text.size() + 1;
				this.UI.Right.TextBox.SelectionStart = 1;
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.TextBox.FocusLost.Connect((EnterPressed) => {
				this.IsFocused = false;

				if (!this.UI.FindFirstChild("Right")) return;
				this.UI.Right.TextBox.TextTruncate = Enum.TextTruncate.AtEnd;

				//if (!this.OnChangedEntered) return;
				if (!this.GetEnabled() || (this.DoEnterCheck && EnterPressed === false)) {
					this.ValueText(this.CurText);
					return;
				}

				const NewText = this.Filter(this.UI.Right.TextBox.Text);
				const NewValue = this.TextToValue(NewText);
				const DisplayText = this.ValueToText(NewValue);
				this.ValueText(DisplayText);
				this.CurText = DisplayText;
				this.CurValue = NewValue;
				this.OnChangedEntered(NewValue);
			}),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	protected TextToValue(Text: string): TValue {
		return Text as unknown as TValue;
	}

	protected ValueToText(Value: TValue): string {
		return Value as unknown as string;
	}

	protected UpdateEnabledDisplay(): void {
		const IsEnabled = this.GetEnabled();

		this.UI.Right.TextBox.TextEditable = IsEnabled;
		this.UI.Right.NonEnabled.Visible = !IsEnabled;
		this.UI.Right.TextBox.TextTransparency = IsEnabled ? 0 : 0.25;
	}

	// @outline METHODS

	SetDoSelectAllOnFocus(DoSelectAllOnFocus: boolean) {
		this.DoSelectAllOnFocus = DoSelectAllOnFocus;
		return this;
	}

	SetText(Text: string) {
		if (!this.UI || !this.UI.FindFirstChild("Left")) return this;

		this.UI.Left.Title.Text = Text;
		return this;
	}

	SetTextVisible(Visible: boolean) {
		if (!this.UI || !this.UI.FindFirstChild("Left")) return this;

		this.UI.Left.Visible = Visible;
		this.UI.Right.Size = Visible ? new UDim2(0.5, -1, 1, 0) : UDim2.fromScale(1, 1);
		return this;
	}

	SetValue(Value: TValue | Promise<TValue>) {
		if (this.IsDestroyed()) return this;
		const Revision = ++this.ValueRevision;
		if (typeIs(Value, "table")) {
			this.ValueText("<LOADING>");
			this.Janitor.AddPromise(
				Value.then((NewValue) => {
					if (!this.IsDestroyed() && this.ValueRevision === Revision) this.SetValue(NewValue);
				}).catch(() => {
					if (!this.IsDestroyed() && this.ValueRevision === Revision) this.ValueText("<ERROR>");
				}),
			);

			return this;
		}

		this.CurValue = Value;
		this.CurText = this.ValueToText(Value);
		if (!this.IsFocused) {
			this.ValueText(this.CurText);
		}
		return this;
	}

	GetValue() {
		return this.CurValue;
	}

	SetPlaceholder(Placeholder: string) {
		this.UI.Right.TextBox.PlaceholderText = Placeholder;
		return this;
	}

	GetPlaceholder() {
		return this.UI.Right.TextBox.PlaceholderText;
	}

	SetOnChangedRaw(Callback: (Value: string) => void) {
		this.OnChangedRaw = Callback;
		return this;
	}

	SetOnChangedUnfocus(Callback: (Value: TValue) => void) {
		this.OnChangedEntered = Callback;
		this.DoEnterCheck = false;
		return this;
	}

	SetOnChangedEntered(Callback: ((Value: TValue) => void) | undefined) {
		this.OnChangedEntered = Callback ?? (() => {});
		this.DoEnterCheck = true;
		return this;
	}

	SetNumberFilter(Min?: number, Max?: number) {
		this.Filter = (Value) => {
			const CurVal = math.clamp(tonumber(Value) ?? 0, Min ?? -math.huge, Max ?? math.huge);
			return tostring(CurVal);
		};

		return this;
	}

	SetCustomFilter(Filter: (Value: string) => string) {
		this.Filter = Filter;
		return this;
	}
}
