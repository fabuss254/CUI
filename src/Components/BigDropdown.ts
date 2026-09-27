import Vide from "@rbxts/vide";
import { BigDropdownView } from "./Views/BigDropdown";
import type { CUI } from "..";
import { UIComponent } from "./Base";

function CreateState() {
	return {
		Choices: Vide.source<string[]>([]),
		Selected: Vide.source<string | undefined>(),
		Filter: Vide.source(""),
	};
}

export class BigDropdown extends UIComponent<ReturnType<typeof BigDropdownView.Create>> {
	// @outline PROPERTIES

	private readonly State: ReturnType<typeof CreateState>;
	Callback: (Value?: string) => void = () => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = CreateState();
		super(Manager, ID, (Props) =>
			BigDropdownView.Create({
				...Props,
				Choices: State.Choices,
				Selected: State.Selected,
				Filter: State.Filter,
				OnFilterChanged: (Text) => State.Filter(Text),
				OnSelected: (Choice) => this.SetSelected(Choice),
			}),
		);
		this.State = State;
	}

	// @outline METHODS

	SetChoiceList(NewChoices: string[]) {
		this.State.Choices([...new Set(NewChoices)].sort((A, B) => A < B));
		return this;
	}

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		return this;
	}

	SetSelected(Selected: string | undefined) {
		if (Selected && !Vide.untrack(this.State.Choices).includes(Selected)) Selected = undefined;
		if (this.GetSelected() === Selected) return this;
		this.State.Selected(Selected);
		this.Callback(Selected);
		return this;
	}

	SetOnChanged(Callback: (Value: string | undefined) => void) {
		this.Callback = Callback;
		return this;
	}

	GetSelected() {
		return Vide.untrack(this.State.Selected);
	}
}
