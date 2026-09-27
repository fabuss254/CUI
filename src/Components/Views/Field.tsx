import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace FieldView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Text?: Vide.Derivable<string>;
		TextVisible?: Vide.Derivable<boolean>;
		ValueText?: Vide.Derivable<string>;
		Placeholder?: Vide.Derivable<string>;
		Focused?: Vide.Derivable<boolean>;
		SelectAllOnFocus?: Vide.Derivable<boolean>;
		OnTextChanged?: (Text: string) => void;
		OnFocused?: () => void;
		OnFocusLost?: (EnterPressed: boolean) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		let Input: TextBox;
		const Enabled = () => Props.Enabled?.() ?? true;
		const TextVisible = () => Vide.read(Props.TextVisible ?? true);

		const LeftChildren = {
			Title: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					Text={() => Vide.read(Props.Text ?? "Position Y")}
					ZIndex={20}
					FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
				/>
			) as TextLabel,
		};

		const RightChildren = {
			TextBox: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="TextBox"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={new UDim2(1, -6, 1, 0)}
					ZIndex={800}
					TextTruncate={() => (Vide.read(Props.Focused ?? false) ? Enum.TextTruncate.None : Enum.TextTruncate.AtEnd)}
					TextEditable={Enabled}
					TextTransparency={() => (Enabled() ? 0 : 0.25)}
					PlaceholderText={() => Vide.read(Props.Placeholder ?? "")}
					TextChanged={Props.OnTextChanged}
					Focused={() => {
						Props.OnFocused?.();
						if (!Vide.read(Props.SelectAllOnFocus ?? true)) return;
						Input.CursorPosition = Input.Text.size() + 1;
						Input.SelectionStart = 1;
					}}
					FocusLost={Props.OnFocusLost}
					TextXAlignment={Enum.TextXAlignment.Left}
					ClearTextOnFocus={false}
					action={(Target) => {
						Input = Target;
						ViewDefaults.Attributes({ FieldName: "Object_Position Y", _TextColor3: "BrightText" })(Target);
					}}
					Text={() => Vide.read(Props.ValueText ?? "0")}
				/>
			) as TextBox,
			NonEnabled: (
				<frame {...ViewDefaults.Frame} Name="NonEnabled" Visible={() => !Enabled()} ZIndex={900} BackgroundTransparency={0.9} />
			) as Frame,
		};

		const Children = {
			Left: (
				<frame
					{...ViewDefaults.Frame}
					Name="Left"
					Visible={TextVisible}
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
					Size={() => (TextVisible() ? new UDim2(0.5, -1, 1, 0) : UDim2.fromScale(1, 1))}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					ClipsDescendants={true}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					{RightChildren.TextBox}
					{RightChildren.NonEnabled}
				</frame>
			) as Frame & typeof RightChildren,
			WhiteFrame: (<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />) as Frame,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Field"
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
