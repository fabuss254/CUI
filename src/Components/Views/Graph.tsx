import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace GraphView {
	// @outline TYPES

	export type T_UI = Frame & {
		BG: Frame;
		Content: Frame & {
			Top: Frame & {
				TextLabel: TextLabel;
				ButtonCtn: Frame & {
					UIListLayout: UIListLayout;
					Linear: TextButton & {
						UIAspectRatioConstraint: UIAspectRatioConstraint;
						TextLabel: TextLabel;
					};
				};
			};
			Mid: Frame & {
				UIFlexItem: UIFlexItem;
				MouseInteraction: TextButton;
				InnerContent: Frame & {
					GraphContainer: Frame & {
						Deco: Folder & {
							"X0.25": Frame;
							"X0.5": Frame;
							"X0.75": Frame;
							Y1: Frame;
							Y0: Frame;
						};
						Start: Frame & {
							UICorner: UICorner;
							UIStroke: UIStroke;
						};
						End: Frame & {
							UICorner: UICorner;
							UIStroke: UIStroke;
						};
						Curve: Folder;
						ControlPoints: Folder & {
							Start: Frame & {
								UICorner: UICorner;
								UIStroke: UIStroke;
							};
							End: Frame & {
								UICorner: UICorner;
								UIStroke: UIStroke;
							};
							EndLine: Frame;
							StartLine: Frame;
						};
					};
				};
			};
			UIListLayout: UIListLayout;
		};
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
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
								Name="Linear"
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
							Size={new UDim2(1, -6, 1, -6)}
							ZIndex={5}
							BackgroundColor3={Color3.fromRGB(22, 22, 22)}
							ClipsDescendants={true}
						>
							<frame
								{...ViewDefaults.Frame}
								Name="GraphContainer"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.5, 0.5)}
								Size={UDim2.fromScale(1, 0.7)}
							>
								<folder Name="Deco">
									<frame
										{...ViewDefaults.Frame}
										Name="X0.25"
										AnchorPoint={new Vector2(0.5, 0.5)}
										Position={UDim2.fromScale(0.25, 0.5)}
										Size={new UDim2(0, 1, 10, 0)}
										ZIndex={10}
										BackgroundTransparency={0.95}
									/>
									<frame
										{...ViewDefaults.Frame}
										Name="X0.5"
										AnchorPoint={new Vector2(0.5, 0.5)}
										Position={UDim2.fromScale(0.5, 0.5)}
										Size={new UDim2(0, 1, 10, 0)}
										ZIndex={10}
										BackgroundTransparency={0.95}
									/>
									<frame
										{...ViewDefaults.Frame}
										Name="X0.75"
										AnchorPoint={new Vector2(0.5, 0.5)}
										Position={UDim2.fromScale(0.75, 0.5)}
										Size={new UDim2(0, 1, 10, 0)}
										ZIndex={10}
										BackgroundTransparency={0.95}
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
								</folder>
								<frame
									{...ViewDefaults.Frame}
									Name="Start"
									AnchorPoint={new Vector2(0.5, 0.5)}
									Position={UDim2.fromScale(0, 1)}
									Size={UDim2.fromOffset(10, 10)}
									ZIndex={15}
									BackgroundColor3={Color3.fromRGB(123, 180, 255)}
								>
									<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />
									<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />
								</frame>
								<frame
									{...ViewDefaults.Frame}
									Name="End"
									AnchorPoint={new Vector2(0.5, 0.5)}
									Position={UDim2.fromScale(1, 0)}
									Size={UDim2.fromOffset(10, 10)}
									ZIndex={15}
									BackgroundColor3={Color3.fromRGB(123, 180, 255)}
								>
									<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />
									<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />
								</frame>
								<folder Name="Curve" />
								<folder Name="ControlPoints">
									<frame
										{...ViewDefaults.Frame}
										Name="Start"
										AnchorPoint={new Vector2(0.5, 0.5)}
										Position={UDim2.fromScale(0.5, 1)}
										Size={UDim2.fromOffset(10, 10)}
										ZIndex={15}
										BackgroundColor3={Color3.fromRGB(179, 255, 184)}
									>
										<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />
										<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />
									</frame>
									<frame
										{...ViewDefaults.Frame}
										Name="End"
										AnchorPoint={new Vector2(0.5, 0.5)}
										Position={UDim2.fromScale(0.5, 0)}
										Size={UDim2.fromOffset(10, 10)}
										ZIndex={15}
										BackgroundColor3={Color3.fromRGB(255, 197, 197)}
									>
										<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 8)} />
										<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Thickness={2} />
									</frame>
									<frame
										{...ViewDefaults.Frame}
										Name="EndLine"
										Position={UDim2.fromScale(0.5, 0)}
										Size={new UDim2(0.5, 0, 0, 1)}
										ZIndex={12}
									/>
									<frame
										{...ViewDefaults.Frame}
										Name="StartLine"
										Position={UDim2.fromScale(0, 1)}
										Size={new UDim2(0.5, 0, 0, 1)}
										ZIndex={12}
									/>
								</folder>
							</frame>
						</frame>
					</frame>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
			</frame>
		) as T_UI;
	}
}
