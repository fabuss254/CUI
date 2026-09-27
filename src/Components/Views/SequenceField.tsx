import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace SequenceField {
	// @outline TYPES

	export type T_Props = {
		Name: string;
		Order: number;
		Value: Vide.Derivable<number>;
		OnChanged: (Value: number) => void;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const Draft = Vide.source<string>();
		let Box: TextBox | undefined;
		Vide.effect(() => {
			Vide.read(Props.Value);
			Draft(undefined);
		});
		const TextLabelChildren = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
		};

		const Children = {
			TextBox: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="TextBox"
					AnchorPoint={new Vector2(1, 1)}
					Position={UDim2.fromScale(1, 1)}
					Size={UDim2.fromScale(0.35, 1)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(54, 54, 54)}
					BackgroundTransparency={0}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={() => Draft() ?? tostring(math.floor(Vide.read(Props.Value) * 100) / 100)}
					ClearTextOnFocus={false}
					TextChanged={(Value) => Draft(Value)}
					FocusLost={(Enter) => {
						if (Enter && Box) Props.OnChanged(tonumber(Box.Text) ?? 0);
						Draft(undefined);
					}}
					action={(Instance) => {
						Box = Instance;
					}}
					TextColor3={Color3.fromRGB(255, 255, 255)}
				/>
			) as TextBox,
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					LayoutOrder={-6}
					AnchorPoint={new Vector2(0, 0)}
					Position={UDim2.fromScale(0, 0)}
					Size={UDim2.fromScale(1, 1)}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={`${Props.Name}: `}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextXAlignment={Enum.TextXAlignment.Right}
				>
					{TextLabelChildren.UIFlexItem}
				</textlabel>
			) as TextLabel & typeof TextLabelChildren,
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
				/>
			) as UIListLayout,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name={Props.Name}
				LayoutOrder={Props.Order}
				Size={new UDim2(0.2, -2, 1, 0)}
				ZIndex={10}
				BackgroundTransparency={1}
			>
				{Children.TextBox}
				{Children.TextLabel}
				{Children.UIListLayout}
			</frame>
		) as Frame & typeof Children;
	}
}
