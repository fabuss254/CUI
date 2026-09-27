import Vide from "@rbxts/vide";
import { SliderView } from "./Views/Slider";
import type { CUI } from "..";
import { UIComponent } from "./Base";

function FixDecimal(Num: number) {
	const DValue = tostring(Num).split(".");
	if (DValue[1]) DValue[1] = DValue[1].sub(1, 3);
	return tonumber(DValue.join(".")) || 0;
}

export class Slider extends UIComponent<ReturnType<typeof SliderView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private OnChanged = (Value: number) => {};
	private Increment = 1;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Text: Vide.source("Slider"),
			Value: Vide.source(0),
			ValueText: Vide.source("0"),
			Range: Vide.source<readonly [number, number]>([0, 100]),
		};
		super(Manager, ID, (Props) =>
			SliderView.Create({
				...Props,
				...State,
				OnTextChanged: (Text) => State.ValueText(Text),
				OnFocusLost: (EnterPressed) => this.Commit(EnterPressed),
				OnFractionChanged: (Fraction) => this.MoveCursor(Fraction),
			}),
		);
		this.State = State;
	}

	// @outline PRIVATE_METHODS

	private Commit(EnterPressed: boolean) {
		const Num = tonumber(Vide.untrack(this.State.ValueText));
		if (Num === undefined || !EnterPressed) {
			this.State.ValueText(tostring(this.GetValue()));
			return;
		}
		this.SetValue(Num);
		this.OnChanged(Num);
	}

	private MoveCursor(Fraction: number) {
		if (!this.GetEnabled()) return;
		const [Min, Max] = Vide.untrack(this.State.Range);
		const NewValue = math.clamp(Min + (Max - Min) * Fraction, Min, Max);
		const RoundedValue = math.clamp(math.floor(NewValue / this.Increment + 0.5) * this.Increment, Min, Max);
		const FixedValue = FixDecimal(RoundedValue);
		if (this.GetValue() === FixedValue) return;
		this.SetValue(FixedValue);
		this.OnChanged(FixedValue);
	}

	// @outline METHODS

	SetText(Text: string) {
		this.State.Text(Text);
		return this;
	}

	SetValue(Value: number) {
		const FixedValue = FixDecimal(Value);
		Vide.batch(() => {
			this.State.Value(FixedValue);
			this.State.ValueText(tostring(FixedValue));
		});
		return this;
	}

	SetRange(Min: number, Max: number) {
		Vide.batch(() => {
			this.State.Range([math.min(Min, Max), math.max(Max, Min)]);
			this.State.ValueText(tostring(this.GetValue()));
		});
		return this;
	}

	SetIncrement(Increment: number) {
		this.Increment = Increment;
		return this;
	}

	GetValue() {
		return Vide.untrack(this.State.Value);
	}

	SetOnChanged(Callback: (Value: number) => void) {
		this.OnChanged = Callback;
		return this;
	}
}
