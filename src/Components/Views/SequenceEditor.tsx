import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace SequenceEditorView {
	// @outline TYPES

	export type T_UI = Frame & {
		BG: Frame;
		Content: Frame & {
			Top: Frame & {
				TextLabel: TextLabel;
				ButtonCtn: Frame & {
					UIListLayout: UIListLayout;
					Refresh: TextButton & {
						UIAspectRatioConstraint: UIAspectRatioConstraint;
						TextLabel: TextLabel;
					};
				};
			};
			Mid: Frame & {
				UIFlexItem: UIFlexItem;
				MouseInteraction: TextButton;
				InnerContent: Frame & {
					SequenceContainer: Frame & {
						Deco: Folder & {
							"X0.25": Frame;
							"X0.5": Frame;
							"X0.75": Frame;
							Y1: Frame;
							Y0: Frame;
							"X0.125": Frame;
							"X0.375": Frame;
							"X0.625": Frame;
							"X0.875": Frame;
						};
						Curve: Folder & {
							LineExample: Frame;
						};
						ControlPoints: Folder & {
							End: Frame & {
								UICorner: UICorner;
								UIStroke: UIStroke;
							};
							Start: Frame & {
								UICorner: UICorner;
								UIStroke: UIStroke;
							};
						};
					};
				};
			};
			UIListLayout: UIListLayout;
			Bottom: Frame & {
				Ctn: Frame & {
					UIListLayout: UIListLayout;
					Max: Frame & {
						TextBox: TextBox;
						TextLabel: TextLabel & {
							UIFlexItem: UIFlexItem;
						};
						UIListLayout: UIListLayout;
					};
					RemoveBtn: Frame & {
						UIListLayout: UIListLayout;
						Btn: TextButton & {
							TextLabel: TextLabel;
						};
					};
					Time: Frame & {
						TextBox: TextBox;
						TextLabel: TextLabel & {
							UIFlexItem: UIFlexItem;
						};
						UIListLayout: UIListLayout;
					};
					Value: Frame & {
						TextBox: TextBox;
						TextLabel: TextLabel & {
							UIFlexItem: UIFlexItem;
						};
						UIListLayout: UIListLayout;
					};
					Min: Frame & {
						TextBox: TextBox;
						TextLabel: TextLabel & {
							UIFlexItem: UIFlexItem;
						};
						UIListLayout: UIListLayout;
					};
				};
			};
		};
	};

	export type T_Props = UIState.T_Props;

	export type T_Point = T_UI["Content"]["Mid"]["InnerContent"]["SequenceContainer"]["ControlPoints"]["Start"];
	export type T_Line = T_UI["Content"]["Mid"]["InnerContent"]["SequenceContainer"]["Curve"]["LineExample"];

	// @outline PRIVATE_FUNCTIONS

	function GraphArea(): T_UI["Content"]["Mid"] {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Mid"
				LayoutOrder={5}
				Size={new UDim2(1, 0, 0, 18)}
				ZIndex={3}
				BackgroundColor3={Color3.fromRGB(38, 38, 38)}
			>
				<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
				<textbutton {...ViewDefaults.TextButton} Name="MouseInteraction" ZIndex={4000} />
				<frame
					{...ViewDefaults.Frame}
					Name="InnerContent"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -6, 0.9, -6)}
					ZIndex={5}
					BackgroundColor3={Color3.fromRGB(22, 22, 22)}
					ClipsDescendants={true}
				>
					<frame
						{...ViewDefaults.Frame}
						Name="SequenceContainer"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
					>
						<folder Name="Deco">
							<frame
								{...ViewDefaults.Frame}
								Name="X0.25"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.25, 0.5)}
								Size={new UDim2(0, 1, 10, 0)}
								ZIndex={10}
								BackgroundTransparency={0.85}
							/>
							<frame
								{...ViewDefaults.Frame}
								Name="X0.5"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.5, 0.5)}
								Size={new UDim2(0, 1, 10, 0)}
								ZIndex={10}
								BackgroundTransparency={0.85}
							/>
							<frame
								{...ViewDefaults.Frame}
								Name="X0.75"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.75, 0.5)}
								Size={new UDim2(0, 1, 10, 0)}
								ZIndex={10}
								BackgroundTransparency={0.85}
							/>
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
							<frame
								{...ViewDefaults.Frame}
								Name="X0.125"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.125, 0.5)}
								Size={new UDim2(0, 1, 10, 0)}
								ZIndex={10}
								BackgroundTransparency={0.95}
							/>
							<frame
								{...ViewDefaults.Frame}
								Name="X0.375"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.375, 0.5)}
								Size={new UDim2(0, 1, 10, 0)}
								ZIndex={10}
								BackgroundTransparency={0.95}
							/>
							<frame
								{...ViewDefaults.Frame}
								Name="X0.625"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.625, 0.5)}
								Size={new UDim2(0, 1, 10, 0)}
								ZIndex={10}
								BackgroundTransparency={0.95}
							/>
							<frame
								{...ViewDefaults.Frame}
								Name="X0.875"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.875, 0.5)}
								Size={new UDim2(0, 1, 10, 0)}
								ZIndex={10}
								BackgroundTransparency={0.95}
							/>
						</folder>
						<folder Name="Curve">{Line()}</folder>
						<folder Name="ControlPoints">
							<frame
								{...ViewDefaults.Frame}
								Name="End"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(1, 1)}
								Size={UDim2.fromOffset(10, 10)}
								ZIndex={15}
							>
								<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(1, 0)} />
								<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.6} />
							</frame>
							{Point()}
						</folder>
					</frame>
				</frame>
			</frame>
		) as T_UI["Content"]["Mid"];
	}

	function ValueFields(): T_UI["Content"]["Bottom"] {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Bottom"
				LayoutOrder={10}
				Size={new UDim2(1, 0, 0, 18)}
				ZIndex={3}
				BackgroundColor3={Color3.fromRGB(36, 36, 36)}
			>
				<frame
					{...ViewDefaults.Frame}
					Name="Ctn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -4, 1, -4)}
					BackgroundTransparency={1}
				>
					<uilistlayout
						{...ViewDefaults.UIListLayout}
						Name="UIListLayout"
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						Padding={new UDim(0, 2)}
						HorizontalFlex={Enum.UIFlexAlignment.SpaceAround}
					/>
					<frame
						{...ViewDefaults.Frame}
						Name="Max"
						LayoutOrder={10}
						Size={new UDim2(0.2, -2, 1, 0)}
						ZIndex={10}
						BackgroundTransparency={1}
					>
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
							Text={"10"}
							TextColor3={Color3.fromRGB(255, 255, 255)}
						/>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="TextLabel"
							LayoutOrder={-6}
							AnchorPoint={new Vector2(0, 0)}
							Position={UDim2.fromScale(0, 0)}
							Size={UDim2.fromScale(1, 1)}
							FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
							Text={"Max: "}
							TextSize={12}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextXAlignment={Enum.TextXAlignment.Right}
						>
							<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						</textlabel>
						<uilistlayout
							{...ViewDefaults.UIListLayout}
							Name="UIListLayout"
							FillDirection={Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Right}
						/>
					</frame>
					<frame
						{...ViewDefaults.Frame}
						Name="RemoveBtn"
						LayoutOrder={50}
						Size={UDim2.fromScale(0.1, 1)}
						ZIndex={10}
						BackgroundTransparency={1}
					>
						<uilistlayout
							{...ViewDefaults.UIListLayout}
							Name="UIListLayout"
							FillDirection={Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Right}
						/>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Btn"
							Size={new UDim2(0, 46, 1, 0)}
							ZIndex={10}
							BackgroundColor3={Color3.fromRGB(68, 72, 90)}
							BackgroundTransparency={0}
							FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
							TextSize={12}
							TextColor3={Color3.fromRGB(255, 255, 255)}
						>
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
						</textbutton>
					</frame>
					<frame
						{...ViewDefaults.Frame}
						Name="Time"
						LayoutOrder={-5}
						Size={new UDim2(0.2, -2, 1, 0)}
						ZIndex={10}
						BackgroundTransparency={1}
					>
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
							Text={"10"}
							TextColor3={Color3.fromRGB(255, 255, 255)}
						/>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="TextLabel"
							LayoutOrder={-6}
							AnchorPoint={new Vector2(0, 0)}
							Position={UDim2.fromScale(0, 0)}
							Size={UDim2.fromScale(1, 1)}
							FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
							Text={"Time: "}
							TextSize={12}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextXAlignment={Enum.TextXAlignment.Right}
						>
							<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						</textlabel>
						<uilistlayout
							{...ViewDefaults.UIListLayout}
							Name="UIListLayout"
							FillDirection={Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Right}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Value" Size={new UDim2(0.2, -2, 1, 0)} ZIndex={10} BackgroundTransparency={1}>
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
							Text={"10"}
							TextColor3={Color3.fromRGB(255, 255, 255)}
						/>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="TextLabel"
							LayoutOrder={-6}
							AnchorPoint={new Vector2(0, 0)}
							Position={UDim2.fromScale(0, 0)}
							Size={UDim2.fromScale(1, 1)}
							FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
							Text={"Value: "}
							TextSize={12}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextXAlignment={Enum.TextXAlignment.Right}
						>
							<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						</textlabel>
						<uilistlayout
							{...ViewDefaults.UIListLayout}
							Name="UIListLayout"
							FillDirection={Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Right}
						/>
					</frame>
					<frame
						{...ViewDefaults.Frame}
						Name="Min"
						LayoutOrder={9}
						Size={new UDim2(0.2, -2, 1, 0)}
						ZIndex={10}
						BackgroundTransparency={1}
					>
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
							Text={"0"}
							TextColor3={Color3.fromRGB(255, 255, 255)}
						/>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="TextLabel"
							LayoutOrder={-6}
							AnchorPoint={new Vector2(0, 0)}
							Position={UDim2.fromScale(0, 0)}
							Size={UDim2.fromScale(1, 1)}
							FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
							Text={"Min: "}
							TextSize={12}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextXAlignment={Enum.TextXAlignment.Right}
						>
							<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						</textlabel>
						<uilistlayout
							{...ViewDefaults.UIListLayout}
							Name="UIListLayout"
							FillDirection={Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Right}
						/>
					</frame>
				</frame>
			</frame>
		) as T_UI["Content"]["Bottom"];
	}

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="SequenceEditor"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 140)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<frame {...ViewDefaults.Frame} Name="BG" ZIndex={3} BackgroundColor3={Color3.fromRGB(38, 38, 38)} />
				<frame {...ViewDefaults.Frame} Name="Content">
					<frame
						{...ViewDefaults.Frame}
						Name="Top"
						Size={new UDim2(1, 0, 0, 18)}
						ZIndex={3}
						BackgroundColor3={Color3.fromRGB(44, 44, 44)}
					>
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
						<frame
							{...ViewDefaults.Frame}
							Name="ButtonCtn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={new UDim2(1, -4, 1, -2)}
						>
							<uilistlayout
								{...ViewDefaults.UIListLayout}
								Name="UIListLayout"
								HorizontalAlignment={Enum.HorizontalAlignment.Right}
							/>
							<textbutton
								{...ViewDefaults.TextButton}
								Name="Refresh"
								ZIndex={10}
								BackgroundColor3={Color3.fromRGB(68, 72, 90)}
								BackgroundTransparency={0}
								FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
								TextSize={12}
								TextColor3={Color3.fromRGB(255, 255, 255)}
							>
								<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
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
							</textbutton>
						</frame>
					</frame>
					{GraphArea()}
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
					{ValueFields()}
				</frame>
			</frame>
		) as T_UI;
	}

	export function Point(): T_Point {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Start"
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0, 1)}
				Size={UDim2.fromOffset(10, 10)}
				ZIndex={15}
			>
				<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(1, 0)} />
				<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.6} />
			</frame>
		) as T_Point;
	}

	export function Line(): T_Line {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="LineExample"
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={new UDim2(0.5, 0, 0, 1)}
				ZIndex={8}
				BackgroundTransparency={0.3}
			/>
		) as T_Line;
	}
}
