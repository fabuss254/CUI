import Vide from "@rbxts/vide";
import { Janitor } from "@rbxts/janitor";
import { BigDropdownView } from "./Views/BigDropdown";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class BigDropdown extends UIComponent<BigDropdownView.T_UI> {
	// @outline PROPERTIES

	private ChoiceJanitors = new Map<string, Janitor>();
	private SelectedChoice = Vide.source<string | undefined>(undefined);

	Choices: string[] = [];
	Selected: string | undefined = undefined;
	Callback: (Value?: string) => void = () => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, BigDropdownView.Create);
		this.Janitor.Add(() => this.ChoiceJanitors.forEach((Owner) => Owner.Destroy()), true);

		// Automatically update the visible items when changing the filter text
		this.Janitor.Add(
			this.UI.Top.TextBox.GetPropertyChangedSignal("Text").Connect(() => {
				this.UpdateFilter();
			}),
			"Disconnect",
		);

		// Automatically select the content when the user clicks on the textbox
		this.Janitor.Add(
			this.UI.Top.TextBox.Focused.Connect(() => {
				this.UI.Top.TextBox.CursorPosition = this.UI.Top.TextBox.Text.size() + 1;
				this.UI.Top.TextBox.SelectionStart = 1;
			}),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	private UpdateFilter() {
		const FilterText = this.UI.Top.TextBox.Text.lower();
		const Ctn = this.UI.ScrollingFrame;

		Ctn.GetChildren()
			.filter((v): v is ReturnType<typeof BigDropdownView.Item> => v.IsA("TextButton"))
			.forEach((v) => {
				if (FilterText === "") {
					v.Visible = true;
					return;
				}

				v.Visible = v.Name.lower().find(FilterText)[0] !== undefined;
			});

		Ctn.CanvasSize = UDim2.fromOffset(
			0,
			Ctn.GetChildren()
				.filter((v): v is ReturnType<typeof BigDropdownView.Item> => v.IsA("TextButton"))
				.reduce((acc, v) => acc + (v.Visible ? v.AbsoluteSize.Y : 0), 0),
		);

		this.UpdateHeight();
		this.UpdateParentHeight();
	}

	private UpdateChoices() {
		const Ctn = this.UI.ScrollingFrame;

		// Remove all items that are not in the new list
		Ctn.GetChildren()
			.filter((v): v is ReturnType<typeof BigDropdownView.Item> => v.IsA("TextButton"))
			.forEach((v) => {
				if (!this.Choices.includes(v.Name)) {
					this.ChoiceJanitors.get(v.Name)?.Destroy();
					this.ChoiceJanitors.delete(v.Name);
					v.Destroy();
				}
			});

		// Add new items
		this.Choices.forEach((Choice) => {
			if (Ctn.FindFirstChild(Choice)) return;

			const Owner = new Janitor();
			this.ChoiceJanitors.set(Choice, Owner);
			const Item = this.CreateOwnedUI(() => BigDropdownView.Item({ Selected: () => this.SelectedChoice() === Choice }), Owner);
			Item.Name = Choice;
			Item.TextLabel.Text = Choice;
			Item.ZIndex = Ctn.ZIndex + 1;
			Item.TextLabel.ZIndex = Ctn.ZIndex + 2;
			Item.Parent = Ctn;

			Owner.Add(
				Item.MouseButton1Click.Connect(() => {
					this.SetSelected(Choice);
				}),
				"Disconnect",
			);
		});

		// Order
		const Items = Ctn.GetChildren()
			.filter((v): v is ReturnType<typeof BigDropdownView.Item> => v.IsA("TextButton"))
			.sort((a, b) => a.Name < b.Name);
		Items.forEach((v, i) => (v.LayoutOrder = i));

		this.UpdateFilter();
		this.UpdateSelected();
	}

	private UpdateSelected() {
		this.SelectedChoice(this.Selected);
	}

	// @outline METHODS

	SetChoiceList(NewChoices: string[]) {
		this.Choices = NewChoices;
		this.UpdateChoices();
		return this;
	}

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		this.UpdateParentHeight();

		return this;
	}

	SetSelected(Selected: string | undefined) {
		if (Selected && !this.Choices.includes(Selected)) Selected = undefined;
		if (this.Selected === Selected) return this;

		this.Selected = Selected;
		this.Callback(Selected);
		this.UpdateSelected();
		return this;
	}

	SetOnChanged(Callback: (Value: string | undefined) => void) {
		this.Callback = Callback;
		return this;
	}

	GetSelected() {
		return this.Selected;
	}
}
