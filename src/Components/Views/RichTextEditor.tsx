import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace RichTextEditorView {
	// @outline TYPES

	export type T_UI = Frame & {
		Top: Frame & {
			UIListLayout: UIListLayout;
			Bold: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Icon: ImageLabel;
				Interactibility: TextButton;
			};
			Italic: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Icon: ImageLabel;
				Interactibility: TextButton;
			};
			Underlined: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Icon: ImageLabel;
				Interactibility: TextButton;
			};
			FontColor: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Icon: ImageLabel;
				Interactibility: TextButton;
			};
			InBetween: Frame & {
				UIFlexItem: UIFlexItem;
				TextLabel: TextLabel & {
					UIStroke: UIStroke;
				};
			};
			Preview: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Icon: ImageLabel;
				Interactibility: TextButton;
			};
			UIGradient: UIGradient;
			ColorBox: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				TextBox: TextBox;
			};
		};
		Content: Frame & {
			UIFlexItem: UIFlexItem;
			TextBox: TextBox;
		};
		UIListLayout: UIListLayout;
		Separator: Frame;
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="RichTextEditor"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "Item", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 44)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(46, 46, 46)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 12}
			>
				<frame {...ViewDefaults.Frame} Name="Top" LayoutOrder={-1} Size={new UDim2(1, 0, 0, 22)}>
					<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" FillDirection={Enum.FillDirection.Horizontal} />
					<frame {...ViewDefaults.Frame} Name="Bold" BackgroundTransparency={1}>
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						<imagelabel
							{...ViewDefaults.ImageLabel}
							Name="Icon"
							Size={UDim2.fromOffset(19, 19)}
							Image={"rbxassetid://136520094118200"}
							ImageColor3={Color3.fromRGB(193, 193, 193)}
							ResampleMode={Enum.ResamplerMode.Pixelated}
						/>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Interactibility"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromOffset(19, 19)}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Italic" BackgroundTransparency={1}>
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						<imagelabel
							{...ViewDefaults.ImageLabel}
							Name="Icon"
							Size={UDim2.fromOffset(19, 19)}
							Image={"rbxassetid://116924037406715"}
							ImageColor3={Color3.fromRGB(193, 193, 193)}
							ResampleMode={Enum.ResamplerMode.Pixelated}
						/>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Interactibility"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Underlined" BackgroundTransparency={1}>
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						<imagelabel
							{...ViewDefaults.ImageLabel}
							Name="Icon"
							Size={UDim2.fromOffset(19, 19)}
							Image={"rbxassetid://75881124683860"}
							ImageColor3={Color3.fromRGB(193, 193, 193)}
							ResampleMode={Enum.ResamplerMode.Pixelated}
						/>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Interactibility"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="FontColor" LayoutOrder={10} BackgroundTransparency={1}>
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						<imagelabel
							{...ViewDefaults.ImageLabel}
							Name="Icon"
							Size={UDim2.fromOffset(19, 19)}
							Image={"rbxassetid://120934513616003"}
							ResampleMode={Enum.ResamplerMode.Pixelated}
						/>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Interactibility"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="InBetween" LayoutOrder={99} BackgroundTransparency={1}>
						<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="TextLabel"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={new UDim2(1, -8, 1, -7)}
							ZIndex={1}
							Text={"Dialog - Quatuar"}
							TextSize={15}
							TextColor3={Color3.fromRGB(213, 213, 213)}
							TextWrapped={true}
							TextScaled={true}
							TextXAlignment={Enum.TextXAlignment.Center}
						>
							<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.8} />
						</textlabel>
					</frame>
					<frame {...ViewDefaults.Frame} Name="Preview" LayoutOrder={100} Visible={false} BackgroundTransparency={1}>
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						<imagelabel
							{...ViewDefaults.ImageLabel}
							Name="Icon"
							Size={UDim2.fromOffset(19, 19)}
							Image={"rbxassetid://96780248168539"}
							ImageColor3={Color3.fromRGB(193, 193, 193)}
							ResampleMode={Enum.ResamplerMode.Pixelated}
						/>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="Interactibility"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
						/>
					</frame>
					<uigradient
						{...ViewDefaults.UIGradient}
						Name="UIGradient"
						Rotation={90}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(54, 54, 54)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(40, 40, 40)),
							])
						}
					/>
					<frame {...ViewDefaults.Frame} Name="ColorBox" LayoutOrder={11} BackgroundTransparency={1}>
						<uiaspectratioconstraint
							{...ViewDefaults.UIAspectRatioConstraint}
							Name="UIAspectRatioConstraint"
							AspectRatio={3.7}
						/>
						<textbox
							{...ViewDefaults.TextBox}
							Name="TextBox"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={new UDim2(1, -4, 1, -4)}
							ZIndex={30}
							BackgroundColor3={Color3.fromRGB(33, 33, 33)}
							BackgroundTransparency={0}
							BorderColor3={Color3.fromRGB(18, 18, 18)}
							BorderSizePixel={1}
							Text={"255, 255, 255"}
							TextSize={15}
							TextColor3={Color3.fromRGB(221, 221, 221)}
							ClearTextOnFocus={false}
						/>
					</frame>
				</frame>
				<frame {...ViewDefaults.Frame} Name="Content" LayoutOrder={1} Size={new UDim2(1, 0, 0, 22)} BackgroundTransparency={0.95}>
					<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
					<textbox
						{...ViewDefaults.TextBox}
						Name="TextBox"
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						Size={new UDim2(1, -8, 1, -4)}
						ZIndex={1}
						Text={"This is a test of a text for testing"}
						TextSize={15}
						TextColor3={Color3.fromRGB(221, 221, 221)}
						RichText={true}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Top}
						ClearTextOnFocus={false}
						MultiLine={true}
					/>
				</frame>
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
				<frame
					{...ViewDefaults.Frame}
					Name="Separator"
					Size={new UDim2(1, 0, 0, 1)}
					BackgroundColor3={Color3.fromRGB(34, 34, 34)}
				/>
			</frame>
		) as T_UI;
	}
}
