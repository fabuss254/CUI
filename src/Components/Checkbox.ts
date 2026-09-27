import Vide from "@rbxts/vide";
import { CheckboxView } from "./Views/Checkbox";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Checkbox extends UIComponent<CheckboxView.T_UI> {
	// @outline PROPERTIES

	private OnChanged = (Value: boolean) => {};
	private CurrentValue: Vide.Source<boolean>;
	private OriginalCheckboxColor = this.UI.Right.CheckboxCtn.Checkbox.BackgroundColor3;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const Checked = Vide.source(false);
		super(Manager, ID, (Props) => CheckboxView.Create({ ...Props, Checked }));
		this.CurrentValue = Checked;

		this.Janitor.Add(
			this.UI.Right.CheckboxCtn.TextButton.MouseButton1Click.Connect(() => {
				if (!this.GetEnabled()) return;

				this.SetValue(!Vide.untrack(this.CurrentValue));
				this.OnChanged(Vide.untrack(this.CurrentValue));
			}),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	protected UpdateEnabledDisplay() {
		const IsEnabled = this.GetEnabled();
		const UI = this.GetUI();

		UI.Right.CheckboxCtn.Checkbox.BackgroundColor3 = IsEnabled ? this.OriginalCheckboxColor : new Color3(0.6, 0.6, 0.6);
		UI.Right.CheckboxCtn.DisabledCheckbox.Visible = !IsEnabled;
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

	SetValue(Value: boolean) {
		this.CurrentValue(Value);
		return this;
	}

	GetValue() {
		return Vide.untrack(this.CurrentValue);
	}

	SetOnChanged(Callback: (Value: boolean) => void) {
		this.OnChanged = Callback;
		return this;
	}

	ShowCheckboxOnly() {
		this.UI.Left.Visible = false;
		this.UI.Right.Size = new UDim2(1, 0, 1, 0);
		return this;
	}

	SetYSize(Size: number) {
		this.SetRootSize(new UDim2(1, 0, 0, Size));
		return this;
	}

	SetBackgroundVisible(IsVisible: boolean) {
		this.UI.Right.BackgroundTransparency = IsVisible ? 0 : 1;
		this.UI.Left.BackgroundTransparency = IsVisible ? 0 : 1;
		this.UI.BackgroundTransparency = IsVisible ? 0 : 1;
		this.UI.BG.Visible = IsVisible;
		return this;
	}
}
