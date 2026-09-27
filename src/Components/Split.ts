import { SplitView } from "./Views/Split";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Split extends UIComponent<SplitView.T_UI> {
	// @outline PROPERTIES

	LeftComponents = this.Manager.CreateChildManager(
		this.UI.Left,
		this,
		() => this.UI.Left.Size.X.Offset + this.UI.Left.Size.X.Scale * this.GetWidth(),
	);
	RightComponents = this.Manager.CreateChildManager(
		this.UI.Right,
		this,
		() => this.UI.Right.Size.X.Offset + this.UI.Right.Size.X.Scale * this.GetWidth(),
	);

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, SplitView.Create);
		this.Janitor.Add(this.LeftComponents, "Destroy");
		this.Janitor.Add(this.RightComponents, "Destroy");
	}

	// @outline METHODS

	SetLeftSizePercent(Size: number) {
		this.UI.Left.Size = UDim2.fromScale(Size, 1);
		this.UI.Right.Size = UDim2.fromScale(1 - Size, 1);
		return this;
	}

	SetLeftSizeAbsolute(Size: number) {
		this.UI.Left.Size = new UDim2(0, Size, 1, 0);
		this.UI.Right.Size = new UDim2(1, -Size, 1, 0);
		return this;
	}

	SetRightSizePercent(Size: number) {
		this.UI.Right.Size = UDim2.fromScale(Size, 1);
		this.UI.Left.Size = UDim2.fromScale(1 - Size, 1);
		return this;
	}

	SetRightSizeAbsolute(Size: number) {
		this.UI.Right.Size = new UDim2(0, Size, 1, 0);
		this.UI.Left.Size = new UDim2(1, -Size, 1, 0);
		return this;
	}

	SetVerticalAlignment(Side: "Left" | "Right", Alignment: Enum.VerticalAlignment) {
		this.UI[Side].UIListLayout.VerticalAlignment = Alignment;
		return this;
	}

	SetHorizontalAlignment(Side: "Left" | "Right", Alignment: Enum.HorizontalAlignment) {
		this.UI[Side].UIListLayout.HorizontalAlignment = Alignment;
		return this;
	}

	GetHeight(): number {
		const LeftHeight = this.LeftComponents.GetComponentsHeight();
		const RightHeight = this.RightComponents.GetComponentsHeight();
		return math.max(LeftHeight, RightHeight);
	}

	UpdateHeight(IsGlobal?: boolean): this {
		this.SetRootSize(new UDim2(1, 0, 0, this.GetHeight()));
		return super.UpdateHeight(IsGlobal);
	}
}
