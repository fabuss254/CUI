import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ViewportView {
	// @outline TYPES

	export type T_UI = Frame & {
		ViewportFrame: ViewportFrame & {
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Warning: ImageLabel;
		};
		UIListLayout: UIListLayout;
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Viewport"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 100)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(53, 53, 53)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<viewportframe {...ViewDefaults.ViewportFrame} Name="ViewportFrame">
					<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
					<imagelabel {...ViewDefaults.ImageLabel} Name="Warning" Visible={false} Image={"rbxassetid://11745872910"} />
				</viewportframe>
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			</frame>
		) as T_UI;
	}
}
