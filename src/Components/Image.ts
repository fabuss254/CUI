import Vide from "@rbxts/vide";
import { ImageView } from "./Views/Image";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Image extends UIComponent<ReturnType<typeof ImageView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private ImageRevision = 0;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Image: Vide.source("rbxasset://textures/ui/GuiImagePlaceholder.png"),
			ImageColor: Vide.source(Color3.fromRGB(255, 255, 255)),
			ImageTransparency: Vide.source(0),
			Padding: Vide.source(0),
			Fit: Vide.source(false),
		};
		super(Manager, ID, (Props) => ImageView.Create({ ...Props, ...State }));
		this.State = State;
	}

	// @outline METHODS

	SetImage(NewImage: string | Promise<string>) {
		if (this.IsDestroyed()) return this;
		const Revision = ++this.ImageRevision;
		if (!typeIs(NewImage, "string")) {
			this.Janitor.AddPromise(
				NewImage.then((Image) => {
					if (!this.IsDestroyed() && this.ImageRevision === Revision) this.State.Image(Image);
				}),
			);
			return this;
		}
		this.State.Image(NewImage);
		return this;
	}

	GetImage() {
		return Vide.untrack(this.State.Image);
	}

	SetImageColor(NewColor: Color3) {
		this.State.ImageColor(NewColor);
		return this;
	}

	GetImageColor() {
		return Vide.untrack(this.State.ImageColor);
	}

	SetImageTransparency(NewTransparency: number) {
		this.State.ImageTransparency(NewTransparency);
		return this;
	}

	GetImageTransparency() {
		return Vide.untrack(this.State.ImageTransparency);
	}

	SetHeight(NewHeight: number) {
		this.SetRootSize(new UDim2(1, 0, 0, NewHeight));
		return this;
	}

	SetPaddingScale(NewPadding: number) {
		this.State.Padding(NewPadding);
		return this;
	}

	MakeItFit() {
		this.State.Fit(true);
		return this;
	}
}
