import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";
import { SequenceField } from "./SequenceField";

export namespace SequenceFields {
	// @outline TYPES

	export type T_Props = {
		Min: Vide.Derivable<number>;
		Max: Vide.Derivable<number>;
		Time: Vide.Derivable<number>;
		Value: Vide.Derivable<number>;
		OnMin: (Value: number) => void;
		OnMax: (Value: number) => void;
		OnTime: (Value: number) => void;
		OnValue: (Value: number) => void;
		OnRemove: () => void;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const RemoveLabelChildren = {
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={new UDim2(0.5, 1, 0.5, 1)}
					Size={UDim2.fromScale(1, 1)}
					Active={true}
					Selectable={true}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
					Text={"Remove"}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextXAlignment={Enum.TextXAlignment.Center}
				/>
			) as TextLabel,
		};

		const RemoveButtonChildren = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
				/>
			) as UIListLayout,
			Btn: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Btn"
					MouseButton1Click={Props.OnRemove}
					Size={new UDim2(0, 46, 1, 0)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(68, 72, 90)}
					BackgroundTransparency={0}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
				>
					{RemoveLabelChildren.TextLabel}
				</textbutton>
			) as TextButton & typeof RemoveLabelChildren,
		};

		const FieldsChildren = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					Padding={new UDim(0, 2)}
					HorizontalFlex={Enum.UIFlexAlignment.SpaceAround}
				/>
			) as UIListLayout,
			Max: (<SequenceField.Component Name="Max" Order={10} Value={Props.Max} OnChanged={Props.OnMax} />) as ReturnType<
				typeof SequenceField.Component
			>,
			RemoveBtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="RemoveBtn"
					LayoutOrder={50}
					Size={UDim2.fromScale(0.1, 1)}
					ZIndex={10}
					BackgroundTransparency={1}
				>
					{RemoveButtonChildren.UIListLayout}
					{RemoveButtonChildren.Btn}
				</frame>
			) as Frame & typeof RemoveButtonChildren,
			Time: (<SequenceField.Component Name="Time" Order={-5} Value={Props.Time} OnChanged={Props.OnTime} />) as ReturnType<
				typeof SequenceField.Component
			>,
			Value: (<SequenceField.Component Name="Value" Order={0} Value={Props.Value} OnChanged={Props.OnValue} />) as ReturnType<
				typeof SequenceField.Component
			>,
			Min: (<SequenceField.Component Name="Min" Order={9} Value={Props.Min} OnChanged={Props.OnMin} />) as ReturnType<
				typeof SequenceField.Component
			>,
		};

		const Children = {
			Ctn: (
				<frame
					{...ViewDefaults.Frame}
					Name="Ctn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -4, 1, -4)}
					BackgroundTransparency={1}
				>
					{FieldsChildren.UIListLayout}
					{FieldsChildren.Max}
					{FieldsChildren.RemoveBtn}
					{FieldsChildren.Time}
					{FieldsChildren.Value}
					{FieldsChildren.Min}
				</frame>
			) as Frame & typeof FieldsChildren,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Bottom"
				LayoutOrder={10}
				Size={new UDim2(1, 0, 0, 18)}
				ZIndex={3}
				BackgroundColor3={Color3.fromRGB(36, 36, 36)}
			>
				{Children.Ctn}
			</frame>
		) as Frame & typeof Children;
	}
}
