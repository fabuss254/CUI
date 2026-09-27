import { GraphView } from "./Views/Graph";
import type { CUI } from "..";
import { UIComponent } from "./Base";

type GraphValue = [number, number, [number, number], [number, number]];
export class Graph extends UIComponent<ReturnType<typeof GraphView.Create>> {
	// @outline PROPERTIES

	GraphValue: GraphValue = [0, 0, [0, 0], [0, 0]];

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, GraphView.Create);
	}

	// @outline PRIVATE_METHODS

	private UpdateGraphCurve() {
		const UI = this.UI;
		const GraphCtn = UI.Content.Mid.InnerContent.GraphContainer;
	}

	// @outline METHODS

	SetCurve(NewCurve: GraphValue) {
		this.GraphValue = NewCurve;
		this.UpdateGraphCurve();
		return this;
	}

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		this.UpdateParentHeight();

		return this;
	}

	SetStartValue(Value: number) {
		this.GraphValue[0] = Value;
		this.UpdateGraphCurve();
		return this;
	}

	SetEndValue(Value: number) {
		this.GraphValue[1] = Value;
		this.UpdateGraphCurve();
		return this;
	}

	SetStartPosition(PosX: number, PosY: number) {
		this.GraphValue[2][0] = PosX;
		this.GraphValue[2][1] = PosY;
		this.UpdateGraphCurve();
		return this;
	}

	SetEndPosition(PosX: number, PosY: number) {
		this.GraphValue[3][0] = PosX;
		this.GraphValue[3][1] = PosY;
		this.UpdateGraphCurve();
		return this;
	}
}
