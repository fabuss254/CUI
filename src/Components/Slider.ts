import Vide from "@rbxts/vide";
import { SliderView } from "./Views/Slider";
import type { CUI } from "..";
import { UIComponent } from "./Base";

function FixDecimal(Num: number) {
	let DValue = tostring(Num).split(".");
	if (DValue[1]) DValue[1] = DValue[1].sub(1, 3);
	return tonumber(DValue.join(".")) || 0;
}

export class Slider extends UIComponent<SliderView.T_UI> {
	// @outline PROPERTIES

	private OnChanged = (Value: number) => {};
	private CurValue = 0;
	private ValueText: Vide.Source<string>;
	private Percent: Vide.Source<number>;

	private Range = [0, 100];
	private Increment = 1;
	private OriginalCursorColor = this.UI.Right.SliderCtn.SliderBar.Cursor.BackgroundColor3;
	private OriginalSliderColor = this.UI.Right.SliderCtn.SliderBar.SliderBG.BackgroundColor3;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const ValueText = Vide.source("0");
		const Percent = Vide.source(0.5);
		super(Manager, ID, (Props) => SliderView.Create({ ...Props, ValueText, Percent }));
		this.ValueText = ValueText;
		this.Percent = Percent;
		this.Janitor.Add(
			this.UI.Right.TextBox.GetPropertyChangedSignal("Text").Connect(() => {
				this.ValueText(this.UI.Right.TextBox.Text);
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.TextBox.Focused.Connect(() => {
				this.UI.Right.TextBox.CursorPosition = this.UI.Right.TextBox.Text.size() + 1;
				this.UI.Right.TextBox.SelectionStart = 1;
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.TextBox.FocusLost.Connect((EnterPressed) => {
				const Num = tonumber(this.UI.Right.TextBox.Text);
				if (Num === undefined || !EnterPressed) {
					this.ValueText(tostring(this.CurValue));
					return;
				}

				this.SetValue(Num);
				this.OnChanged(Num);
			}),
			"Disconnect",
		);

		// Slider
		let UpdateInput = (x: number, y: number) => {
			if (!this.GetEnabled()) return;

			const SliderCtn = this.UI.Right.SliderCtn;
			const RelativePos = (x - SliderCtn.SliderBar.AbsolutePosition.X) / SliderCtn.SliderBar.AbsoluteSize.X;

			const NewValue = math.clamp(this.Range[0] + (this.Range[1] - this.Range[0]) * RelativePos, this.Range[0], this.Range[1]);
			const RoundedValue = math.clamp(math.floor(NewValue / this.Increment + 0.5) * this.Increment, this.Range[0], this.Range[1]);
			const FixedValue = FixDecimal(RoundedValue);

			if (this.GetValue() === FixedValue) return;
			this.SetValue(FixedValue);
			this.OnChanged(FixedValue);
		};

		let Holding = false;
		this.Janitor.Add(
			this.UI.Right.SliderCtn.SliderInteractibility.MouseButton1Down.Connect((x, y) => (Holding = true) && UpdateInput(x, y)),
			"Disconnect",
		);
		this.Janitor.Add(
			this.UI.Right.SliderCtn.SliderInteractibility.MouseButton1Up.Connect(() => (Holding = false)),
			"Disconnect",
		);
		this.Janitor.Add(
			this.UI.Right.SliderCtn.SliderInteractibility.MouseLeave.Connect(() => (Holding = false)),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.SliderCtn.SliderInteractibility.MouseMoved.Connect((x, y) => {
				if (!Holding) return;

				UpdateInput(x, y);
			}),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	private UpdateDisplay() {
		// TEXTBOX
		this.ValueText(tostring(this.CurValue));

		// SLIDER
		const Percent = math.clamp((this.CurValue - this.Range[0]) / (this.Range[1] - this.Range[0]), 0, 1);
		this.Percent(Percent);
	}

	protected UpdateEnabledDisplay(): void {
		const IsEnabled = this.GetEnabled();
		this.UI.Right.TextBox.TextEditable = IsEnabled;
		this.UI.Right.TextBox.TextTransparency = IsEnabled ? 0 : 0.25;
		this.UI.Right.SliderCtn.SliderBar.Cursor.BackgroundColor3 = IsEnabled ? this.OriginalCursorColor : Color3.fromRGB(130, 130, 130);
		this.UI.Right.SliderCtn.SliderBar.SliderBG.BackgroundColor3 = IsEnabled ? this.OriginalSliderColor : Color3.fromRGB(61, 61, 61);
	}

	// @outline METHODS

	SetText(Text: string) {
		this.UI.Left.Title.Text = Text;
		return this;
	}

	SetValue(Value: number) {
		const FixedValue = FixDecimal(Value);
		this.CurValue = FixedValue;
		this.UpdateDisplay();
		return this;
	}

	SetRange(Min: number, Max: number) {
		this.Range = [math.min(Min, Max), math.max(Max, Min)];
		this.UpdateDisplay();
		return this;
	}

	SetIncrement(Increment: number) {
		this.Increment = Increment;
		return this;
	}

	GetValue() {
		return this.CurValue;
	}

	SetOnChanged(Callback: (Value: number) => void) {
		this.OnChanged = Callback;
		return this;
	}
}
