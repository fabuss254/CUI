import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace BoxView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		HorizontalAlignment?: Vide.Derivable<Enum.HorizontalAlignment>;
		VerticalAlignment?: Vide.Derivable<Enum.VerticalAlignment>;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const Children = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					HorizontalAlignment={() => Vide.read(Props.HorizontalAlignment) ?? Enum.HorizontalAlignment.Left}
					VerticalAlignment={() => Vide.read(Props.VerticalAlignment) ?? Enum.VerticalAlignment.Top}
				/>
			) as UIListLayout,
		};
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Box"
				Visible={() => (Props.Visible?.() ?? true) && (Props.Enabled?.() ?? true)}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 20)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children.UIListLayout}
			</frame>
		) as Frame & typeof Children;
	}
}
