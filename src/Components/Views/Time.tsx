import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace TimeView {
	// @outline TYPES

	export type T_UI = Frame & {
		Left: Frame & {
			Title: TextLabel;
		};
		BG: Frame;
		Right: Frame & {
			Ctn: Frame & {
				NonEnabled: Frame;
				Btn: TextButton;
				TextCtn: Frame & {
					IconCtn: Frame & {
						UIAspectRatioConstraint: UIAspectRatioConstraint;
						ImageLabel: ImageLabel;
					};
					TextLabel: TextBox & {
						UIFlexItem: UIFlexItem;
					};
				};
			};
			Selector: Frame & {
				Ctn: Frame & {
					BG: TextButton & {
						UIStroke: UIStroke;
					};
					Content: Folder & {
						UIListLayout: UIListLayout;
						Top: Frame & {
							Right: Frame & {
								Date: Frame & {
									UIListLayout: UIListLayout;
									Day: Frame & {
										Top: Frame & {
											Title: TextLabel;
										};
										Bottom: Frame & {
											Ctn: Frame & {
												UICorner: UICorner;
												Box: TextBox;
											};
										};
										UIListLayout: UIListLayout;
									};
									Border: Frame;
									Month: Frame & {
										Top: Frame & {
											Title: TextLabel;
										};
										Bottom: Frame & {
											Ctn: Frame & {
												UICorner: UICorner;
												Box: TextBox;
											};
										};
										UIListLayout: UIListLayout;
									};
									Year: Frame & {
										Top: Frame & {
											Title: TextLabel;
										};
										Bottom: Frame & {
											Ctn: Frame & {
												UICorner: UICorner;
												Box: TextBox;
											};
										};
										UIListLayout: UIListLayout;
									};
								};
								UIListLayout: UIListLayout;
								Time: Frame & {
									UIListLayout: UIListLayout;
									Hour: Frame & {
										Top: Frame & {
											Title: TextLabel;
										};
										Bottom: Frame & {
											Ctn: Frame & {
												UICorner: UICorner;
												Box: TextBox;
											};
										};
										UIListLayout: UIListLayout;
									};
									Border: Frame;
									Minute: Frame & {
										Top: Frame & {
											Title: TextLabel;
										};
										Bottom: Frame & {
											Ctn: Frame & {
												UICorner: UICorner;
												Box: TextBox;
											};
										};
										UIListLayout: UIListLayout;
									};
								};
								Border: Frame;
							};
							UIListLayout: UIListLayout;
							Left: Frame & {
								UIFlexItem: UIFlexItem;
								SetToNow: Frame & {
									Btn: TextButton;
									UIAspectRatioConstraint: UIAspectRatioConstraint;
									TextLabel: TextLabel;
									BG: Frame & {
										UICorner: UICorner;
									};
									Hover: Frame & {
										UICorner: UICorner;
									};
								};
								UIListLayout: UIListLayout;
								UIPadding: UIPadding;
								Timestamp: Frame & {
									BG: Frame & {
										UICorner: UICorner;
									};
									Box: TextBox;
									UIAspectRatioConstraint: UIAspectRatioConstraint;
								};
							};
						};
					};
					BottomBorder: Frame;
				};
			};
		};
		WhiteFrame: Frame;
	};

	export type T_Props = UIState.T_Props & {
		TimeText?: () => string;
		IsOpen?: () => boolean;
	};

	// @outline PRIVATE_FUNCTIONS

	function DateFields(): T_UI["Right"]["Selector"]["Ctn"]["Content"]["Top"]["Right"]["Date"] {
		return (
			<frame {...ViewDefaults.Frame} Name="Date" Size={new UDim2(0, 108, 1, 0)} BackgroundTransparency={1}>
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<frame {...ViewDefaults.Frame} Name="Day" Size={new UDim2(0, 30, 1, 0)} ZIndex={9000003} BackgroundTransparency={1}>
					<frame {...ViewDefaults.Frame} Name="Top" Size={UDim2.fromScale(1, 0.4)} BackgroundTransparency={1}>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							Size={UDim2.fromScale(1, 1)}
							ZIndex={9000000}
							Text={"D"}
							TextTransparency={0.3}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Bottom" Size={UDim2.fromScale(1, 0.6)} BackgroundTransparency={1}>
						<frame
							{...ViewDefaults.Frame}
							Name="Ctn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={9000003}
							BackgroundColor3={Color3.fromRGB(0, 0, 0)}
							BackgroundTransparency={0.8}
						>
							<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
							<textbox {...ViewDefaults.TextBox} Name="Box" Active={false} Selectable={false} TextTransparency={0.1} />
						</frame>
					</frame>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
				<frame
					{...ViewDefaults.Frame}
					Name="Border"
					LayoutOrder={1}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Size={new UDim2(0, 1, 0.8, 0)}
					ZIndex={9000003}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.75}
				/>
				<frame
					{...ViewDefaults.Frame}
					Name="Month"
					LayoutOrder={10}
					Size={new UDim2(0, 30, 1, 0)}
					ZIndex={9000003}
					BackgroundTransparency={1}
				>
					<frame {...ViewDefaults.Frame} Name="Top" Size={UDim2.fromScale(1, 0.4)} BackgroundTransparency={1}>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							Size={UDim2.fromScale(1, 1)}
							ZIndex={9000000}
							Text={"M"}
							TextTransparency={0.3}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Bottom" Size={UDim2.fromScale(1, 0.6)} BackgroundTransparency={1}>
						<frame
							{...ViewDefaults.Frame}
							Name="Ctn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={9000003}
							BackgroundColor3={Color3.fromRGB(0, 0, 0)}
							BackgroundTransparency={0.8}
						>
							<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
							<textbox {...ViewDefaults.TextBox} Name="Box" Active={false} Selectable={false} TextTransparency={0.1} />
						</frame>
					</frame>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
				<frame
					{...ViewDefaults.Frame}
					Name="Border"
					LayoutOrder={11}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Size={new UDim2(0, 1, 0.8, 0)}
					ZIndex={9000003}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.75}
				/>
				<frame
					{...ViewDefaults.Frame}
					Name="Year"
					LayoutOrder={20}
					Size={new UDim2(0, 40, 1, 0)}
					ZIndex={9000003}
					BackgroundTransparency={1}
				>
					<frame {...ViewDefaults.Frame} Name="Top" Size={UDim2.fromScale(1, 0.4)} BackgroundTransparency={1}>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							Size={UDim2.fromScale(1, 1)}
							ZIndex={9000000}
							Text={"Y"}
							TextTransparency={0.3}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Bottom" Size={UDim2.fromScale(1, 0.6)} BackgroundTransparency={1}>
						<frame
							{...ViewDefaults.Frame}
							Name="Ctn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={9000003}
							BackgroundColor3={Color3.fromRGB(0, 0, 0)}
							BackgroundTransparency={0.8}
						>
							<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
							<textbox
								{...ViewDefaults.TextBox}
								Name="Box"
								Active={false}
								Selectable={false}
								Text={"2026"}
								TextTransparency={0.1}
							/>
						</frame>
					</frame>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
			</frame>
		) as T_UI["Right"]["Selector"]["Ctn"]["Content"]["Top"]["Right"]["Date"];
	}

	function TimeFields(): T_UI["Right"]["Selector"]["Ctn"]["Content"]["Top"]["Right"]["Time"] {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Time"
				Visible={true}
				Size={new UDim2(0, 70, 1, 0)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				LayoutOrder={20}
			>
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<frame {...ViewDefaults.Frame} Name="Hour" Size={new UDim2(0, 30, 1, 0)} ZIndex={9000003} BackgroundTransparency={1}>
					<frame {...ViewDefaults.Frame} Name="Top" Size={UDim2.fromScale(1, 0.4)} BackgroundTransparency={1}>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							Size={UDim2.fromScale(1, 1)}
							ZIndex={9000000}
							Text={"H"}
							TextTransparency={0.3}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Bottom" Size={UDim2.fromScale(1, 0.6)} BackgroundTransparency={1}>
						<frame
							{...ViewDefaults.Frame}
							Name="Ctn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={9000003}
							BackgroundColor3={Color3.fromRGB(0, 0, 0)}
							BackgroundTransparency={0.8}
						>
							<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
							<textbox {...ViewDefaults.TextBox} Name="Box" Active={false} Selectable={false} TextTransparency={0.1} />
						</frame>
					</frame>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
				<frame
					{...ViewDefaults.Frame}
					Name="Border"
					LayoutOrder={1}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Size={new UDim2(0, 1, 0.8, 0)}
					ZIndex={9000003}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.75}
				/>
				<frame
					{...ViewDefaults.Frame}
					Name="Minute"
					LayoutOrder={10}
					Size={new UDim2(0, 30, 1, 0)}
					ZIndex={9000003}
					BackgroundTransparency={1}
				>
					<frame {...ViewDefaults.Frame} Name="Top" Size={UDim2.fromScale(1, 0.4)} BackgroundTransparency={1}>
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="Title"
							Size={UDim2.fromScale(1, 1)}
							ZIndex={9000000}
							Text={"M"}
							TextTransparency={0.3}
							TextXAlignment={Enum.TextXAlignment.Center}
							action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Bottom" Size={UDim2.fromScale(1, 0.6)} BackgroundTransparency={1}>
						<frame
							{...ViewDefaults.Frame}
							Name="Ctn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={9000003}
							BackgroundColor3={Color3.fromRGB(0, 0, 0)}
							BackgroundTransparency={0.8}
						>
							<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
							<textbox {...ViewDefaults.TextBox} Name="Box" Active={false} Selectable={false} TextTransparency={0.1} />
						</frame>
					</frame>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				</frame>
			</frame>
		) as T_UI["Right"]["Selector"]["Ctn"]["Content"]["Top"]["Right"]["Time"];
	}

	function TimestampFields(): T_UI["Right"]["Selector"]["Ctn"]["Content"]["Top"]["Left"] {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Left"
				LayoutOrder={-5}
				ZIndex={9000000}
				BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={0.9}
			>
				<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
				<frame
					{...ViewDefaults.Frame}
					Name="SetToNow"
					LayoutOrder={-4}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 0.35)}
					ZIndex={9000005}
					BackgroundTransparency={1}
				>
					<textbutton
						{...ViewDefaults.TextButton}
						Name="Btn"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						Size={new UDim2(1, -2, 1, -2)}
						ZIndex={9000021}
						BackgroundColor3={Color3.fromRGB(36, 126, 175)}
						BorderColor3={Color3.fromRGB(34, 34, 34)}
						BorderMode={Enum.BorderMode.Inset}
						FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
						TextSize={21}
						TextColor3={Color3.fromRGB(229, 229, 229)}
						TextWrapped={true}
						action={ViewDefaults.Attributes({
							_TextColor3: "BrightText",
							_BackgroundColor3: "Button",
							_BorderColor3: "Border",
						})}
					/>
					<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={5.5} />
					<textlabel
						{...ViewDefaults.TextLabel}
						Name="TextLabel"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						Size={UDim2.fromScale(1, 0.9)}
						ZIndex={9000018}
						BackgroundColor3={Color3.fromRGB(36, 126, 175)}
						BorderColor3={Color3.fromRGB(34, 34, 34)}
						BorderMode={Enum.BorderMode.Inset}
						Active={true}
						Selectable={true}
						Text={"Set to NOW"}
						TextSize={21}
						TextWrapped={true}
						TextScaled={true}
						TextXAlignment={Enum.TextXAlignment.Center}
					/>
					<frame
						{...ViewDefaults.Frame}
						Name="BG"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						ZIndex={9000012}
						BackgroundColor3={Color3.fromRGB(36, 126, 175)}
						action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
					>
						<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
					</frame>
					<frame
						{...ViewDefaults.Frame}
						Name="Hover"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						ZIndex={9000080}
						Visible={false}
						BackgroundColor3={Color3.fromRGB(0, 0, 0)}
						BackgroundTransparency={0.8}
						action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
					>
						<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
					</frame>
				</frame>
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					Padding={new UDim(0, 2)}
					VerticalFlex={Enum.UIFlexAlignment.SpaceEvenly}
				/>
				<uipadding {...ViewDefaults.UIPadding} Name="UIPadding" />
				<frame
					{...ViewDefaults.Frame}
					Name="Timestamp"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 0.4)}
					ZIndex={9000005}
					BackgroundTransparency={1}
				>
					<frame
						{...ViewDefaults.Frame}
						Name="BG"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						ZIndex={9000012}
						BackgroundColor3={Color3.fromRGB(0, 0, 0)}
						BackgroundTransparency={0.8}
						action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
					>
						<uicorner {...ViewDefaults.UICorner} Name="UICorner" />
					</frame>
					<textbox
						{...ViewDefaults.TextBox}
						Name="Box"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						Size={new UDim2(1, -8, 0.85, 0)}
						ZIndex={9000018}
						BackgroundColor3={Color3.fromRGB(36, 126, 175)}
						BorderColor3={Color3.fromRGB(34, 34, 34)}
						BorderMode={Enum.BorderMode.Inset}
						Text={"1767225660"}
						TextSize={21}
						TextTransparency={0.1}
						TextWrapped={true}
						TextScaled={true}
						TextXAlignment={Enum.TextXAlignment.Right}
					/>
					<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={4.9} />
				</frame>
			</frame>
		) as T_UI["Right"]["Selector"]["Ctn"]["Content"]["Top"]["Left"];
	}

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		const { TimeText, IsOpen } = Props;

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Time"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "Item", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
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
						Text={"Time Selector"}
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
						<frame {...ViewDefaults.Frame} Name="NonEnabled" ZIndex={900} Visible={false} BackgroundTransparency={0.9} />
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Btn"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={new UDim2(1, -2, 1, -2)}
							ZIndex={850}
							BackgroundColor3={Color3.fromRGB(60, 60, 60)}
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
						<frame
							{...ViewDefaults.Frame}
							Name="TextCtn"
							AnchorPoint={new Vector2(1, 0)}
							Position={UDim2.fromScale(1, 0)}
							Size={new UDim2(1, -6, 1, 0)}
						>
							<frame
								{...ViewDefaults.Frame}
								Name="IconCtn"
								LayoutOrder={10}
								AnchorPoint={new Vector2(1, 0)}
								Position={UDim2.fromScale(1, 0)}
								BackgroundTransparency={1}
							>
								<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
								<imagelabel
									{...ViewDefaults.ImageLabel}
									Name="ImageLabel"
									ZIndex={801}
									Image={"rbxassetid://4335485957"}
									ImageTransparency={0.8}
									ScaleType={Enum.ScaleType.Fit}
								/>
							</frame>
							<textbox
								{...ViewDefaults.TextBox}
								Name="TextLabel"
								AnchorPoint={new Vector2(1, 0)}
								Position={UDim2.fromScale(1, 0)}
								ZIndex={802}
								Active={false}
								Interactable={false}
								TextTruncate={Enum.TextTruncate.AtEnd}
								TextXAlignment={Enum.TextXAlignment.Left}
								ClearTextOnFocus={false}
								TextEditable={false}
								Text={() => TimeText?.() ?? "Jan 4, 2026 4:35 PM"}
							>
								<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
							</textbox>
						</frame>
					</frame>
					<frame
						{...ViewDefaults.Frame}
						Name="Selector"
						AnchorPoint={new Vector2(0.5, 0)}
						Position={UDim2.fromScale(0, 1)}
						Size={new UDim2(2, 4, 2.25, 0)}
						ZIndex={9000000}
						BackgroundTransparency={1}
						BorderMode={Enum.BorderMode.Inset}
						Visible={() => IsOpen?.() ?? true}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="Ctn"
							AnchorPoint={new Vector2(0, 0.5)}
							Position={new UDim2(0, -1, 0.5, 0)}
							Size={new UDim2(1, 0, 1, -2)}
							BackgroundTransparency={1}
						>
							<textbutton
								{...ViewDefaults.TextButton}
								Name="BG"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.5, 0.5)}
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
							<folder Name="Content">
								<uilistlayout
									{...ViewDefaults.UIListLayout}
									Name="UIListLayout"
									HorizontalAlignment={Enum.HorizontalAlignment.Right}
								/>
								<frame {...ViewDefaults.Frame} Name="Top" BackgroundTransparency={1}>
									<frame
										{...ViewDefaults.Frame}
										Name="Right"
										AnchorPoint={new Vector2(0.5, 0)}
										Position={UDim2.fromScale(0.5, 0)}
										Size={UDim2.fromOffset(180, 40)}
										BackgroundTransparency={1}
									>
										{DateFields()}
										<uilistlayout
											{...ViewDefaults.UIListLayout}
											Name="UIListLayout"
											FillDirection={Enum.FillDirection.Horizontal}
											VerticalAlignment={Enum.VerticalAlignment.Center}
										/>
										{TimeFields()}
										<frame
											{...ViewDefaults.Frame}
											Name="Border"
											LayoutOrder={10}
											AnchorPoint={new Vector2(0.5, 0.5)}
											Size={new UDim2(0, 2, 0.8, 0)}
											ZIndex={9000003}
											BackgroundColor3={Color3.fromRGB(0, 0, 0)}
											BackgroundTransparency={0.75}
										/>
									</frame>
									<uilistlayout
										{...ViewDefaults.UIListLayout}
										Name="UIListLayout"
										FillDirection={Enum.FillDirection.Horizontal}
										VerticalAlignment={Enum.VerticalAlignment.Center}
									/>
									{TimestampFields()}
								</frame>
							</folder>
							<frame
								{...ViewDefaults.Frame}
								Name="BottomBorder"
								AnchorPoint={new Vector2(0, 1)}
								Position={UDim2.fromScale(0, 1)}
								Size={new UDim2(1, 0, 0, 1)}
								ZIndex={9000001}
								BackgroundColor3={Color3.fromRGB(0, 0, 0)}
								BackgroundTransparency={0.75}
							/>
						</frame>
					</frame>
				</frame>
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />
			</frame>
		) as T_UI;
	}
}
