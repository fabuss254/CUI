import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace TimeTimestamp {
	// @outline TYPES

	export type T_Props = {
		Time: Vide.Derivable<number>;
		OnTimestamp: (Value: number) => void;
		OnNow: () => void;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const Hovering = Vide.source(false);
		const Draft = Vide.source<string>();
		let Box: TextBox | undefined;
		Vide.effect(() => {
			Vide.read(Props.Time);
			Draft(undefined);
		});
		const NowBackgroundChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" />) as UICorner,
		};

		const HoverChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" />) as UICorner,
		};

		const NowChildren = {
			Btn: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Btn"
					MouseButton1Click={Props.OnNow}
					MouseEnter={() => Hovering(true)}
					MouseLeave={() => Hovering(false)}
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
			) as TextButton,
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={5.5} />
			) as UIAspectRatioConstraint,
			TextLabel: (
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
			) as TextLabel,
			BG: (
				<frame
					{...ViewDefaults.Frame}
					Name="BG"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					ZIndex={9000012}
					BackgroundColor3={Color3.fromRGB(36, 126, 175)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
				>
					{NowBackgroundChildren.UICorner}
				</frame>
			) as Frame & typeof NowBackgroundChildren,
			Hover: (
				<frame
					{...ViewDefaults.Frame}
					Name="Hover"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					ZIndex={9000080}
					Visible={Hovering}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.8}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Border" })}
				>
					{HoverChildren.UICorner}
				</frame>
			) as Frame & typeof HoverChildren,
		};

		const InputBackgroundChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" />) as UICorner,
		};

		const TimestampChildren = {
			BG: (
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
					{InputBackgroundChildren.UICorner}
				</frame>
			) as Frame & typeof InputBackgroundChildren,
			Box: (
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
					Text={() => Draft() ?? tostring(Vide.read(Props.Time))}
					ClearTextOnFocus={false}
					TextChanged={(Value) => Draft(Value)}
					Focused={() => {
						if (Box) {
							Box.CursorPosition = Box.Text.size() + 1;
							Box.SelectionStart = 1;
						}
					}}
					FocusLost={() => {
						if (Box) Props.OnTimestamp(tonumber(Box.Text) ?? 0);
						Draft(undefined);
					}}
					action={(Instance) => {
						Box = Instance;
					}}
					TextSize={21}
					TextTransparency={0.1}
					TextWrapped={true}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Right}
				/>
			) as TextBox,
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={4.9} />
			) as UIAspectRatioConstraint,
		};

		const Children = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
			SetToNow: (
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
					{NowChildren.Btn}
					{NowChildren.UIAspectRatioConstraint}
					{NowChildren.TextLabel}
					{NowChildren.BG}
					{NowChildren.Hover}
				</frame>
			) as Frame & typeof NowChildren,
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					Padding={new UDim(0, 2)}
					VerticalFlex={Enum.UIFlexAlignment.SpaceEvenly}
				/>
			) as UIListLayout,
			UIPadding: (<uipadding {...ViewDefaults.UIPadding} Name="UIPadding" />) as UIPadding,
			Timestamp: (
				<frame
					{...ViewDefaults.Frame}
					Name="Timestamp"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 0.4)}
					ZIndex={9000005}
					BackgroundTransparency={1}
				>
					{TimestampChildren.BG}
					{TimestampChildren.Box}
					{TimestampChildren.UIAspectRatioConstraint}
				</frame>
			) as Frame & typeof TimestampChildren,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Left"
				LayoutOrder={-5}
				ZIndex={9000000}
				BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={0.9}
			>
				{Children.UIFlexItem}
				{Children.SetToNow}
				{Children.UIListLayout}
				{Children.UIPadding}
				{Children.Timestamp}
			</frame>
		) as Frame & typeof Children;
	}
}
