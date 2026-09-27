import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace GraphView {
	// @outline TYPES

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const ButtonChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
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
					Text={"R"}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextXAlignment={Enum.TextXAlignment.Center}
				/>
			) as TextLabel,
		};
		const ButtonContainerChildren = {
			UIListLayout: (
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" HorizontalAlignment={Enum.HorizontalAlignment.Right} />
			) as UIListLayout,
			Linear: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Linear"
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(68, 72, 90)}
					BackgroundTransparency={0}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
				>
					{ButtonChildren["UIAspectRatioConstraint"]}
					{ButtonChildren["TextLabel"]}
				</textbutton>
			) as TextButton & typeof ButtonChildren,
		};
		const HeaderChildren = {
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, 6, 0.5, 0)}
					Size={new UDim2(1, -6, 0, 12)}
					ZIndex={5}
					Active={true}
					Selectable={true}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={"Graph - Size"}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
				/>
			) as TextLabel,
			ButtonCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="ButtonCtn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -4, 1, -2)}
				>
					{ButtonContainerChildren["UIListLayout"]}
					{ButtonContainerChildren["Linear"]}
				</frame>
			) as Frame & typeof ButtonContainerChildren,
		};
		const DecorationChildren = {
			"X0.25": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.25"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.25, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.95}
				/>
			) as Frame,
			"X0.5": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.5"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.95}
				/>
			) as Frame,
			"X0.75": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.75"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.75, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.95}
				/>
			) as Frame,
			Y1: (
				<frame
					{...ViewDefaults.Frame}
					Name="Y1"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0)}
					Size={new UDim2(10, 0, 0, 1)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(148, 189, 255)}
					BackgroundTransparency={0.6}
				/>
			) as Frame,
			Y0: (
				<frame
					{...ViewDefaults.Frame}
					Name="Y0"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 1)}
					Size={new UDim2(10, 0, 0, 1)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(148, 189, 255)}
					BackgroundTransparency={0.6}
				/>
			) as Frame,
		};
		const StartChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />) as UICorner,
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />) as UIStroke,
		};
		const EndChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />) as UICorner,
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />) as UIStroke,
		};
		const ControlStartChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />) as UICorner,
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />) as UIStroke,
		};
		const ControlEndChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />) as UICorner,
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />) as UIStroke,
		};
		const ControlPointChildren = {
			Start: (
				<frame
					{...ViewDefaults.Frame}
					Name="Start"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 1)}
					Size={UDim2.fromOffset(10, 10)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(179, 255, 184)}
				>
					{ControlStartChildren["UICorner"]}
					{ControlStartChildren["UIStroke"]}
				</frame>
			) as Frame & typeof ControlStartChildren,
			End: (
				<frame
					{...ViewDefaults.Frame}
					Name="End"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0)}
					Size={UDim2.fromOffset(10, 10)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(255, 197, 197)}
				>
					{ControlEndChildren["UICorner"]}
					{ControlEndChildren["UIStroke"]}
				</frame>
			) as Frame & typeof ControlEndChildren,
			EndLine: (
				<frame
					{...ViewDefaults.Frame}
					Name="EndLine"
					Position={UDim2.fromScale(0.5, 0)}
					Size={new UDim2(0.5, 0, 0, 1)}
					ZIndex={12}
				/>
			) as Frame,
			StartLine: (
				<frame
					{...ViewDefaults.Frame}
					Name="StartLine"
					Position={UDim2.fromScale(0, 1)}
					Size={new UDim2(0.5, 0, 0, 1)}
					ZIndex={12}
				/>
			) as Frame,
		};
		const PlotChildren = {
			Deco: (
				<folder Name="Deco">
					{DecorationChildren["X0.25"]}
					{DecorationChildren["X0.5"]}
					{DecorationChildren["X0.75"]}
					{DecorationChildren["Y1"]}
					{DecorationChildren["Y0"]}
				</folder>
			) as Folder & typeof DecorationChildren,
			Start: (
				<frame
					{...ViewDefaults.Frame}
					Name="Start"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0, 1)}
					Size={UDim2.fromOffset(10, 10)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(123, 180, 255)}
				>
					{StartChildren["UICorner"]}
					{StartChildren["UIStroke"]}
				</frame>
			) as Frame & typeof StartChildren,
			End: (
				<frame
					{...ViewDefaults.Frame}
					Name="End"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(1, 0)}
					Size={UDim2.fromOffset(10, 10)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(123, 180, 255)}
				>
					{EndChildren["UICorner"]}
					{EndChildren["UIStroke"]}
				</frame>
			) as Frame & typeof EndChildren,
			Curve: (<folder Name="Curve" />) as Folder,
			ControlPoints: (
				<folder Name="ControlPoints">
					{ControlPointChildren["Start"]}
					{ControlPointChildren["End"]}
					{ControlPointChildren["EndLine"]}
					{ControlPointChildren["StartLine"]}
				</folder>
			) as Folder & typeof ControlPointChildren,
		};
		const PlotAreaChildren = {
			GraphContainer: (
				<frame
					{...ViewDefaults.Frame}
					Name="GraphContainer"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 0.7)}
				>
					{PlotChildren["Deco"]}
					{PlotChildren["Start"]}
					{PlotChildren["End"]}
					{PlotChildren["Curve"]}
					{PlotChildren["ControlPoints"]}
				</frame>
			) as Frame & typeof PlotChildren,
		};
		const MidChildren = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
			MouseInteraction: (<textbutton {...ViewDefaults.TextButton} Name="MouseInteraction" ZIndex={4000} />) as TextButton,
			InnerContent: (
				<frame
					{...ViewDefaults.Frame}
					Name="InnerContent"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -6, 1, -6)}
					ZIndex={5}
					BackgroundColor3={Color3.fromRGB(22, 22, 22)}
					ClipsDescendants={true}
				>
					{PlotAreaChildren["GraphContainer"]}
				</frame>
			) as Frame & typeof PlotAreaChildren,
		};
		const ContentChildren = {
			Top: (
				<frame
					{...ViewDefaults.Frame}
					Name="Top"
					Size={new UDim2(1, 0, 0, 18)}
					ZIndex={3}
					BackgroundColor3={Color3.fromRGB(44, 44, 44)}
				>
					{HeaderChildren["TextLabel"]}
					{HeaderChildren["ButtonCtn"]}
				</frame>
			) as Frame & typeof HeaderChildren,
			Mid: (
				<frame
					{...ViewDefaults.Frame}
					Name="Mid"
					LayoutOrder={5}
					Size={new UDim2(1, 0, 0, 18)}
					ZIndex={3}
					BackgroundColor3={Color3.fromRGB(38, 38, 38)}
				>
					{MidChildren["UIFlexItem"]}
					{MidChildren["MouseInteraction"]}
					{MidChildren["InnerContent"]}
				</frame>
			) as Frame & typeof MidChildren,
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
		};
		const Children = {
			BG: (<frame {...ViewDefaults.Frame} Name="BG" ZIndex={3} BackgroundColor3={Color3.fromRGB(38, 38, 38)} />) as Frame,
			Content: (
				<frame {...ViewDefaults.Frame} Name="Content">
					{ContentChildren["Top"]}
					{ContentChildren["Mid"]}
					{ContentChildren["UIListLayout"]}
				</frame>
			) as Frame & typeof ContentChildren,
		};
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Graph"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 140)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children["BG"]}
				{Children["Content"]}
			</frame>
		) as Frame & typeof Children;
	}
}
