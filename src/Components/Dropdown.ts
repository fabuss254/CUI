import Vide from "@rbxts/vide";
import { Janitor } from "@rbxts/janitor";
import { DropdownView } from "./Views/Dropdown";
import type { CUI } from "..";
import { UIComponent } from "./Base";

let ActiveDropdown: undefined | Dropdown = undefined;
const MAX_DROPDOWN_HEIGHT = 100;
export class Dropdown extends UIComponent<DropdownView.T_UI> {
	// @outline PROPERTIES

	private ChoicesJanitor = new Janitor();

	private OnChanged = (Value: string) => {};
	private Choices: string[] = [];
	private CurChoice: string = "Choice 1";

	private IsOpen: Vide.Source<boolean>;
	private ChoiceText: Vide.Source<string | undefined>;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const IsOpen = Vide.source(false);
		const ChoiceText = Vide.source<string | undefined>(undefined);
		super(Manager, ID, (Props) => DropdownView.Create({ ...Props, IsOpen, ValueText: ChoiceText }));
		this.IsOpen = IsOpen;
		this.ChoiceText = ChoiceText;
		this.Janitor.Add(this.ChoicesJanitor, "Destroy");
		this.Janitor.Add(() => {
			if (ActiveDropdown === this) ActiveDropdown = undefined;
		}, true);

		this.Janitor.Add(
			this.UI.Right.DropdownCtn.TextBox.Focused.Connect(() => {
				task.wait();
				task.wait();
				if (this.IsDestroyed()) return;
				this.UpdateFilter();
				this.SetIsOpen(!Vide.untrack(this.IsOpen));
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.DropdownCtn.TextBox.GetPropertyChangedSignal("Text").Connect(() => {
				this.ChoiceText(this.UI.Right.DropdownCtn.TextBox.Text);
				if (!Vide.untrack(this.IsOpen)) return;

				const CurInput = this.UI.Right.DropdownCtn.TextBox.Text;
				if (CurInput === "") return;

				this.UpdateFilter(CurInput);
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.DropdownCtn.TextBox.FocusLost.Connect((Enter) => {
				if (this.IsDestroyed()) return;
				task.wait();
				if (this.IsDestroyed()) return;
				this.SetIsOpen(false);

				if (Enter) {
					const ChoosenChoice = this.GetFirstVisibleChoice();
					if (ChoosenChoice) {
						this.SetSelected(ChoosenChoice);
						this.OnChanged(ChoosenChoice);
					}
				} else {
					this.SetSelected(this.CurChoice, true);
				}

				this.UpdateFilter();
			}),
			"Disconnect",
		);

		this.SetIsOpen(false);
	}

	// @outline PRIVATE_METHODS

	private UpdateFilter(CurrentFilter?: string) {
		if (this.IsDestroyed()) return;

		this.UI.Right.DropdownCtn.Content.InnerContent.GetChildren()
			.filter((Child): Child is Frame => Child.IsA("Frame"))
			.forEach((Child) => {
				const IsVisible = CurrentFilter ? Child.Name.lower().find(CurrentFilter.lower())[0] !== undefined : true;
				Child.Visible = IsVisible;
			});

		this.UpdateDropdownHeight();
	}

	private UpdateDropdownHeight() {
		let Height = 0;
		this.UI.Right.DropdownCtn.Content.InnerContent.GetChildren()
			.filter((Child): Child is Frame => Child.IsA("Frame") && Child.Visible)
			.forEach((Child) => {
				Height += Child.Size.Y.Offset;
			});

		this.UI.Right.DropdownCtn.Content.Size = new UDim2(1, 0, 0, math.min(Height, MAX_DROPDOWN_HEIGHT));
		this.UI.Right.DropdownCtn.Content.InnerContent.CanvasSize = new UDim2(0, 0, 0, Height);
	}

	private GetFirstVisibleChoice() {
		return this.UI.Right.DropdownCtn.Content.InnerContent.GetChildren()
			.filter((Child): Child is Frame => Child.IsA("Frame") && Child.Visible)
			.sort((a, b) => a.LayoutOrder < b.LayoutOrder)[0]?.Name;
	}

	private UpdateChoices() {
		this.ChoicesJanitor.Cleanup();
		this.UI.Right.DropdownCtn.Content.InnerContent.GetChildren()
			.filter((Child) => Child.IsA("Frame"))
			.forEach((Child) => {
				Child.Destroy();
			});

		this.Choices.forEach((Choice, Index) => {
			const NewItem = this.CreateOwnedUI(DropdownView.Item, this.ChoicesJanitor);
			NewItem.Visible = true;
			NewItem.TextLabel.Text = Choice;
			NewItem.LayoutOrder = Index;
			NewItem.Name = Choice;
			NewItem.Parent = this.UI.Right.DropdownCtn.Content.InnerContent;

			NewItem.TextLabel.ZIndex = this.UI.Right.DropdownCtn.Content.InnerContent.ZIndex + 1;
			NewItem.TextButton.ZIndex = this.UI.Right.DropdownCtn.Content.InnerContent.ZIndex + 10;

			this.ChoicesJanitor.Add(
				NewItem.TextButton.MouseEnter.Connect(() => (NewItem.TextButton.BackgroundTransparency = 0.8)),
				"Disconnect",
			);
			this.ChoicesJanitor.Add(
				NewItem.TextButton.MouseLeave.Connect(() => (NewItem.TextButton.BackgroundTransparency = 1)),
				"Disconnect",
			);

			this.ChoicesJanitor.Add(
				NewItem.TextButton.MouseButton1Down.Connect(() => {
					this.SetSelected(Choice);
					this.SetIsOpen(false);

					this.OnChanged(Choice);
				}),
				"Disconnect",
			);
		});

		this.UpdateDropdownHeight();
	}

	protected UpdateEnabledDisplay(): void {
		const IsEnabled = this.GetEnabled();

		this.UI.Right.Overlay.Visible = !IsEnabled;
		if (Vide.untrack(this.IsOpen) && !IsEnabled) this.SetIsOpen(false);
	}

	// @outline METHODS

	SetText(Text: string) {
		this.UI.Left.Title.Text = Text;
		return this;
	}

	SetTextVisible(Visible: boolean) {
		this.UI.Left.Visible = Visible;
		this.UI.Right.Size = Visible ? new UDim2(0.5, -1, 1, 0) : UDim2.fromScale(1, 1);
		return this;
	}

	SetChoiceList(NewChoices: string[]) {
		this.Choices = NewChoices;
		this.UpdateChoices();
		return this;
	}

	SetSelectedToFirst() {
		this.SetSelected(this.Choices[0] ?? "<NONE>", true);
		return this;
	}

	SetSelected(Choice: string, IgnoreChoiceList?: boolean) {
		if (this.IsDestroyed()) return this;
		if (!IgnoreChoiceList && !this.Choices.includes(Choice)) return this;

		this.CurChoice = Choice;
		this.ChoiceText(Choice);
		return this;
	}

	GetValue() {
		return this.CurChoice;
	}

	SetOnChanged(Callback: (Value: string) => void) {
		this.OnChanged = Callback;
		return this;
	}

	SetIsOpen(IsOpen: boolean) {
		if (!this.GetEnabled()) IsOpen = false;
		if (ActiveDropdown && ActiveDropdown !== this) {
			ActiveDropdown.SetIsOpen(false);
		}

		this.IsOpen(IsOpen);

		if (IsOpen) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			ActiveDropdown = this;
		} else if (ActiveDropdown === this) {
			ActiveDropdown = undefined;
		}
		return this;
	}
}
