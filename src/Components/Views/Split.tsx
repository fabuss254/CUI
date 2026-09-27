import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace SplitView {
	// @outline TYPES

	type Alignment = {
		HorizontalAlignment: Vide.Derivable<Enum.HorizontalAlignment>;
		VerticalAlignment: Vide.Derivable<Enum.VerticalAlignment>;
	};

	export type T_Props = UIState.T_Props & {
		LeftWidth: Vide.Derivable<UDim>;
		Left: Alignment;
		Right: Alignment;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const LeftChildren = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					HorizontalAlignment={Props.Left.HorizontalAlignment}
					VerticalAlignment={Props.Left.VerticalAlignment}
				/>
			) as UIListLayout,
		};
		const RightChildren = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					HorizontalAlignment={Props.Right.HorizontalAlignment}
					VerticalAlignment={Props.Right.VerticalAlignment}
				/>
			) as UIListLayout,
		};
		const LeftWidth = Vide.derive(() => Vide.read(Props.LeftWidth));
		const Children = {
			Left: (
				<frame {...ViewDefaults.Frame} Name="Left" BackgroundTransparency={1} Size={() => new UDim2(LeftWidth(), new UDim(1, 0))}>
					{LeftChildren.UIListLayout}
				</frame>
			) as Frame & typeof LeftChildren,
			Right: (
				<frame
					{...ViewDefaults.Frame}
					Name="Right"
					BackgroundTransparency={1}
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={() => new UDim2(1 - LeftWidth().Scale, -LeftWidth().Offset, 1, 0)}
				>
					{RightChildren.UIListLayout}
				</frame>
			) as Frame & typeof RightChildren,
		};
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Split"
				Visible={() => Props.Visible?.() ?? true}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 20)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children.Left}
				{Children.Right}
			</frame>
		) as Frame & typeof Children;
	}
}
