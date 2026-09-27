import { ScrollingFrameView } from "./Views/ScrollingFrame";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class List extends UIComponent<ScrollingFrameView.T_UI> {
	// @outline PROPERTIES

	Components = this.Manager.CreateChildManager(this.UI.Content, this);

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, ScrollingFrameView.Create);
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
		return this.UI.Content.CanvasPosition.Y;
	}

	SetScroll(Scroll: number): this {
		this.UI.Content.CanvasPosition = new Vector2(0, Scroll);
		return this;
	}

	GetHeight(): number {
		return this.GetYSize();
	}

	UpdateHeight(IsGlobal?: boolean): this {
		if (this.Destroyed || !this.UI.Parent) return this;

		this.UI.Content.CanvasSize = new UDim2(0, 0, 0, this.Components.GetComponentsHeight());
		return this;
	}
}
