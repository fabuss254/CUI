import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace ColorControls {
	// @outline TYPES

	export type T_Props = {
		Color: Vide.Derivable<Color3>;
		Mode: Vide.Derivable<"RGB" | "HSV">;
		OnModeToggle: () => void;
		OnColorText: (Text: string) => void;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const Draft = Vide.source<string>();
		let Box: TextBox | undefined;
		Vide.effect(() => {
			Vide.read(Props.Color);
			Draft(undefined);
		});
		const ModeChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={2} />
			) as UIAspectRatioConstraint,
			BG: (
				<frame
					{...ViewDefaults.Frame}
					Name="BG"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					ZIndex={9000012}
					BackgroundColor3={Color3.fromRGB(34, 34, 34)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
				/>
			) as Frame,
			Btn: (
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
					Text={() => Vide.read(Props.Mode)}
					MouseButton1Click={Props.OnModeToggle}
					TextSize={21}
					TextColor3={Color3.fromRGB(229, 229, 229)}
					TextWrapped={true}
					action={ViewDefaults.Attributes({
						_TextColor3: "BrightText",
						_BackgroundColor3: "Button",
						_BorderColor3: "Border",
					})}
				/>
			) as TextButton,
		};

		const HTMLChildren = {
			TextBox: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="TextBox"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={new UDim2(1, -6, 1, 0)}
					ZIndex={9000027}
					FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
					Text={() => Draft() ?? `#${Vide.read(Props.Color).ToHex()}`}
					TextChanged={(Value) => Draft(Value)}
					Focused={() => {
						if (Box) {
							Box.CursorPosition = Box.Text.size() + 1;
							Box.SelectionStart = 1;
						}
					}}
					FocusLost={(Enter) => {
						if (Enter && Box) Props.OnColorText(Box.Text);
						Draft(undefined);
					}}
					TextTruncate={Enum.TextTruncate.AtEnd}
					ClearTextOnFocus={false}
					action={(Instance) => {
						Box = Instance;
						ViewDefaults.Attributes({ _TextColor3: "BrightText" })(Instance);
					}}
				/>
			) as TextBox,
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={3} />
			) as UIAspectRatioConstraint,
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.6} />) as UIStroke,
		};

		const Children = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
			Mode: (
				<frame {...ViewDefaults.Frame} Name="Mode">
					{ModeChildren.UIAspectRatioConstraint}
					{ModeChildren.BG}
					{ModeChildren.Btn}
				</frame>
			) as Frame & typeof ModeChildren,
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalFlex={Enum.UIFlexAlignment.SpaceBetween}
				/>
			) as UIListLayout,
			UIPadding: (
				<uipadding {...ViewDefaults.UIPadding} Name="UIPadding" PaddingBottom={new UDim(0, 4)} PaddingRight={new UDim(0, 0)} />
			) as UIPadding,
			HTML: (
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
					{HTMLChildren.TextBox}
					{HTMLChildren.UIAspectRatioConstraint}
					{HTMLChildren.UIStroke}
				</frame>
			) as Frame & typeof HTMLChildren,
		};

		return (
			<frame {...ViewDefaults.Frame} Name="Others" LayoutOrder={2} BackgroundTransparency={1}>
				{Children.UIFlexItem}
				{Children.Mode}
				{Children.UIListLayout}
				{Children.UIPadding}
				{Children.HTML}
			</frame>
		) as Frame & typeof Children;
	}
}
