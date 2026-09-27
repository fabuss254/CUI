import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace DropdownView {
	// @outline TYPES

	export type T_UI = Frame & {
		Left: Frame & {
			Title: TextLabel;
		};
		BG: Frame;
		Right: Frame & {
			DropdownCtn: Frame & {
				Icon: Frame & {
					UIAspectRatioConstraint: UIAspectRatioConstraint;
					Logo: ImageLabel;
				};
				UIGradient: UIGradient;
				Content: Frame & {
					Borders: Frame;
					BG: Frame;
					InnerContent: ScrollingFrame & {
						UIListLayout: UIListLayout;
						Item: Frame & {
							TextLabel: TextLabel;
							TextButton: TextButton;
						};
					};
					ScrollBG: Frame;
				};
				TextBox: TextBox;
			};
			Overlay: Frame;
		};
		WhiteFrame: Frame;
	};

	export type T_Props = UIState.T_Props & {
		ValueText?: () => string | undefined;
		IsOpen?: () => boolean;
	};

	export type T_Item = T_UI["Right"]["DropdownCtn"]["Content"]["InnerContent"]["Item"];

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		const { ValueText, IsOpen } = Props;

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Dropdown"
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
					<frame
						{...ViewDefaults.Frame}
						Name="DropdownCtn"
						ZIndex={30}
						BackgroundColor3={Color3.fromRGB(83, 83, 83)}
						BorderColor3={Color3.fromRGB(29, 32, 35)}
						BorderSizePixel={1}
						BorderMode={Enum.BorderMode.Inset}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="Icon"
							AnchorPoint={new Vector2(1, 0)}
							Position={UDim2.fromScale(1, 0)}
							ZIndex={32}
							BackgroundTransparency={1}
						>
							<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
							<imagelabel {...ViewDefaults.ImageLabel} Name="Logo" Rotation={180} ZIndex={32} ImageTransparency={0.4} />
						</frame>
						<uigradient
							{...ViewDefaults.UIGradient}
							Name="UIGradient"
							Rotation={90}
							Color={
								new ColorSequence([
									new ColorSequenceKeypoint(0, Color3.fromRGB(186, 186, 186)),
									new ColorSequenceKeypoint(1, Color3.fromRGB(84, 96, 103)),
								])
							}
						/>
						<frame
							{...ViewDefaults.Frame}
							Name="Content"
							Position={UDim2.fromScale(0, 1)}
							Size={UDim2.fromScale(1, 4)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(29, 32, 35)}
							BorderMode={Enum.BorderMode.Inset}
							ClipsDescendants={true}
							Visible={() => IsOpen?.() ?? false}
						>
							<frame
								{...ViewDefaults.Frame}
								Name="Borders"
								AnchorPoint={new Vector2(0.5, 0)}
								Position={UDim2.fromScale(0.5, 0)}
								Size={new UDim2(1, 2, 1, 1)}
								ZIndex={8999994}
								BackgroundColor3={Color3.fromRGB(29, 32, 35)}
							/>
							<frame {...ViewDefaults.Frame} Name="BG" ZIndex={8999998} BackgroundColor3={Color3.fromRGB(42, 42, 42)} />
							<scrollingframe
								{...ViewDefaults.ScrollingFrame}
								Name="InnerContent"
								ZIndex={9000000}
								BorderColor3={Color3.fromRGB(29, 32, 35)}
								BorderMode={Enum.BorderMode.Inset}
								Active={false}
								Selectable={false}
								CanvasSize={UDim2.fromScale(0, 20)}
								ScrollBarThickness={12}
								ScrollBarImageTransparency={0.8}
								VerticalScrollBarInset={Enum.ScrollBarInset.None}
								TopImage={"rbxassetid://97294892232031"}
								MidImage={"rbxassetid://97294892232031"}
								BottomImage={"rbxassetid://97294892232031"}
							>
								<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
								{Item()}
							</scrollingframe>
							<frame
								{...ViewDefaults.Frame}
								Name="ScrollBG"
								AnchorPoint={new Vector2(1, 0)}
								Position={UDim2.fromScale(1, 0)}
								Size={new UDim2(0, 12, 1, 0)}
								ZIndex={8999998}
								BackgroundColor3={Color3.fromRGB(0, 0, 0)}
								BackgroundTransparency={0.8}
							/>
						</frame>
						<textbox
							{...ViewDefaults.TextBox}
							Name="TextBox"
							AnchorPoint={new Vector2(0, 0.5)}
							Position={new UDim2(0, 4, 0.5, 0)}
							Size={new UDim2(1, -21, 1, 0)}
							ZIndex={31}
							Active={false}
							Selectable={false}
							FontFace={
								new Font("rbxasset://fonts/families/RobotoCondensed.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)
							}
							TextSize={12}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextWrapped={true}
							TextTruncate={Enum.TextTruncate.AtEnd}
							TextXAlignment={Enum.TextXAlignment.Left}
							Text={() => ValueText?.() ?? "Choice 1"}
						/>
					</frame>
					<frame
						{...ViewDefaults.Frame}
						Name="Overlay"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						ZIndex={40}
						Visible={false}
						BackgroundColor3={Color3.fromRGB(157, 157, 157)}
						BackgroundTransparency={0.8}
					/>
				</frame>
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />
			</frame>
		) as T_UI;
	}

	export function Item(): T_Item {
		return (
			<frame {...ViewDefaults.Frame} Name="Item" Size={new UDim2(1, 0, 0, 20)} BackgroundTransparency={1}>
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -8, 1, 0)}
					ZIndex={9000001}
					FontFace={new Font("rbxasset://fonts/families/RobotoCondensed.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={"Choice 1"}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextWrapped={true}
					TextTruncate={Enum.TextTruncate.AtEnd}
				/>
				<textbutton {...ViewDefaults.TextButton} Name="TextButton" ZIndex={654653500} AutoButtonColor={false} />
			</frame>
		) as T_Item;
	}
}
