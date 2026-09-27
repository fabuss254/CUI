import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace SequenceLine {
	// @outline TYPES

	export type T_Props = {
		Start: Vide.Derivable<Vector2>;
		End: Vide.Derivable<Vector2>;
		PixelSize: Vide.Derivable<Vector2>;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const PixelDelta = () => Vide.read(Props.End).sub(Vide.read(Props.Start)).mul(Vide.read(Props.PixelSize));

		const Root = (
			<frame
				{...ViewDefaults.Frame}
				Name="LineExample"
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={() => {
					const Center = Vide.read(Props.Start).add(Vide.read(Props.End)).mul(0.5);
					return UDim2.fromScale(Center.X, Center.Y);
				}}
				Rotation={() => {
					const Delta = PixelDelta();
					return math.deg(math.atan2(Delta.Y, Delta.X));
				}}
				Size={() => UDim2.fromOffset(PixelDelta().Magnitude, 1)}
				ZIndex={8}
				BackgroundTransparency={0.3}
			/>
		) as Frame;
		Vide.cleanup(Root);
		return Root;
	}
}
