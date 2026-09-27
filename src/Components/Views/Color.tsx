import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ColorView {
	// @outline TYPES

	export type T_UI = Frame & {
		Left: Frame & {
			Title: TextLabel;
		};
		BG: Frame;
		Right: Frame & {
			Ctn: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Frame: Frame & {
					UIStroke: UIStroke;
				};
				Btn: TextButton;
			};
			Selector: Frame & {
				RatioedCtn: Frame & {
					Sliders: Frame & {
						R: Frame & {
							Interactibility: TextButton;
							Items: Folder & {
								UIListLayout: UIListLayout;
								SliderCtn: Frame & {
									InnerSlider: Frame & {
										UIGradient: UIGradient;
										Cursor: Frame & {
											UIAspectRatioConstraint: UIAspectRatioConstraint;
											UIStroke: UIStroke;
											UICorner: UICorner;
										};
									};
								};
								NumCtn: Frame & {
									UIFlexItem: UIFlexItem;
									Title: TextLabel;
								};
							};
						};
						UIGridLayout: UIGridLayout;
						G: Frame & {
							Interactibility: TextButton;
							Items: Folder & {
								UIListLayout: UIListLayout;
								SliderCtn: Frame & {
									InnerSlider: Frame & {
										UIGradient: UIGradient;
										Cursor: Frame & {
											UIAspectRatioConstraint: UIAspectRatioConstraint;
											UIStroke: UIStroke;
											UICorner: UICorner;
										};
									};
								};
								NumCtn: Frame & {
									UIFlexItem: UIFlexItem;
									Title: TextLabel;
								};
							};
						};
						B: Frame & {
							Interactibility: TextButton;
							Items: Folder & {
								UIListLayout: UIListLayout;
								SliderCtn: Frame & {
									InnerSlider: Frame & {
										UIGradient: UIGradient;
										Cursor: Frame & {
											UIAspectRatioConstraint: UIAspectRatioConstraint;
											UIStroke: UIStroke;
											UICorner: UICorner;
										};
									};
								};
								NumCtn: Frame & {
									UIFlexItem: UIFlexItem;
									Title: TextLabel;
								};
							};
						};
					};
					Others: Frame & {
						UIFlexItem: UIFlexItem;
						Mode: Frame & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							BG: Frame;
							Btn: TextButton;
						};
						UIListLayout: UIListLayout;
						UIPadding: UIPadding;
						HTML: Frame & {
							TextBox: TextBox;
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIStroke: UIStroke;
						};
					};
					UIListLayout: UIListLayout;
				};
				BG: TextButton & {
					UIStroke: UIStroke;
				};
			};
			NonEnabled: Frame;
		};
		WhiteFrame: Frame;
	};

	export type T_Props = UIState.T_Props & {
		Color?: () => Color3;
		IsOpen?: () => boolean;
	};

	// @outline PRIVATE_FUNCTIONS

	function RedChannel(): T_UI["Right"]["Selector"]["RatioedCtn"]["Sliders"]["R"] {
		return (
			<frame {...ViewDefaults.Frame} Name="R" LayoutOrder={1}>
				<textbutton {...ViewDefaults.TextButton} Name="Interactibility" ZIndex={9000053} />
				<folder Name="Items">
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" FillDirection={Enum.FillDirection.Horizontal} />
					<frame
						{...ViewDefaults.Frame}
						Name="SliderCtn"
						AnchorPoint={new Vector2(0, 0.5)}
						Position={UDim2.fromScale(0, 0.5)}
						Size={UDim2.fromScale(0.9, 1)}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="InnerSlider"
							AnchorPoint={new Vector2(1, 0.5)}
							Position={UDim2.fromScale(1, 0.5)}
							Size={new UDim2(1, -4, 0.2, 0)}
							ZIndex={9000015}
						>
							<uigradient {...ViewDefaults.UIGradient} Name="UIGradient" />
							<frame
								{...ViewDefaults.Frame}
								Name="Cursor"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.5, 0.5)}
								Size={UDim2.fromScale(4, 4)}
								ZIndex={9000021}
								BackgroundColor3={Color3.fromRGB(53, 181, 255)}
							>
								<uiaspectratioconstraint
									{...ViewDefaults.UIAspectRatioConstraint}
									Name="UIAspectRatioConstraint"
									AspectRatio={0.25}
								/>
								<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.5} />
								<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(1, 0)} />
							</frame>
						</frame>
					</frame>
					<frame {...ViewDefaults.Frame} Name="NumCtn" AnchorPoint={new Vector2(0, 0.5)} Position={UDim2.fromScale(0, 0.5)}>
						<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							ZIndex={9000004}
							Text={"128"}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
				</folder>
			</frame>
		) as T_UI["Right"]["Selector"]["RatioedCtn"]["Sliders"]["R"];
	}

	function GreenChannel(): T_UI["Right"]["Selector"]["RatioedCtn"]["Sliders"]["G"] {
		return (
			<frame {...ViewDefaults.Frame} Name="G" LayoutOrder={1}>
				<textbutton {...ViewDefaults.TextButton} Name="Interactibility" ZIndex={9000053} />
				<folder Name="Items">
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" FillDirection={Enum.FillDirection.Horizontal} />
					<frame
						{...ViewDefaults.Frame}
						Name="SliderCtn"
						AnchorPoint={new Vector2(0, 0.5)}
						Position={UDim2.fromScale(0, 0.5)}
						Size={UDim2.fromScale(0.9, 1)}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="InnerSlider"
							AnchorPoint={new Vector2(1, 0.5)}
							Position={UDim2.fromScale(1, 0.5)}
							Size={new UDim2(1, -4, 0.2, 0)}
							ZIndex={9000015}
						>
							<uigradient {...ViewDefaults.UIGradient} Name="UIGradient" />
							<frame
								{...ViewDefaults.Frame}
								Name="Cursor"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.5, 0.5)}
								Size={UDim2.fromScale(4, 4)}
								ZIndex={9000021}
								BackgroundColor3={Color3.fromRGB(53, 181, 255)}
							>
								<uiaspectratioconstraint
									{...ViewDefaults.UIAspectRatioConstraint}
									Name="UIAspectRatioConstraint"
									AspectRatio={0.25}
								/>
								<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.5} />
								<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(1, 0)} />
							</frame>
						</frame>
					</frame>
					<frame {...ViewDefaults.Frame} Name="NumCtn" AnchorPoint={new Vector2(0, 0.5)} Position={UDim2.fromScale(0, 0.5)}>
						<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							ZIndex={9000004}
							Text={"128"}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
				</folder>
			</frame>
		) as T_UI["Right"]["Selector"]["RatioedCtn"]["Sliders"]["G"];
	}

	function BlueChannel(): T_UI["Right"]["Selector"]["RatioedCtn"]["Sliders"]["B"] {
		return (
			<frame {...ViewDefaults.Frame} Name="B" LayoutOrder={1}>
				<textbutton {...ViewDefaults.TextButton} Name="Interactibility" ZIndex={9000053} />
				<folder Name="Items">
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" FillDirection={Enum.FillDirection.Horizontal} />
					<frame
						{...ViewDefaults.Frame}
						Name="SliderCtn"
						AnchorPoint={new Vector2(0, 0.5)}
						Position={UDim2.fromScale(0, 0.5)}
						Size={UDim2.fromScale(0.9, 1)}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="InnerSlider"
							AnchorPoint={new Vector2(1, 0.5)}
							Position={UDim2.fromScale(1, 0.5)}
							Size={new UDim2(1, -4, 0.2, 0)}
							ZIndex={9000015}
						>
							<uigradient {...ViewDefaults.UIGradient} Name="UIGradient" />
							<frame
								{...ViewDefaults.Frame}
								Name="Cursor"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.5, 0.5)}
								Size={UDim2.fromScale(4, 4)}
								ZIndex={9000021}
								BackgroundColor3={Color3.fromRGB(53, 181, 255)}
							>
								<uiaspectratioconstraint
									{...ViewDefaults.UIAspectRatioConstraint}
									Name="UIAspectRatioConstraint"
									AspectRatio={0.25}
								/>
								<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.5} />
								<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(1, 0)} />
							</frame>
						</frame>
					</frame>
					<frame {...ViewDefaults.Frame} Name="NumCtn" AnchorPoint={new Vector2(0, 0.5)} Position={UDim2.fromScale(0, 0.5)}>
						<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							ZIndex={9000004}
							Text={"128"}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
				</folder>
			</frame>
		) as T_UI["Right"]["Selector"]["RatioedCtn"]["Sliders"]["B"];
	}

	function OtherControls(): T_UI["Right"]["Selector"]["RatioedCtn"]["Others"] {
		return (
			<frame {...ViewDefaults.Frame} Name="Others" LayoutOrder={2} BackgroundTransparency={1}>
				<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
				<frame {...ViewDefaults.Frame} Name="Mode">
					<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={2} />
					<frame
						{...ViewDefaults.Frame}
						Name="BG"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						ZIndex={9000012}
						BackgroundColor3={Color3.fromRGB(34, 34, 34)}
						action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
					/>
					<textbutton
						{...ViewDefaults.TextButton}
						Name="Btn"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						Size={new UDim2(1, -2, 1, -2)}
						ZIndex={9000021}
						BackgroundColor3={Color3.fromRGB(36, 126, 175)}
						BackgroundTransparency={0}
						BorderColor3={Color3.fromRGB(34, 34, 34)}
						BorderMode={Enum.BorderMode.Inset}
						FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
						Text={"RGB"}
						TextSize={21}
						TextColor3={Color3.fromRGB(229, 229, 229)}
						TextWrapped={true}
						action={ViewDefaults.Attributes({
							_TextColor3: "BrightText",
							_BackgroundColor3: "Button",
							_BorderColor3: "Border",
						})}
					/>
				</frame>
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalFlex={Enum.UIFlexAlignment.SpaceBetween}
				/>
				<uipadding {...ViewDefaults.UIPadding} Name="UIPadding" PaddingBottom={new UDim(0, 4)} PaddingRight={new UDim(0, 0)} />
				<frame
					{...ViewDefaults.Frame}
					Name="HTML"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					ZIndex={9000018}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					ClipsDescendants={true}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					<textbox
						{...ViewDefaults.TextBox}
						Name="TextBox"
						AnchorPoint={new Vector2(1, 0)}
						Position={UDim2.fromScale(1, 0)}
						Size={new UDim2(1, -6, 1, 0)}
						ZIndex={9000027}
						FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
						Text={"#FFFFFF"}
						TextTruncate={Enum.TextTruncate.AtEnd}
						ClearTextOnFocus={false}
						action={ViewDefaults.Attributes({ FieldName: "Object_Position Y", _TextColor3: "BrightText" })}
					/>
					<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={3} />
					<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.6} />
				</frame>
			</frame>
		) as T_UI["Right"]["Selector"]["RatioedCtn"]["Others"];
	}

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		const { Color, IsOpen } = Props;

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Color"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "Item", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? true}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 22)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(46, 46, 46)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 12}
			>
				<frame
					{...ViewDefaults.Frame}
					Name="Left"
					Size={new UDim2(0.5, -1, 1, 0)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					<textlabel
						{...ViewDefaults.TextLabel}
						Name="Title"
						ZIndex={20}
						FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
						Text={"Color Selector"}
						action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
					/>
				</frame>
				<frame
					{...ViewDefaults.Frame}
					Name="BG"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, 2, 1, 2)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(34, 34, 34)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
				/>
				<frame
					{...ViewDefaults.Frame}
					Name="Right"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={new UDim2(0.5, -1, 1, 0)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					<frame {...ViewDefaults.Frame} Name="Ctn">
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						<frame
							{...ViewDefaults.Frame}
							Name="Frame"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={50}
							BackgroundColor3={() => Color?.() ?? Color3.fromRGB(255, 62, 62)}
						>
							<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" />
						</frame>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Btn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={new UDim2(1, -2, 1, -2)}
							ZIndex={30}
							BackgroundColor3={Color3.fromRGB(60, 60, 60)}
							BackgroundTransparency={0}
							BorderColor3={Color3.fromRGB(34, 34, 34)}
							BorderMode={Enum.BorderMode.Inset}
							FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
							TextColor3={Color3.fromRGB(229, 229, 229)}
							action={ViewDefaults.Attributes({
								_TextColor3: "BrightText",
								_BackgroundColor3: "Button",
								_BorderColor3: "Border",
							})}
						/>
					</frame>
					<frame
						{...ViewDefaults.Frame}
						Name="Selector"
						AnchorPoint={new Vector2(0.5, 0)}
						Position={UDim2.fromScale(0, 1)}
						Size={new UDim2(2, 4, 5, 0)}
						ZIndex={9000000}
						BackgroundTransparency={1}
						BorderMode={Enum.BorderMode.Inset}
						Visible={() => IsOpen?.() ?? true}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="RatioedCtn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={new UDim2(1, -8, 1, 0)}
							BackgroundTransparency={1}
						>
							<frame
								{...ViewDefaults.Frame}
								Name="Sliders"
								LayoutOrder={1}
								Size={UDim2.fromScale(1, 0.7)}
								BackgroundTransparency={1}
							>
								{RedChannel()}
								<uigridlayout
									{...ViewDefaults.UIGridLayout}
									Name="UIGridLayout"
									SortOrder={Enum.SortOrder.LayoutOrder}
									CellSize={UDim2.fromScale(1, 0.333)}
								/>
								{GreenChannel()}
								{BlueChannel()}
							</frame>
							{OtherControls()}
							<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
						</frame>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="BG"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={new UDim2(1, -4, 1, -2)}
							ZIndex={8999998}
							BackgroundColor3={Color3.fromRGB(42, 42, 42)}
							BackgroundTransparency={0}
							Active={false}
							Selectable={false}
							FontFace={
								new Font("rbxasset://fonts/families/LegacyArial.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)
							}
							TextSize={8}
							TextColor3={Color3.fromRGB(27, 42, 53)}
							AutoButtonColor={false}
						>
							<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" />
						</textbutton>
					</frame>
					<frame {...ViewDefaults.Frame} Name="NonEnabled" ZIndex={900} Visible={false} BackgroundTransparency={0.9} />
				</frame>
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />
			</frame>
		) as T_UI;
	}
}
