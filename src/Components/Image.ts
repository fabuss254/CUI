import { ImageView } from "./Views/Image";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Image extends UIComponent<ImageView.T_UI> {
	// @outline PROPERTIES

	private ImageRevision = 0;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, ImageView.Create);
	}

	// @outline METHODS

	SetImage(NewImage: string | Promise<string>) {
		if (this.IsDestroyed()) return this;
		const Revision = ++this.ImageRevision;
		if (!typeIs(NewImage, "string")) {
			this.Janitor.AddPromise(
				NewImage.then((Image) => {
					if (this.IsDestroyed() || this.ImageRevision !== Revision) return;
					this.UI.Ctn.ImageLabel.Image = Image;
				}),
			);
			return this;
		}

		this.UI.Ctn.ImageLabel.Image = NewImage;
		return this;
	}

	GetImage() {
		return this.UI.Ctn.ImageLabel.Image;
	}

	SetImageColor(NewColor: Color3) {
		this.UI.Ctn.ImageLabel.ImageColor3 = NewColor;
		return this;
	}

	GetImageColor() {
		return this.UI.Ctn.ImageLabel.ImageColor3;
	}

	SetImageTransparency(NewTransparency: number) {
		this.UI.Ctn.ImageLabel.ImageTransparency = NewTransparency;
		return this;
	}

	GetImageTransparency() {
		return this.UI.Ctn.ImageLabel.ImageTransparency;
	}

	SetHeight(NewHeight: number) {
		this.SetRootSize(new UDim2(1, 0, 0, NewHeight));
		return this;
	}

	SetPaddingScale(NewPadding: number) {
		this.UI.Ctn.Size = UDim2.fromScale(1 - NewPadding, 1 - NewPadding);
		return this;
	}

	MakeItFit() {
		this.UI.Ctn.FindFirstChild("UIAspectRatioConstraint")?.Destroy();
		this.UI.Ctn.ImageLabel.ScaleType = Enum.ScaleType.Crop;
		return this;
	}
}
