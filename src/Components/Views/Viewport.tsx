import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ViewportView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Model: Vide.Derivable<PVInstance | undefined>;
		CameraCFrame: Vide.Derivable<CFrame>;
		FieldOfView: Vide.Derivable<number>;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const ViewportChildren = {
			Camera: (<camera Name="Camera" CFrame={Props.CameraCFrame} FieldOfView={Props.FieldOfView} />) as Camera,
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			Warning: (
				<imagelabel {...ViewDefaults.ImageLabel} Name="Warning" Visible={false} Image="rbxassetid://11745872910" />
			) as ImageLabel,
		};
		const Children = {
			ViewportFrame: (
				<viewportframe {...ViewDefaults.ViewportFrame} Name="ViewportFrame" CurrentCamera={ViewportChildren.Camera}>
					{ViewportChildren.Camera}
					{ViewportChildren.UIAspectRatioConstraint}
					{ViewportChildren.Warning}
					{() => Vide.read(Props.Model)}
				</viewportframe>
			) as ViewportFrame & typeof ViewportChildren,
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			) as UIListLayout,
		};
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Viewport"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? true}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 100)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(53, 53, 53)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children.ViewportFrame}
				{Children.UIListLayout}
			</frame>
		) as Frame & typeof Children;
	}
}
