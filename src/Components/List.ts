import Vide from "@rbxts/vide";
import { ScrollingFrameView } from "./Views/ScrollingFrame";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class List extends UIComponent<ReturnType<typeof ScrollingFrameView.Create>> {
	// @outline PROPERTIES

	private readonly State;

	Components = this.Manager.CreateChildManager(this.UI.Content, this);

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Scroll: Vide.source(0),
			ContentHeight: Vide.source(0),
		};
		super(Manager, ID, (Props) =>
			ScrollingFrameView.Create({
				...Props,
				...State,
				OnScroll: (Scroll) => State.Scroll(Scroll),
			}),
		);
		this.State = State;
		this.Janitor.Add(this.Components, "Destroy");
	}

	// @outline METHODS

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		this.UpdateParentHeight();
		return this;
	}

	GetScroll(): number {
		return Vide.untrack(this.State.Scroll);
	}

	SetScroll(Scroll: number): this {
		this.State.Scroll(Scroll);
		return this;
	}

	GetHeight(): number {
		return this.GetYSize();
	}

	UpdateHeight(IsGlobal?: boolean): this {
		if (this.Destroyed || !this.UI.Parent) return this;

		this.State.ContentHeight(this.Components.GetComponentsHeight());
		return this;
	}
}
