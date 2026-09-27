import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace SliderView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Text?: Vide.Derivable<string>;
		Value?: Vide.Derivable<number>;
		ValueText?: Vide.Derivable<string>;
		Range?: Vide.Derivable<readonly [number, number]>;
		OnTextChanged?: (Text: string) => void;
		OnFocusLost?: (EnterPressed: boolean) => void;
		OnFractionChanged?: (Fraction: number) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		let Input: TextBox;
		let Bar: Frame;
		const Holding = Vide.source(false);
		const Enabled = () => Props.Enabled?.() ?? true;
		const Percent = Vide.derive(() => {
			const [Min, Max] = Vide.read(Props.Range ?? [0, 100]);
			return math.clamp((Vide.read(Props.Value ?? 0) - Min) / (Max - Min), 0, 1);
		});
		const MoveCursor = (X: number) => {
			if (!Enabled() || Bar.AbsoluteSize.X <= 0) return;
			Props.OnFractionChanged?.((X - Bar.AbsolutePosition.X) / Bar.AbsoluteSize.X);
		};

		const LeftChildren = {
			Title: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					ZIndex={20}
					FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={() => Vide.read(Props.Text ?? "Slider")}
					action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
				/>
			) as TextLabel,
		};

		const TextBoxChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
		};

		const CursorChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={0.3} />
			) as UIAspectRatioConstraint,
		};

		const BarChildren = {
			Cursor: (
				<frame
					{...ViewDefaults.Frame}
					Name="Cursor"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Size={UDim2.fromScale(5, 5)}
					ZIndex={30}
					BackgroundColor3={() => (Enabled() ? Color3.fromRGB(53, 181, 255) : Color3.fromRGB(130, 130, 130))}
					BorderColor3={Color3.fromRGB(10, 10, 10)}
					BorderSizePixel={1}
					Position={() => UDim2.fromScale(Percent(), 0.5)}
				>
					{CursorChildren.UIAspectRatioConstraint}
				</frame>
			) as Frame & typeof CursorChildren,
			SliderBG: (
				<frame
					{...ViewDefaults.Frame}
					Name="SliderBG"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={UDim2.fromScale(0, 0.5)}
					ZIndex={25}
					BackgroundColor3={() => (Enabled() ? Color3.fromRGB(93, 134, 172) : Color3.fromRGB(61, 61, 61))}
					Size={() => UDim2.fromScale(Percent(), 1)}
				/>
			) as Frame,
		};

		const SliderChildren = {
			SliderBar: (
				<frame
					{...ViewDefaults.Frame}
					Name="SliderBar"
					action={(Target) => (Bar = Target)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.9, 0.15)}
					ZIndex={20}
					BackgroundTransparency={0.55}
					BorderSizePixel={1}
				>
					{BarChildren.Cursor}
					{BarChildren.SliderBG}
				</frame>
			) as Frame & typeof BarChildren,
			SliderInteractibility: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="SliderInteractibility"
					MouseButton1Down={(X) => {
						Holding(true);
						MoveCursor(X);
					}}
					MouseButton1Up={() => Holding(false)}
					MouseLeave={() => Holding(false)}
					MouseMoved={(X) => {
						if (Holding()) MoveCursor(X);
					}}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					ZIndex={50}
				/>
			) as TextButton,
		};

		const RightChildren = {
			TextBox: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="TextBox"
					AnchorPoint={new Vector2(0, 0)}
					Position={UDim2.fromOffset(6, 0)}
					ZIndex={800}
					TextXAlignment={Enum.TextXAlignment.Left}
					ClearTextOnFocus={false}
					action={(Target) => {
						Input = Target;
						ViewDefaults.Attributes({ FieldName: "Object_Position Y", _TextColor3: "BrightText" })(Target);
					}}
					TextEditable={Enabled}
					TextTransparency={() => (Enabled() ? 0 : 0.25)}
					TextChanged={Props.OnTextChanged}
					Focused={() => {
						Input.CursorPosition = Input.Text.size() + 1;
						Input.SelectionStart = 1;
					}}
					FocusLost={Props.OnFocusLost}
					Text={() => Vide.read(Props.ValueText ?? "0")}
				>
					{TextBoxChildren.UIAspectRatioConstraint}
				</textbox>
			) as TextBox & typeof TextBoxChildren,
			SliderCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="SliderCtn"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={new UDim2(1, -26, 1, 0)}
					BackgroundTransparency={1}
				>
					{SliderChildren.SliderBar}
					{SliderChildren.SliderInteractibility}
				</frame>
			) as Frame & typeof SliderChildren,
		};

		const Children = {
			Left: (
				<frame
					{...ViewDefaults.Frame}
					Name="Left"
					Size={new UDim2(0.5, -1, 1, 0)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					{LeftChildren.Title}
				</frame>
			) as Frame & typeof LeftChildren,
			BG: (
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
			) as Frame,
			Right: (
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
					{RightChildren.TextBox}
					{RightChildren.SliderCtn}
				</frame>
			) as Frame & typeof RightChildren,
			WhiteFrame: (<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />) as Frame,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Slider"
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
				{Children.Left}
				{Children.BG}
				{Children.Right}
				{Children.WhiteFrame}
			</frame>
		) as Frame & typeof Children;
	}
}
