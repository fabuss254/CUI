import { ViewportView } from "./Views/Viewport";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Viewport extends UIComponent<ViewportView.T_UI> {
	// @outline PROPERTIES

	private DisplayedModel: PVInstance | undefined = undefined;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, ViewportView.Create);

		// Setup the viewport frame
		this.Cleanup();

		const Camera = new Instance("Camera");
		Camera.FieldOfView = 30;
		Camera.Parent = this.UI.ViewportFrame;

		this.GetViewportInstance().CurrentCamera = Camera;
	}

	// @outline PRIVATE_METHODS

	private Cleanup() {
		this.UI.ViewportFrame.GetChildren()
			.filter((Child) => Child.IsA("Model"))
			.forEach((Child) => Child.Destroy());
	}

	// @outline METHODS

	Clear() {
		this.Cleanup();
		if (this.DisplayedModel) {
			this.DisplayedModel.Destroy();
			this.DisplayedModel = undefined;
		}

		return this;
	}

	SetYSize(Size: number) {
		this.SetRootSize(new UDim2(1, 0, 0, math.max(Size, 0)));
		this.UpdateParentHeight();

		return this;
	}

	SetModel(NewMdl: PVInstance) {
		if (this.DisplayedModel) {
			this.DisplayedModel.Destroy();
		}

		const MdlClone = NewMdl.Clone();
		MdlClone.PivotTo(new CFrame());
		MdlClone.Parent = this.UI.ViewportFrame;
		this.DisplayedModel = MdlClone;

		return this;
	}

	SetDefaultCamera(Zoom: number = 6, FOV = 10) {
		const Camera = this.GetCamera();
		const Model = this.GetModel();
		if (Camera && Model) {
			const TempModel = new Instance("Model");
			Model.Clone().Parent = TempModel;

			const [_, Size] = TempModel.GetBoundingBox();
			Camera.FieldOfView = FOV;
			Camera.CFrame = CFrame.lookAt(Size.mul(Zoom).mul(new Vector3(1, 2, 1)), Vector3.zero);

			TempModel.Destroy();
		}

		return this;
	}

	GetModel() {
		return this.DisplayedModel;
	}

	GetCamera() {
		return this.UI.ViewportFrame.FindFirstChild("Camera") as Camera | undefined;
	}

	GetViewportInstance() {
		return this.UI.ViewportFrame;
	}
}
