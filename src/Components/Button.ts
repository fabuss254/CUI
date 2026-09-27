import Vide from "@rbxts/vide";
import { ButtonView } from "./Views/Button";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Button extends UIComponent<ButtonView.T_UI> {
	// @outline PROPERTIES

	private Callback = () => {};
	private NeedConfirmation = false;
	private ButtonText = "";
	private ButtonLabel: Vide.Source<string | undefined>;
	private OriginalButtonColor = this.UI.Btn.BackgroundColor3;
	private OriginalTextColor = this.UI.Btn.TextColor3;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const ButtonLabel = Vide.source<string | undefined>(undefined);
		super(Manager, ID, (Props) => ButtonView.Create({ ...Props, ButtonText: ButtonLabel }));
		this.ButtonLabel = ButtonLabel;

		let RevertTask: thread | undefined = undefined;
		this.Janitor.Add(() => {
			if (RevertTask) task.cancel(RevertTask);
		}, true);
		this.Janitor.Add(
			this.UI.Btn.MouseButton1Click.Connect(() => {
				if (!this.GetEnabled()) return;
				if (this.NeedConfirmation) {
					if (RevertTask) {
						task.cancel(RevertTask);
						RevertTask = undefined;

						this.ButtonLabel(this.ButtonText);
						this.Callback();
						return;
					}

					this.ButtonLabel("Confirm?");
					RevertTask = task.delay(2, () => {
						this.ButtonLabel(this.ButtonText);
						RevertTask = undefined;
					});
					return;
				} else {
					this.Callback();
				}
			}),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	protected UpdateEnabledDisplay(): void {
		const IsEnabled = this.GetEnabled();

		this.UI.Btn.AutoButtonColor = IsEnabled;
		this.UI.Btn.BackgroundColor3 = IsEnabled ? this.OriginalButtonColor : Color3.fromRGB(110, 110, 110);
		this.UI.Btn.TextColor3 = IsEnabled ? this.OriginalTextColor : Color3.fromRGB(191, 191, 191);
	}

	// @outline METHODS

	SetButtonText(NewText: string) {
		if (!this.UI || !this.UI.Parent) return this;

		this.ButtonText = NewText;
		this.ButtonLabel(NewText);
		return this;
	}

	GetButtonText() {
		return this.ButtonText;
	}

	SetButtonCallback(Callback: () => void) {
		this.Callback = Callback;
		return this;
	}

	SetYSize(NewSize: number) {
		this.SetRootSize(new UDim2(1, 0, 0, NewSize));
		return this;
	}

	DoNeedConfirmation(DoNeedConfirmation: boolean) {
		this.NeedConfirmation = DoNeedConfirmation;
		return this;
	}

	SetButtonColor(Color: Color3) {
		this.UI.Btn.BackgroundColor3 = Color;
		return this;
	}

	GetButtonColor() {
		return this.UI.Btn.BackgroundColor3;
	}

	GetButtonOriginalColor() {
		return this.OriginalButtonColor;
	}
}
