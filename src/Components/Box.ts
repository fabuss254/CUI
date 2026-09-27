import Vide from "@rbxts/vide";
import { BoxView } from "./Views/Box";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Box extends UIComponent<ReturnType<typeof BoxView.Create>> {
	// @outline PROPERTIES

	private readonly State;

	Components = this.Manager.CreateChildManager(this.UI, this);

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			HorizontalAlignment: Vide.source<Enum.HorizontalAlignment>(Enum.HorizontalAlignment.Left),
			VerticalAlignment: Vide.source<Enum.VerticalAlignment>(Enum.VerticalAlignment.Top),
		};
		super(Manager, ID, (Props) => BoxView.Create({ ...Props, ...State }));
		this.State = State;
		this.Janitor.Add(this.Components, "Destroy");
	}

	// @outline PRIVATE_METHODS

	protected UpdateEnabledDisplay() {
		this.UpdateParentHeight();
	}

	// @outline METHODS

	SetAlignment(HorizontalAlignment?: Enum.HorizontalAlignment, VerticalAlignment?: Enum.VerticalAlignment) {
		if (HorizontalAlignment) this.State.HorizontalAlignment(HorizontalAlignment);
		if (VerticalAlignment) this.State.VerticalAlignment(VerticalAlignment);
		return this;
	}

	GetVisible(): boolean {
		return super.GetVisible() && this.GetEnabled();
	}

	GetHeight(): number {
		return this.Components.GetComponentsHeight();
	}

	UpdateHeight(IsGlobal?: boolean): this {
		this.SetRootSize(new UDim2(1, 0, 0, this.GetHeight()));
		return super.UpdateHeight(IsGlobal);
	}
}
