import { BoxView } from "./Views/Box";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Box extends UIComponent<BoxView.T_UI> {
	// @outline PROPERTIES

	private CachedVisibility = true;

	Components = this.Manager.CreateChildManager(this.UI, this);

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, BoxView.Create);
		this.Janitor.Add(this.Components, "Destroy");
	}

	// @outline PRIVATE_METHODS

	protected UpdateEnabledDisplay() {
		const IsEnabled = this.GetEnabled();
		this.SetVisible(IsEnabled && this.CachedVisibility, true);
	}

	// @outline METHODS

	SetAlignment(HorizontalAlignment?: Enum.HorizontalAlignment, VerticalAlignment?: Enum.VerticalAlignment) {
		if (HorizontalAlignment) this.UI.UIListLayout.HorizontalAlignment = HorizontalAlignment;
		if (VerticalAlignment) this.UI.UIListLayout.VerticalAlignment = VerticalAlignment;
		return this;
	}

	SetVisible(Visible: boolean, Internal?: boolean): this {
		if (!Internal) this.CachedVisibility = Visible;
		return super.SetVisible(Visible);
	}

	GetHeight(): number {
		return this.Components.GetComponentsHeight();
	}

	UpdateHeight(IsGlobal?: boolean): this {
		this.SetRootSize(new UDim2(1, 0, 0, this.GetHeight()));
		return super.UpdateHeight(IsGlobal);
	}
}
