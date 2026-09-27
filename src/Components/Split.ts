import Vide from "@rbxts/vide";
import { SplitView } from "./Views/Split";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Split extends UIComponent<ReturnType<typeof SplitView.Create>> {
	// @outline PROPERTIES

	private readonly State;

	LeftComponents = this.Manager.CreateChildManager(this.UI.Left, this, () => {
		const Size = Vide.untrack(this.State.LeftWidth);
		return Size.Offset + Size.Scale * this.GetWidth();
	});
	RightComponents = this.Manager.CreateChildManager(this.UI.Right, this, () => {
		const Size = Vide.untrack(this.State.LeftWidth);
		return (1 - Size.Scale) * this.GetWidth() - Size.Offset;
	});

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			LeftWidth: Vide.source(new UDim(0.5, 0)),
			Left: {
				HorizontalAlignment: Vide.source<Enum.HorizontalAlignment>(Enum.HorizontalAlignment.Left),
				VerticalAlignment: Vide.source<Enum.VerticalAlignment>(Enum.VerticalAlignment.Top),
			},
			Right: {
				HorizontalAlignment: Vide.source<Enum.HorizontalAlignment>(Enum.HorizontalAlignment.Left),
				VerticalAlignment: Vide.source<Enum.VerticalAlignment>(Enum.VerticalAlignment.Top),
			},
		};
		super(Manager, ID, (Props) => SplitView.Create({ ...Props, ...State }));
		this.State = State;
		this.Janitor.Add(this.LeftComponents, "Destroy");
		this.Janitor.Add(this.RightComponents, "Destroy");
	}

	// @outline METHODS

	SetLeftSizePercent(Size: number) {
		this.State.LeftWidth(new UDim(Size, 0));
		return this;
	}

	SetLeftSizeAbsolute(Size: number) {
		this.State.LeftWidth(new UDim(0, Size));
		return this;
	}

	SetRightSizePercent(Size: number) {
		this.State.LeftWidth(new UDim(1 - Size, 0));
		return this;
	}

	SetRightSizeAbsolute(Size: number) {
		this.State.LeftWidth(new UDim(1, -Size));
		return this;
	}

	SetVerticalAlignment(Side: "Left" | "Right", Alignment: Enum.VerticalAlignment) {
		this.State[Side].VerticalAlignment(Alignment);
		return this;
	}

	SetHorizontalAlignment(Side: "Left" | "Right", Alignment: Enum.HorizontalAlignment) {
		this.State[Side].HorizontalAlignment(Alignment);
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
