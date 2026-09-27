import Vide from "@rbxts/vide";
import { ButtonView } from "./Views/Button";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Button extends UIComponent<ReturnType<typeof ButtonView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private Callback = () => {};
	private RevertTask: thread | undefined;
	private readonly OriginalButtonColor = Color3.fromRGB(60, 60, 60);

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Text: Vide.source("Export to Attributes"),
			Color: Vide.source(Color3.fromRGB(60, 60, 60)),
			NeedConfirmation: Vide.source(false),
			Confirming: Vide.source(false),
		};
		super(Manager, ID, (Props) =>
			ButtonView.Create({
				...Props,
				ButtonText: () => (State.Confirming() ? "Confirm?" : State.Text()),
				ButtonColor: State.Color,
				OnActivated: () => this.Activate(),
			}),
		);
		this.State = State;
		this.Janitor.Add(() => {
			if (this.RevertTask) task.cancel(this.RevertTask);
		}, true);
	}

	// @outline PRIVATE_METHODS

	private Activate() {
		if (!this.GetEnabled()) return;
		if (Vide.untrack(this.State.NeedConfirmation)) {
			if (!Vide.untrack(this.State.Confirming)) {
				this.State.Confirming(true);
				this.RevertTask = task.delay(2, () => {
					this.State.Confirming(false);
					this.RevertTask = undefined;
				});
				return;
			}

			if (this.RevertTask) task.cancel(this.RevertTask);
			this.RevertTask = undefined;
			this.State.Confirming(false);
		}
		this.Callback();
	}

	// @outline METHODS

	SetButtonText(NewText: string) {
		this.State.Text(NewText);
		return this;
	}

	GetButtonText() {
		return Vide.untrack(this.State.Text);
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
		this.State.NeedConfirmation(DoNeedConfirmation);
		return this;
	}

	SetButtonColor(Color: Color3) {
		this.State.Color(Color);
		return this;
	}

	GetButtonColor() {
		return this.GetEnabled() ? Vide.untrack(this.State.Color) : Color3.fromRGB(110, 110, 110);
	}

	GetButtonOriginalColor() {
		return this.OriginalButtonColor;
	}
}
