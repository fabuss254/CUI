import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace SplitView {
	// @outline TYPES

	export type T_UI = Frame & {
		Left: Frame & {
			UIListLayout: UIListLayout;
		};
		Right: Frame & {
			UIListLayout: UIListLayout;
		};
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Split"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 20)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<frame {...ViewDefaults.Frame} Name="Left" Size={UDim2.fromScale(0.5, 1)} BackgroundTransparency={1}>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
				<frame
					{...ViewDefaults.Frame}
					Name="Right"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={UDim2.fromScale(0.5, 1)}
					BackgroundTransparency={1}
				>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
			</frame>
		) as T_UI;
	}
}
