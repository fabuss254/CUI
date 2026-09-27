import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ButtonView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		ButtonText?: Vide.Derivable<string>;
		ButtonColor?: Vide.Derivable<Color3>;
		OnActivated?: () => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const Enabled = () => Props.Enabled?.() ?? true;

		const Children = {
			BG: (
				<frame
					{...ViewDefaults.Frame}
					Name="BG"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(34, 34, 34)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
				/>
			) as Frame,
			Btn: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Btn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -2, 1, -2)}
					ZIndex={30}
					BackgroundColor3={() =>
						Enabled() ? Vide.read(Props.ButtonColor ?? Color3.fromRGB(60, 60, 60)) : Color3.fromRGB(110, 110, 110)
					}
					AutoButtonColor={Enabled}
					MouseButton1Click={Props.OnActivated}
					BackgroundTransparency={0}
					BorderColor3={Color3.fromRGB(34, 34, 34)}
					BorderMode={Enum.BorderMode.Inset}
					FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
					TextColor3={() => (Enabled() ? Color3.fromRGB(229, 229, 229) : Color3.fromRGB(191, 191, 191))}
					action={ViewDefaults.Attributes({ _TextColor3: "BrightText", _BackgroundColor3: "Button", _BorderColor3: "Border" })}
					Text={() => Vide.read(Props.ButtonText ?? "Export to Attributes")}
				/>
			) as TextButton,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Button"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "Item", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 28)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(46, 46, 46)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 2}
			>
				{Children.BG}
				{Children.Btn}
			</frame>
		) as Frame & typeof Children;
	}
}
