import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace SequencePoint {
	// @outline TYPES

	export type T_Props = {
		Name: string;
		Position: Vide.Derivable<Vector2>;
		Selected: Vide.Derivable<boolean>;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const Children = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(1, 0)} />) as UICorner,
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.6} />) as UIStroke,
		};

		const Root = (
			<frame
				{...ViewDefaults.Frame}
				Name={Props.Name}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={() => {
					const Value = Vide.read(Props.Position);
					return UDim2.fromScale(Value.X, Value.Y);
				}}
				Size={UDim2.fromOffset(10, 10)}
				ZIndex={11}
				BackgroundColor3={() => (Vide.read(Props.Selected) ? Color3.fromRGB(255, 115, 115) : new Color3(1, 1, 1))}
			>
				{Children.UICorner}
				{Children.UIStroke}
			</frame>
		) as Frame & typeof Children;
		Vide.cleanup(Root);
		return Root;
	}
}
