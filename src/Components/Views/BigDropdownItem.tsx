import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace BigDropdownItemView {
	// @outline TYPES

	export type T_Props = {
		Text: string;
		LayoutOrder: Vide.Derivable<number>;
		Selected: Vide.Derivable<boolean>;
		OnSelected: () => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const Children = {
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					ZIndex={11}
					FontFace={new Font("rbxassetid://16658246179")}
					Text={Props.Text}
					TextSize={12}
					TextColor3={Color3.fromRGB(220, 220, 220)}
				/>
			) as TextLabel,
		};
		const Item = (
			<textbutton
				{...ViewDefaults.TextButton}
				Name={Props.Text}
				Size={new UDim2(1, 0, 0, 18)}
				ZIndex={10}
				BackgroundTransparency={0}
				BorderColor3={Color3.fromRGB(29, 145, 208)}
				BorderMode={Enum.BorderMode.Inset}
				LayoutOrder={() => Vide.read(Props.LayoutOrder)}
				BorderSizePixel={() => (Vide.read(Props.Selected) ? 1 : 0)}
				BackgroundColor3={() => (Vide.read(Props.Selected) ? Color3.fromRGB(43, 69, 99) : Color3.fromRGB(61, 61, 61))}
				MouseButton1Click={Props.OnSelected}
			>
				{Children.TextLabel}
			</textbutton>
		) as TextButton & typeof Children;
		Vide.cleanup(Item);
		return Item;
	}
}
