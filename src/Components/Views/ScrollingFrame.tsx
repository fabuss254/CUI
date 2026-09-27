import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ScrollingFrameView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Scroll?: Vide.Derivable<number>;
		ContentHeight?: Vide.Derivable<number>;
		OnScroll?: (Scroll: number) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const ContentChildren = {
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
		};
		const Children = {
			ScrollBG: (
				<frame
					{...ViewDefaults.Frame}
					Name="ScrollBG"
					AnchorPoint={new Vector2(1, 1)}
					Position={UDim2.fromScale(1, 1)}
					Size={new UDim2(0, 10, 1, 0)}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				/>
			) as Frame,
			Content: (
				<scrollingframe
					{...ViewDefaults.ScrollingFrame}
					Name="Content"
					ZIndex={50}
					ScrollBarImageTransparency={0.75}
					CanvasPosition={() => new Vector2(0, Vide.read(Props.Scroll) ?? 0)}
					CanvasPositionChanged={(Position) => Props.OnScroll?.(Position.Y)}
					CanvasSize={() => new UDim2(0, 0, 0, Vide.read(Props.ContentHeight) ?? 0)}
				>
					{ContentChildren.UIListLayout}
				</scrollingframe>
			) as ScrollingFrame & typeof ContentChildren,
		};
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
				{Children.ScrollBG}
				{Children.Content}
			</frame>
		) as Frame & typeof Children;
	}
}
