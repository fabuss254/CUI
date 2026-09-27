import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace RichTextFormatButton {
	// @outline TYPES

	export type T_Props = {
		Name: string;
		Image: string;
		Order?: number;
		Color?: Vide.Derivable<Color3>;
		OnActivated: () => void;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const Hovering = Vide.source(false);
		const Children = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			Icon: (
				<imagelabel
					{...ViewDefaults.ImageLabel}
					Name="Icon"
					Size={UDim2.fromOffset(19, 19)}
					Image={Props.Image}
					ImageColor3={() => Vide.read(Props.Color) ?? Color3.fromRGB(193, 193, 193)}
					ResampleMode={Enum.ResamplerMode.Pixelated}
				/>
			) as ImageLabel,
			Interactibility: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Interactibility"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					MouseEnter={() => Hovering(true)}
					MouseLeave={() => Hovering(false)}
					MouseButton1Down={Props.OnActivated}
				/>
			) as TextButton,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name={Props.Name}
				LayoutOrder={Props.Order ?? 0}
				BackgroundTransparency={() => (Hovering() ? 0.9 : 1)}
			>
				{Children.UIAspectRatioConstraint}
				{Children.Icon}
				{Children.Interactibility}
			</frame>
		) as Frame & typeof Children;
	}
}
