import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace SeparatorView {
	// @outline TYPES

	export type T_UI = Frame & {
		Frame: Frame;
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Separator"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 8)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(53, 53, 53)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<frame
					{...ViewDefaults.Frame}
					Name="Frame"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, 0, 0, 2)}
					ZIndex={5}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.5}
					BorderColor3={Color3.fromRGB(34, 34, 34)}
					BorderSizePixel={1}
					BorderMode={Enum.BorderMode.Inset}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				/>
			</frame>
		) as T_UI;
	}
}
