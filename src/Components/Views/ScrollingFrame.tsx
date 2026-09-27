import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ScrollingFrameView {
	// @outline TYPES

	export type T_UI = Frame & {
		ScrollBG: Frame;
		Content: ScrollingFrame & {
			UIListLayout: UIListLayout;
		};
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="ScrollingFrame"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 60)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 3}
			>
				<frame
					{...ViewDefaults.Frame}
					Name="ScrollBG"
					AnchorPoint={new Vector2(1, 1)}
					Position={UDim2.fromScale(1, 1)}
					Size={new UDim2(0, 10, 1, 0)}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				/>
				<scrollingframe {...ViewDefaults.ScrollingFrame} Name="Content" ZIndex={50} ScrollBarImageTransparency={0.75}>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</scrollingframe>
			</frame>
		) as T_UI;
	}
}
