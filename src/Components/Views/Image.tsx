import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ImageView {
	// @outline TYPES

	export type T_UI = Frame & {
		Ctn: Frame & {
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			ImageLabel: ImageLabel;
		};
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
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
				<frame
					{...ViewDefaults.Frame}
					Name="Ctn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					BackgroundTransparency={1}
				>
					<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
					<imagelabel
						{...ViewDefaults.ImageLabel}
						Name="ImageLabel"
						Size={UDim2.fromScale(1, 1)}
						Image={"rbxasset://textures/ui/GuiImagePlaceholder.png"}
					/>
				</frame>
			</frame>
		) as T_UI;
	}
}
