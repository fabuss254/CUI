import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace TitleView {
	// @outline TYPES

	export type T_UI = Frame & {
		TextLabel: TextLabel;
	};

	export type T_Props = UIState.T_Props & {
		Title?: () => string | undefined;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		const { Title } = Props;

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Title"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? true}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 24)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(53, 53, 53)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					Size={new UDim2(1, -6, 1, -2)}
					TextColor3={Color3.fromRGB(170, 170, 170)}
					action={ViewDefaults.Attributes({ _TextColor3: "TitlebarText" })}
					Text={() => Title?.() ?? "•   Exporting"}
				/>
			</frame>
		) as T_UI;
	}
}
