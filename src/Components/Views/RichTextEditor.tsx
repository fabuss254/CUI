import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";
import { RichTextFormatButton } from "./RichTextFormatButton";

export namespace RichTextEditorView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Value: Vide.Derivable<string>;
		Title: Vide.Derivable<string>;
		Color: Vide.Derivable<Color3>;
		HeightRevision: Vide.Derivable<number>;
		OnChanged: (Value: string) => void;
		OnSelection: (Start: number, End: number) => void;
		OnClearSelection: () => void;
		OnColor: (Text: string) => void;
		OnFormat: (Prefix: string, Suffix: string) => void;
		OnHeight: (Height: number) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const Focused = Vide.source(false);
		const Width = Vide.source(0);
		const RenderedText = Vide.source("");
		const ColorDraft = Vide.source<string>();
		const ColorText = () => {
			const Color = Vide.read(Props.Color);
			return `${math.floor(Color.R * 255)}, ${math.floor(Color.G * 255)}, ${math.floor(Color.B * 255)}`;
		};
		Vide.effect(() => {
			Vide.read(Props.Color);
			ColorDraft(undefined);
		});

		let TextBox: TextBox | undefined;
		let ColorBox: TextBox | undefined;
		const UpdateSelection = () => {
			if (!TextBox?.IsFocused()) return;
			const Cursor = TextBox.CursorPosition;
			const Start = TextBox.SelectionStart;
			Props.OnSelection(math.min(Cursor, Start), math.max(Cursor, Start));
		};

		let Generation = 0;
		Vide.cleanup(() => {
			Generation++;
		});
		Vide.effect(() => {
			const Value = Vide.read(Props.Value);
			const Text = Focused() ? Value : RenderedText();
			const TextWidth = Width();
			Vide.read(Props.HeightRevision);
			const Request = ++Generation;
			task.defer(() => {
				if (!TextBox || Request !== Generation) return;
				const Params = new Instance("GetTextBoundsParams");
				Params.Text = Text;
				Params.Font = TextBox.FontFace;
				Params.Size = TextBox.TextSize;
				Params.Width = TextWidth;
				const Bounds = game.GetService("TextService").GetTextBoundsAsync(Params);
				Params.Destroy();
				if (Request === Generation) Props.OnHeight(Bounds.Y + 29);
			});
		});

		const TitleChildren = {
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.8} />) as UIStroke,
		};

		const HeadingChildren = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -8, 1, -7)}
					ZIndex={1}
					Text={() => Vide.read(Props.Title)}
					TextSize={15}
					TextColor3={Color3.fromRGB(213, 213, 213)}
					TextWrapped={true}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Center}
				>
					{TitleChildren.UIStroke}
				</textlabel>
			) as TextLabel & typeof TitleChildren,
		};

		const PreviewChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			Icon: (
				<imagelabel
					{...ViewDefaults.ImageLabel}
					Name="Icon"
					Size={UDim2.fromOffset(19, 19)}
					Image={"rbxassetid://96780248168539"}
					ImageColor3={Color3.fromRGB(193, 193, 193)}
					ResampleMode={Enum.ResamplerMode.Pixelated}
				/>
			) as ImageLabel,
			Interactibility: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Interactibility"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
				/>
			) as TextButton,
		};

		const ColorChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={3.7} />
			) as UIAspectRatioConstraint,
			TextBox: (
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
					Text={() => ColorDraft() ?? ColorText()}
					TextChanged={(Value) => ColorDraft(Value)}
					Focused={() => {
						if (ColorBox) {
							ColorBox.CursorPosition = ColorBox.Text.size() + 1;
							ColorBox.SelectionStart = 1;
						}
					}}
					FocusLost={(Enter) => {
						if (Enter && ColorBox) Props.OnColor(ColorBox.Text);
						ColorDraft(undefined);
					}}
					action={(Instance) => {
						ColorBox = Instance;
					}}
					TextSize={15}
					TextColor3={Color3.fromRGB(221, 221, 221)}
					ClearTextOnFocus={false}
				/>
			) as TextBox,
		};

		const ToolbarChildren = {
			UIListLayout: (
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" FillDirection={Enum.FillDirection.Horizontal} />
			) as UIListLayout,
			Bold: (
				<RichTextFormatButton.Component
					Name="Bold"
					Image="rbxassetid://136520094118200"
					OnActivated={() => Props.OnFormat("<b>", "</b>")}
				/>
			) as ReturnType<typeof RichTextFormatButton.Component>,
			Italic: (
				<RichTextFormatButton.Component
					Name="Italic"
					Image="rbxassetid://116924037406715"
					OnActivated={() => Props.OnFormat("<i>", "</i>")}
				/>
			) as ReturnType<typeof RichTextFormatButton.Component>,
			Underlined: (
				<RichTextFormatButton.Component
					Name="Underlined"
					Image="rbxassetid://75881124683860"
					OnActivated={() => Props.OnFormat("<u>", "</u>")}
				/>
			) as ReturnType<typeof RichTextFormatButton.Component>,
			FontColor: (
				<RichTextFormatButton.Component
					Name="FontColor"
					Image="rbxassetid://120934513616003"
					Order={10}
					Color={Props.Color}
					OnActivated={() => Props.OnFormat(`<font color='rgb(${ColorText()})'>`, "</font>")}
				/>
			) as ReturnType<typeof RichTextFormatButton.Component>,
			InBetween: (
				<frame {...ViewDefaults.Frame} Name="InBetween" LayoutOrder={99} BackgroundTransparency={1}>
					{HeadingChildren.UIFlexItem}
					{HeadingChildren.TextLabel}
				</frame>
			) as Frame & typeof HeadingChildren,
			Preview: (
				<frame {...ViewDefaults.Frame} Name="Preview" LayoutOrder={100} Visible={false} BackgroundTransparency={1}>
					{PreviewChildren.UIAspectRatioConstraint}
					{PreviewChildren.Icon}
					{PreviewChildren.Interactibility}
				</frame>
			) as Frame & typeof PreviewChildren,
			UIGradient: (
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
			) as UIGradient,
			ColorBox: (
				<frame {...ViewDefaults.Frame} Name="ColorBox" LayoutOrder={11} BackgroundTransparency={1}>
					{ColorChildren.UIAspectRatioConstraint}
					{ColorChildren.TextBox}
				</frame>
			) as Frame & typeof ColorChildren,
		};

		const ContentChildren = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
			TextBox: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="TextBox"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -8, 1, -4)}
					ZIndex={1}
					Text={() => Vide.read(Props.Value)}
					TextChanged={(Value) => Props.OnChanged(Value)}
					ContentTextChanged={RenderedText}
					Focused={() => Focused(true)}
					FocusLost={() => Focused(false)}
					CursorPositionChanged={UpdateSelection}
					SelectionStartChanged={UpdateSelection}
					AbsoluteSizeChanged={(Value) => Width(Value.X)}
					action={(Instance) => {
						TextBox = Instance;
						Width(Instance.AbsoluteSize.X);
					}}
					TextSize={15}
					TextColor3={Color3.fromRGB(221, 221, 221)}
					RichText={true}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextYAlignment={Enum.TextYAlignment.Top}
					ClearTextOnFocus={false}
					MultiLine={true}
				/>
			) as TextBox,
		};

		const Children = {
			Top: (
				<frame {...ViewDefaults.Frame} Name="Top" LayoutOrder={-1} Size={new UDim2(1, 0, 0, 22)}>
					{ToolbarChildren.UIListLayout}
					{ToolbarChildren.Bold}
					{ToolbarChildren.Italic}
					{ToolbarChildren.Underlined}
					{ToolbarChildren.FontColor}
					{ToolbarChildren.InBetween}
					{ToolbarChildren.Preview}
					{ToolbarChildren.UIGradient}
					{ToolbarChildren.ColorBox}
				</frame>
			) as Frame & typeof ToolbarChildren,
			Content: (
				<frame {...ViewDefaults.Frame} Name="Content" LayoutOrder={1} Size={new UDim2(1, 0, 0, 22)} BackgroundTransparency={0.95}>
					{ContentChildren.UIFlexItem}
					{ContentChildren.TextBox}
				</frame>
			) as Frame & typeof ContentChildren,
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
			Separator: (
				<frame
					{...ViewDefaults.Frame}
					Name="Separator"
					Size={new UDim2(1, 0, 0, 1)}
					BackgroundColor3={Color3.fromRGB(34, 34, 34)}
				/>
			) as Frame,
		};

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
				{Children.Top}
				{Children.Content}
				{Children.UIListLayout}
				{Children.Separator}
			</frame>
		) as Frame & typeof Children;
	}
}
