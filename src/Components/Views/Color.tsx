import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";
import type { UIState } from "../../Internal/UIState";
import { ColorChannel } from "./ColorChannel";
import { ColorControls } from "./ColorControls";

export namespace ColorView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Color: Vide.Derivable<Color3>;
		Title: Vide.Derivable<string>;
		Mode: Vide.Derivable<"RGB" | "HSV">;
		IsOpen: Vide.Derivable<boolean>;
		OnToggle: () => void;
		OnModeToggle: () => void;
		OnColorText: (Text: string) => void;
		OnChannel: (Index: number, Value: number) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const { Color, IsOpen } = Props;

		const LeftChildren = {
			Title: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					ZIndex={20}
					FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={() => Vide.read(Props.Title)}
					action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
				/>
			) as TextLabel,
		};

		const SwatchChildren = {
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" />) as UIStroke,
		};

		const SwatchButtonChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			Frame: (
				<frame
					{...ViewDefaults.Frame}
					Name="Frame"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.8, 0.8)}
					ZIndex={50}
					BackgroundColor3={() => Vide.read(Color)}
				>
					{SwatchChildren.UIStroke}
				</frame>
			) as Frame & typeof SwatchChildren,
			Btn: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Btn"
					MouseButton1Click={Props.OnToggle}
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
			) as TextButton,
		};

		const ChannelChildren = {
			R: (
				<ColorChannel.Component
					Name="R"
					Index={0}
					Color={Color}
					Mode={Props.Mode}
					OnChanged={(Value) => Props.OnChannel(0, Value)}
				/>
			) as ReturnType<typeof ColorChannel.Component>,
			UIGridLayout: (
				<uigridlayout
					{...ViewDefaults.UIGridLayout}
					Name="UIGridLayout"
					SortOrder={Enum.SortOrder.LayoutOrder}
					CellSize={UDim2.fromScale(1, 0.333)}
				/>
			) as UIGridLayout,
			G: (
				<ColorChannel.Component
					Name="G"
					Index={1}
					Color={Color}
					Mode={Props.Mode}
					OnChanged={(Value) => Props.OnChannel(1, Value)}
				/>
			) as ReturnType<typeof ColorChannel.Component>,
			B: (
				<ColorChannel.Component
					Name="B"
					Index={2}
					Color={Color}
					Mode={Props.Mode}
					OnChanged={(Value) => Props.OnChannel(2, Value)}
				/>
			) as ReturnType<typeof ColorChannel.Component>,
		};

		const PickerContentChildren = {
			Sliders: (
				<frame {...ViewDefaults.Frame} Name="Sliders" LayoutOrder={1} Size={UDim2.fromScale(1, 0.7)} BackgroundTransparency={1}>
					{ChannelChildren.R}
					{ChannelChildren.UIGridLayout}
					{ChannelChildren.G}
					{ChannelChildren.B}
				</frame>
			) as Frame & typeof ChannelChildren,
			Others: (
				<ColorControls.Component
					Color={Color}
					Mode={Props.Mode}
					OnModeToggle={Props.OnModeToggle}
					OnColorText={Props.OnColorText}
				/>
			) as ReturnType<typeof ColorControls.Component>,
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
		};

		const PickerBackgroundChildren = {
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" />) as UIStroke,
		};

		const PickerChildren = {
			RatioedCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="RatioedCtn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -8, 1, 0)}
					BackgroundTransparency={1}
				>
					{PickerContentChildren.Sliders}
					{PickerContentChildren.Others}
					{PickerContentChildren.UIListLayout}
				</frame>
			) as Frame & typeof PickerContentChildren,
			BG: (
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
					FontFace={new Font("rbxasset://fonts/families/LegacyArial.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					TextSize={8}
					TextColor3={Color3.fromRGB(27, 42, 53)}
					AutoButtonColor={false}
				>
					{PickerBackgroundChildren.UIStroke}
				</textbutton>
			) as TextButton & typeof PickerBackgroundChildren,
		};

		const RightChildren = {
			Ctn: (
				<frame {...ViewDefaults.Frame} Name="Ctn">
					{SwatchButtonChildren.UIAspectRatioConstraint}
					{SwatchButtonChildren.Frame}
					{SwatchButtonChildren.Btn}
				</frame>
			) as Frame & typeof SwatchButtonChildren,
			Selector: (
				<frame
					{...ViewDefaults.Frame}
					Name="Selector"
					AnchorPoint={new Vector2(0.5, 0)}
					Position={UDim2.fromScale(0, 1)}
					Size={new UDim2(2, 4, 5, 0)}
					ZIndex={9000000}
					BackgroundTransparency={1}
					BorderMode={Enum.BorderMode.Inset}
					Visible={() => Vide.read(IsOpen)}
				>
					{PickerChildren.RatioedCtn}
					{PickerChildren.BG}
				</frame>
			) as Frame & typeof PickerChildren,
			NonEnabled: (
				<frame
					{...ViewDefaults.Frame}
					Name="NonEnabled"
					ZIndex={900}
					Visible={() => !(Props.Enabled?.() ?? true)}
					BackgroundTransparency={0.9}
				/>
			) as Frame,
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
					{RightChildren.Ctn}
					{RightChildren.Selector}
					{RightChildren.NonEnabled}
				</frame>
			) as Frame & typeof RightChildren,
			WhiteFrame: (<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />) as Frame,
		};

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
				{Children.Left}
				{Children.BG}
				{Children.Right}
				{Children.WhiteFrame}
			</frame>
		) as Frame & typeof Children;
	}
}
