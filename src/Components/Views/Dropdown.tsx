import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";
import { DropdownItemView } from "./DropdownItem";

export namespace DropdownView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Text?: Vide.Derivable<string>;
		TextVisible?: Vide.Derivable<boolean>;
		Choices?: Vide.Derivable<readonly string[]>;
		ValueText?: Vide.Derivable<string>;
		Filter?: Vide.Derivable<string>;
		IsOpen?: Vide.Derivable<boolean>;
		OnTextChanged?: (Text: string) => void;
		OnFocused?: () => void;
		OnFocusLost?: (Enter: boolean) => void;
		OnSelected?: (Choice: string) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const Choices = Vide.derive(() => Vide.read(Props.Choices ?? []));
		const Filter = Vide.derive(() => Vide.read(Props.Filter ?? "").lower());
		const IsVisible = (Choice: string) => Filter() === "" || Choice.lower().find(Filter())[0] !== undefined;
		const Height = Vide.derive(() => Choices().filter(IsVisible).size() * 20);
		const Items = Vide.indexes(Choices, (Choice, Index) =>
			DropdownItemView.Create({
				Text: Choice,
				Visible: () => IsVisible(Choice()),
				LayoutOrder: Index,
				OnSelected: () => Props.OnSelected?.(Choice()),
			}),
		);

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
		const IconChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			Logo: (
				<imagelabel {...ViewDefaults.ImageLabel} Name="Logo" Rotation={180} ZIndex={32} ImageTransparency={0.4} />
			) as ImageLabel,
		};
		const InnerContentChildren = {
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
		};
		const ContentChildren = {
			Borders: (
				<frame
					{...ViewDefaults.Frame}
					Name="Borders"
					AnchorPoint={new Vector2(0.5, 0)}
					Position={UDim2.fromScale(0.5, 0)}
					Size={new UDim2(1, 2, 1, 1)}
					ZIndex={8999994}
					BackgroundColor3={Color3.fromRGB(29, 32, 35)}
				/>
			) as Frame,
			BG: (<frame {...ViewDefaults.Frame} Name="BG" ZIndex={8999998} BackgroundColor3={Color3.fromRGB(42, 42, 42)} />) as Frame,
			InnerContent: (
				<scrollingframe
					{...ViewDefaults.ScrollingFrame}
					Name="InnerContent"
					ZIndex={9000000}
					BorderColor3={Color3.fromRGB(29, 32, 35)}
					BorderMode={Enum.BorderMode.Inset}
					Active={false}
					Selectable={false}
					CanvasSize={() => UDim2.fromOffset(0, Height())}
					ScrollBarThickness={12}
					ScrollBarImageTransparency={0.8}
					VerticalScrollBarInset={Enum.ScrollBarInset.None}
					TopImage={"rbxassetid://97294892232031"}
					MidImage={"rbxassetid://97294892232031"}
					BottomImage={"rbxassetid://97294892232031"}
				>
					{InnerContentChildren.UIListLayout}
					{Items}
				</scrollingframe>
			) as ScrollingFrame & typeof InnerContentChildren,
			ScrollBG: (
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
			) as Frame,
		};
		const DropdownCtnChildren = {
			Icon: (
				<frame
					{...ViewDefaults.Frame}
					Name="Icon"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					ZIndex={32}
					BackgroundTransparency={1}
				>
					{IconChildren.UIAspectRatioConstraint}
					{IconChildren.Logo}
				</frame>
			) as Frame & typeof IconChildren,
			UIGradient: (
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
			) as UIGradient,
			Content: (
				<frame
					{...ViewDefaults.Frame}
					Name="Content"
					Position={UDim2.fromScale(0, 1)}
					Size={() => new UDim2(1, 0, 0, math.min(Height(), 100))}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(29, 32, 35)}
					BorderMode={Enum.BorderMode.Inset}
					ClipsDescendants={true}
					Visible={() => Vide.read(Props.IsOpen ?? false)}
				>
					{ContentChildren.Borders}
					{ContentChildren.BG}
					{ContentChildren.InnerContent}
					{ContentChildren.ScrollBG}
				</frame>
			) as Frame & typeof ContentChildren,
			TextBox: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="TextBox"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, 4, 0.5, 0)}
					Size={new UDim2(1, -21, 1, 0)}
					ZIndex={31}
					Active={false}
					Selectable={false}
					FontFace={new Font("rbxasset://fonts/families/RobotoCondensed.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextWrapped={true}
					TextTruncate={Enum.TextTruncate.AtEnd}
					TextXAlignment={Enum.TextXAlignment.Left}
					Text={() => Vide.read(Props.ValueText ?? "Choice 1")}
					TextChanged={Props.OnTextChanged}
					Focused={Props.OnFocused}
					FocusLost={Props.OnFocusLost}
					TextEditable={() => Props.Enabled?.() ?? true}
				/>
			) as TextBox,
		};
		const RightChildren = {
			DropdownCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="DropdownCtn"
					ZIndex={30}
					BackgroundColor3={Color3.fromRGB(83, 83, 83)}
					BorderColor3={Color3.fromRGB(29, 32, 35)}
					BorderSizePixel={1}
					BorderMode={Enum.BorderMode.Inset}
				>
					{DropdownCtnChildren.Icon}
					{DropdownCtnChildren.UIGradient}
					{DropdownCtnChildren.Content}
					{DropdownCtnChildren.TextBox}
				</frame>
			) as Frame & typeof DropdownCtnChildren,
			Overlay: (
				<frame
					{...ViewDefaults.Frame}
					Name="Overlay"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					ZIndex={40}
					Visible={() => !(Props.Enabled?.() ?? true)}
					BackgroundColor3={Color3.fromRGB(157, 157, 157)}
					BackgroundTransparency={0.8}
				/>
			) as Frame,
		};
		const Children = {
			Left: (
				<frame
					{...ViewDefaults.Frame}
					Name="Left"
					Visible={() => Vide.read(Props.TextVisible ?? true)}
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
					Size={() => (Vide.read(Props.TextVisible ?? true) ? new UDim2(0.5, -1, 1, 0) : UDim2.fromScale(1, 1))}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					{RightChildren.DropdownCtn}
					{RightChildren.Overlay}
				</frame>
			) as Frame & typeof RightChildren,
			WhiteFrame: (<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />) as Frame,
		};
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
				{Children.Left}

				{Children.BG}

				{Children.Right}

				{Children.WhiteFrame}
			</frame>
		) as Frame & typeof Children;
	}
}
