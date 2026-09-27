import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace BoxView {
	// @outline TYPES

	export type T_UI = Frame & {
		UIListLayout: UIListLayout;
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Box"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 20)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
			</frame>
		) as T_UI;
	}
}
