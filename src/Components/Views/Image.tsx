import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ImageView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Image?: Vide.Derivable<string>;
		ImageColor?: Vide.Derivable<Color3>;
		ImageTransparency?: Vide.Derivable<number>;
		Padding?: Vide.Derivable<number>;
		Fit?: Vide.Derivable<boolean>;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const CtnChildren = {
			ImageLabel: (
				<imagelabel
					{...ViewDefaults.ImageLabel}
					Name="ImageLabel"
					Size={UDim2.fromScale(1, 1)}
					Image={() => Vide.read(Props.Image ?? "rbxasset://textures/ui/GuiImagePlaceholder.png")}
					ImageColor3={() => Vide.read(Props.ImageColor ?? Color3.fromRGB(255, 255, 255))}
					ImageTransparency={() => Vide.read(Props.ImageTransparency ?? 0)}
					ScaleType={() => (Vide.read(Props.Fit ?? false) ? Enum.ScaleType.Crop : Enum.ScaleType.Stretch)}
				/>
			) as ImageLabel,
		};

		const Children = {
			Ctn: (
				<frame
					{...ViewDefaults.Frame}
					Name="Ctn"
					Size={() => UDim2.fromScale(1 - Vide.read(Props.Padding ?? 0), 1 - Vide.read(Props.Padding ?? 0))}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					BackgroundTransparency={1}
				>
					{CtnChildren.ImageLabel}
					{Vide.show(
						() => !Vide.read(Props.Fit ?? false),
						() => (
							<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						),
					)}
				</frame>
			) as Frame & typeof CtnChildren,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Image"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 100)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children.Ctn}
			</frame>
		) as Frame & typeof Children;
	}
}
