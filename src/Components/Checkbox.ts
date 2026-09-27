import Vide from "@rbxts/vide";
import { CheckboxView } from "./Views/Checkbox";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Checkbox extends UIComponent<ReturnType<typeof CheckboxView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private OnChanged = (Value: boolean) => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Checked: Vide.source(false),
			Text: Vide.source("Position Y"),
			TextVisible: Vide.source(true),
			BackgroundVisible: Vide.source(true),
		};
		super(Manager, ID, (Props) =>
			CheckboxView.Create({
				...Props,
				...State,
				OnActivated: () => {
					if (!this.GetEnabled()) return;
					const Value = !Vide.untrack(State.Checked);
					this.SetValue(Value);
					this.OnChanged(Value);
				},
			}),
		);
		this.State = State;
	}

	// @outline METHODS

	SetText(Text: string) {
		this.State.Text(Text);
		return this;
	}

	SetTextVisible(Visible: boolean) {
		this.State.TextVisible(Visible);
		return this;
	}

	SetValue(Value: boolean) {
		this.State.Checked(Value);
		return this;
	}

	GetValue() {
		return Vide.untrack(this.State.Checked);
	}

	SetOnChanged(Callback: (Value: boolean) => void) {
		this.OnChanged = Callback;
		return this;
	}

	ShowCheckboxOnly() {
		return this.SetTextVisible(false);
	}

	SetYSize(Size: number) {
		this.SetRootSize(new UDim2(1, 0, 0, Size));
		return this;
	}

	SetBackgroundVisible(IsVisible: boolean) {
		this.State.BackgroundVisible(IsVisible);
		this.SetBackgroundTransparency(IsVisible ? 0 : 1);
		return this;
	}
}
