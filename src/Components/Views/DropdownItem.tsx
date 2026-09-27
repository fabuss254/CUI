import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace DropdownItemView {
	// @outline TYPES

	export type T_Props = {
		Text: Vide.Derivable<string>;
		Visible: Vide.Derivable<boolean>;
		LayoutOrder: number;
		OnSelected: () => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const Hovered = Vide.source(false);
		const Children = {
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -8, 1, 0)}
					ZIndex={9000001}
					FontFace={new Font("rbxasset://fonts/families/RobotoCondensed.json")}
					Text={() => Vide.read(Props.Text)}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextWrapped={true}
					TextTruncate={Enum.TextTruncate.AtEnd}
				/>
			) as TextLabel,
			TextButton: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="TextButton"
					ZIndex={9000010}
					AutoButtonColor={false}
					BackgroundTransparency={() => (Hovered() ? 0.8 : 1)}
					MouseEnter={() => Hovered(true)}
					MouseLeave={() => Hovered(false)}
					MouseButton1Down={Props.OnSelected}
				/>
			) as TextButton,
		};
		const Item = (
			<frame
				{...ViewDefaults.Frame}
				Name={() => Vide.read(Props.Text)}
				Size={new UDim2(1, 0, 0, 20)}
				Visible={() => Vide.read(Props.Visible)}
				LayoutOrder={Props.LayoutOrder}
				BackgroundTransparency={1}
			>
				{Children.TextLabel}
				{Children.TextButton}
			</frame>
		) as Frame & typeof Children;
		Vide.cleanup(Item);
		return Item;
	}
}
