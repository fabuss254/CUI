import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace TabHeaderView {
	// @outline TYPES

	export type T_Props = {
		Name: string;
		Selected: Vide.Derivable<boolean>;
		LayoutOrder: Vide.Derivable<number>;
		OnSelected: () => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const Hovered = Vide.source(false);
		const TextWidth = Vide.source(38);
		const Children = {
			DecoHighlight: (
				<frame
					{...ViewDefaults.Frame}
					Name="DecoHighlight"
					Size={UDim2.fromScale(1, 0.1)}
					ZIndex={20}
					BackgroundColor3={() => (Vide.read(Props.Selected) ? Color3.fromRGB(53, 181, 255) : Color3.fromRGB(53, 53, 53))}
				/>
			) as Frame,
			Title: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					ZIndex={30}
					Text={Props.Name}
					TextBoundsChanged={(Bounds) => TextWidth(Bounds.X)}
					TextColor3={() => (Vide.read(Props.Selected) ? Color3.fromRGB(229, 229, 229) : Color3.fromRGB(170, 170, 170))}
				/>
			) as TextLabel,
			WhiteFrame: (
				<frame
					{...ViewDefaults.Frame}
					Name="WhiteFrame"
					ZIndex={800}
					Visible={() => !Vide.read(Props.Selected)}
					BackgroundTransparency={() => (Hovered() ? 0.8 : 1)}
				/>
			) as Frame,
			Interactibility: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Interactibility"
					ZIndex={3543456}
					MouseEnter={() => Hovered(true)}
					MouseLeave={() => Hovered(false)}
					MouseButton1Click={Props.OnSelected}
				/>
			) as TextButton,
		};
		const Header = (
			<frame
				{...ViewDefaults.Frame}
				Name={Props.Name}
				Size={() => UDim2.fromOffset(TextWidth() + 12, 18)}
				LayoutOrder={() => Vide.read(Props.LayoutOrder)}
				ZIndex={10}
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				BackgroundColor3={() => (Vide.read(Props.Selected) ? Color3.fromRGB(46, 46, 46) : Color3.fromRGB(64, 64, 64))}
			>
				{Children.DecoHighlight}
				{Children.Title}
				{Children.WhiteFrame}
				{Children.Interactibility}
			</frame>
		) as Frame & typeof Children;
		Vide.cleanup(Header);
		return Header;
	}
}
