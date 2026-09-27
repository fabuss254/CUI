import Vide from "@rbxts/vide";
import { ViewportView } from "./Views/Viewport";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Viewport extends UIComponent<ReturnType<typeof ViewportView.Create>> {
	// @outline PROPERTIES

	private readonly State;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Model: Vide.source<PVInstance>(),
			CameraCFrame: Vide.source(new CFrame()),
			FieldOfView: Vide.source(30),
		};
		super(Manager, ID, (Props) => ViewportView.Create({ ...Props, ...State }));
		this.State = State;
		this.Janitor.Add(() => this.Clear(), true);
	}

	// @outline METHODS

	Clear() {
		const Model = this.GetModel();
		this.State.Model(undefined);
		Model?.Destroy();
		return this;
	}

	SetYSize(Size: number) {
		this.SetRootSize(new UDim2(1, 0, 0, math.max(Size, 0)));
		this.UpdateParentHeight();
		return this;
	}

	SetModel(NewModel: PVInstance) {
		const Previous = this.GetModel();
		const Clone = NewModel.Clone();
		Clone.PivotTo(new CFrame());
		this.State.Model(Clone);
		Previous?.Destroy();
		return this;
	}

	SetDefaultCamera(Zoom = 6, FOV = 10) {
		const Model = this.GetModel();
		if (Model) {
			const BoundsModel = new Instance("Model");
			Model.Clone().Parent = BoundsModel;
			const [, Size] = BoundsModel.GetBoundingBox();
			BoundsModel.Destroy();
			Vide.batch(() => {
				this.State.FieldOfView(FOV);
				this.State.CameraCFrame(CFrame.lookAt(Size.mul(Zoom).mul(new Vector3(1, 2, 1)), Vector3.zero));
			});
		}
		return this;
	}

	GetModel() {
		return Vide.untrack(this.State.Model);
	}

	GetCamera() {
		return this.UI.ViewportFrame.Camera;
	}

	GetViewportInstance() {
		return this.UI.ViewportFrame;
	}
}
