import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";
import type { UIState } from "../../Internal/UIState";
import { TimeField } from "./TimeField";
import { TimeTimestamp } from "./TimeTimestamp";

export namespace TimeView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Time: Vide.Derivable<number>;
		Title: Vide.Derivable<string>;
		IsOpen: Vide.Derivable<boolean>;
		OnToggle: () => void;
		OnTimestamp: (Value: number) => void;
		OnField: (Field: "Year" | "Month" | "Day" | "Hour" | "Minute", Value: number) => void;
		OnNow: () => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const Date = Vide.derive(() => DateTime.fromUnixTimestamp(Vide.read(Props.Time)).ToLocalTime());
		const Field = (Name: "Year" | "Month" | "Day" | "Hour" | "Minute", Title: string, Order: number) =>
			TimeField.Component({
				Name,
				Title,
				Order,
				Width: Name === "Year" ? 40 : 30,
				Value: () => Date()[Name],
				OnChanged: (Value) => Props.OnField(Name, Value),
			});

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

		const IconChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			ImageLabel: (
				<imagelabel
					{...ViewDefaults.ImageLabel}
					Name="ImageLabel"
					ZIndex={801}
					Image={"rbxassetid://4335485957"}
					ImageTransparency={0.8}
					ScaleType={Enum.ScaleType.Fit}
				/>
			) as ImageLabel,
		};

		const LabelChildren = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
		};

		const DisplayChildren = {
			IconCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="IconCtn"
					LayoutOrder={10}
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					BackgroundTransparency={1}
				>
					{IconChildren.UIAspectRatioConstraint}
					{IconChildren.ImageLabel}
				</frame>
			) as Frame & typeof IconChildren,
			TextLabel: (
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
					Text={() => DateTime.fromUnixTimestamp(Vide.read(Props.Time)).FormatLocalTime("lll", "en-us")}
					TextTransparency={() => ((Props.Enabled?.() ?? true) ? 0 : 0.25)}
				>
					{LabelChildren.UIFlexItem}
				</textbox>
			) as TextBox & typeof LabelChildren,
		};

		const FieldChildren = {
			NonEnabled: (
				<frame
					{...ViewDefaults.Frame}
					Name="NonEnabled"
					ZIndex={900}
					Visible={() => !(Props.Enabled?.() ?? true)}
					BackgroundTransparency={0.9}
				/>
			) as Frame,
			Btn: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Btn"
					MouseButton1Click={Props.OnToggle}
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
			) as TextButton,
			TextCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="TextCtn"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={new UDim2(1, -6, 1, 0)}
				>
					{DisplayChildren.IconCtn}
					{DisplayChildren.TextLabel}
				</frame>
			) as Frame & typeof DisplayChildren,
		};

		const PickerBackgroundChildren = {
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" />) as UIStroke,
		};

		const DateChildren = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			) as UIListLayout,
			Day: Field("Day", "D", 0),
			Border: (
				<frame
					{...ViewDefaults.Frame}
					Name="Border"
					LayoutOrder={1}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Size={new UDim2(0, 1, 0.8, 0)}
					ZIndex={9000003}
					BackgroundColor3={new Color3()}
					BackgroundTransparency={0.75}
				/>
			) as Frame,
			Month: Field("Month", "M", 10),
			Year: Field("Year", "Y", 20),
		};

		const TimeChildren = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			) as UIListLayout,
			Hour: Field("Hour", "H", 0),
			Border: (
				<frame
					{...ViewDefaults.Frame}
					Name="Border"
					LayoutOrder={1}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Size={new UDim2(0, 1, 0.8, 0)}
					ZIndex={9000003}
					BackgroundColor3={new Color3()}
					BackgroundTransparency={0.75}
				/>
			) as Frame,
			Minute: Field("Minute", "M", 10),
		};

		const DateTimeChildren = {
			Date: (
				<frame {...ViewDefaults.Frame} Name="Date" Size={new UDim2(0, 108, 1, 0)} BackgroundTransparency={1}>
					{DateChildren.UIListLayout}
					{DateChildren.Day}
					{DateChildren.Border}
					{DateChildren.Month}
					<frame
						{...ViewDefaults.Frame}
						Name="Border"
						LayoutOrder={11}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Size={new UDim2(0, 1, 0.8, 0)}
						ZIndex={9000003}
						BackgroundColor3={new Color3()}
						BackgroundTransparency={0.75}
					/>
					{DateChildren.Year}
				</frame>
			) as Frame & typeof DateChildren,
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			) as UIListLayout,
			Time: (
				<frame {...ViewDefaults.Frame} Name="Time" LayoutOrder={20} Size={new UDim2(0, 70, 1, 0)} BackgroundTransparency={1}>
					{TimeChildren.UIListLayout}
					{TimeChildren.Hour}
					{TimeChildren.Border}
					{TimeChildren.Minute}
				</frame>
			) as Frame & typeof TimeChildren,
			Border: (
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
			) as Frame,
		};

		const PickerRowChildren = {
			Right: (
				<frame
					{...ViewDefaults.Frame}
					Name="Right"
					AnchorPoint={new Vector2(0.5, 0)}
					Position={UDim2.fromScale(0.5, 0)}
					Size={UDim2.fromOffset(180, 40)}
					BackgroundTransparency={1}
				>
					{DateTimeChildren.Date}
					{DateTimeChildren.UIListLayout}
					{DateTimeChildren.Time}
					{DateTimeChildren.Border}
				</frame>
			) as Frame & typeof DateTimeChildren,
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			) as UIListLayout,
			Left: (<TimeTimestamp.Component Time={Props.Time} OnTimestamp={Props.OnTimestamp} OnNow={Props.OnNow} />) as ReturnType<
				typeof TimeTimestamp.Component
			>,
		};

		const PickerContentChildren = {
			UIListLayout: (
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" HorizontalAlignment={Enum.HorizontalAlignment.Right} />
			) as UIListLayout,
			Top: (
				<frame {...ViewDefaults.Frame} Name="Top" BackgroundTransparency={1}>
					{PickerRowChildren.Right}
					{PickerRowChildren.UIListLayout}
					{PickerRowChildren.Left}
				</frame>
			) as Frame & typeof PickerRowChildren,
		};

		const PickerBodyChildren = {
			BG: (
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
					FontFace={new Font("rbxasset://fonts/families/LegacyArial.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					TextSize={8}
					TextColor3={Color3.fromRGB(27, 42, 53)}
					AutoButtonColor={false}
				>
					{PickerBackgroundChildren.UIStroke}
				</textbutton>
			) as TextButton & typeof PickerBackgroundChildren,
			Content: (
				<folder Name="Content">
					{PickerContentChildren.UIListLayout}
					{PickerContentChildren.Top}
				</folder>
			) as Folder & typeof PickerContentChildren,
			BottomBorder: (
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
			) as Frame,
		};

		const PickerChildren = {
			Ctn: (
				<frame
					{...ViewDefaults.Frame}
					Name="Ctn"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, -1, 0.5, 0)}
					Size={new UDim2(1, 0, 1, -2)}
					BackgroundTransparency={1}
				>
					{PickerBodyChildren.BG}
					{PickerBodyChildren.Content}
					{PickerBodyChildren.BottomBorder}
				</frame>
			) as Frame & typeof PickerBodyChildren,
		};

		const RightChildren = {
			Ctn: (
				<frame {...ViewDefaults.Frame} Name="Ctn">
					{FieldChildren.NonEnabled}
					{FieldChildren.Btn}
					{FieldChildren.TextCtn}
				</frame>
			) as Frame & typeof FieldChildren,
			Selector: (
				<frame
					{...ViewDefaults.Frame}
					Name="Selector"
					AnchorPoint={new Vector2(0.5, 0)}
					Position={UDim2.fromScale(0, 1)}
					Size={new UDim2(2, 4, 2.25, 0)}
					ZIndex={9000000}
					BackgroundTransparency={1}
					BorderMode={Enum.BorderMode.Inset}
					Visible={() => Vide.read(Props.IsOpen)}
				>
					{PickerChildren.Ctn}
				</frame>
			) as Frame & typeof PickerChildren,
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
				</frame>
			) as Frame & typeof RightChildren,
			WhiteFrame: (<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />) as Frame,
		};

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
				{Children.Left}
				{Children.BG}
				{Children.Right}
				{Children.WhiteFrame}
			</frame>
		) as Frame & typeof Children;
	}
}
