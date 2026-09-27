import Vide from "@rbxts/vide";
import { DropdownView } from "./Views/Dropdown";
import type { CUI } from "..";
import { UIComponent } from "./Base";

let ActiveDropdown: Dropdown | undefined;

function CreateState() {
	return {
		Text: Vide.source("Position Y"),
		TextVisible: Vide.source(true),
		Choices: Vide.source<string[]>([]),
		Selected: Vide.source("Choice 1"),
		InputText: Vide.source("Choice 1"),
		Filter: Vide.source(""),
		IsOpen: Vide.source(false),
	};
}

export class Dropdown extends UIComponent<ReturnType<typeof DropdownView.Create>> {
	// @outline PROPERTIES

	private readonly State: ReturnType<typeof CreateState>;
	private OnChanged = (Value: string) => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = CreateState();
		super(Manager, ID, (Props) =>
			DropdownView.Create({
				...Props,
				Text: State.Text,
				TextVisible: State.TextVisible,
				Choices: State.Choices,
				ValueText: State.InputText,
				Filter: State.Filter,
				IsOpen: State.IsOpen,
				OnTextChanged: (Text) => {
					State.InputText(Text);
					if (State.IsOpen() && Text !== "") State.Filter(Text);
				},
				OnFocused: () => {
					task.wait();
					task.wait();
					if (this.IsDestroyed()) return;
					State.Filter("");
					this.SetIsOpen(!State.IsOpen());
				},
				OnFocusLost: (Enter) => this.OnFocusLost(Enter),
				OnSelected: (Choice) => {
					this.SetSelected(Choice);
					this.SetIsOpen(false);
					this.OnChanged(Choice);
				},
			}),
		);
		this.State = State;
		this.Janitor.Add(() => {
			if (ActiveDropdown === this) ActiveDropdown = undefined;
		}, true);
	}

	// @outline PRIVATE_METHODS

	private OnFocusLost(Enter: boolean) {
		task.wait();
		if (this.IsDestroyed()) return;
		this.SetIsOpen(false);

		if (Enter) {
			const Filter = Vide.untrack(this.State.Filter).lower();
			const Choice = Vide.untrack(this.State.Choices).find((Value) => Filter === "" || Value.lower().find(Filter)[0] !== undefined);
			if (Choice !== undefined) {
				this.SetSelected(Choice);
				this.OnChanged(Choice);
			}
		} else {
			this.SetSelected(this.GetValue(), true);
		}
		this.State.Filter("");
	}

	protected UpdateEnabledDisplay() {
		if (Vide.untrack(this.State.IsOpen) && !this.GetEnabled()) this.SetIsOpen(false);
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

	SetChoiceList(NewChoices: string[]) {
		this.State.Choices([...NewChoices]);
		return this;
	}

	SetSelectedToFirst() {
		return this.SetSelected(Vide.untrack(this.State.Choices)[0] ?? "<NONE>", true);
	}

	SetSelected(Choice: string, IgnoreChoiceList?: boolean) {
		if (this.IsDestroyed()) return this;
		if (!IgnoreChoiceList && !Vide.untrack(this.State.Choices).includes(Choice)) return this;
		Vide.batch(() => {
			this.State.Selected(Choice);
			this.State.InputText(Choice);
		});
		return this;
	}

	GetValue() {
		return Vide.untrack(this.State.Selected);
	}

	SetOnChanged(Callback: (Value: string) => void) {
		this.OnChanged = Callback;
		return this;
	}

	SetIsOpen(IsOpen: boolean) {
		if (!this.GetEnabled()) IsOpen = false;
		if (ActiveDropdown && ActiveDropdown !== this) ActiveDropdown.SetIsOpen(false);
		this.State.IsOpen(IsOpen);
		if (IsOpen) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			ActiveDropdown = this;
		} else if (ActiveDropdown === this) {
			ActiveDropdown = undefined;
		}
		return this;
	}
}
