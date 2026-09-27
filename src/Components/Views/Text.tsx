import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace TextView {
	// @outline TYPES

	export type T_UI = Frame & {
		TextLabel: TextLabel;
	};

	export type T_Props = UIState.T_Props & {
		Text?: () => string | undefined;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		const { Text } = Props;

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Text"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 18)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(53, 53, 53)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					Size={new UDim2(1, -6, 1, -2)}
					BackgroundColor3={Color3.fromRGB(136, 255, 0)}
					FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					TextColor3={Color3.fromRGB(218, 218, 218)}
					TextWrapped={true}
					action={ViewDefaults.Attributes({ _TextColor3: "TitlebarText" })}
					Text={() => Text?.() ?? "Exporting"}
				/>
			</frame>
		) as T_UI;
	}
}
