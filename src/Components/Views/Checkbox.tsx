import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace CheckboxView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Checked?: Vide.Derivable<boolean>;
		Text?: Vide.Derivable<string>;
		TextVisible?: Vide.Derivable<boolean>;
		BackgroundVisible?: Vide.Derivable<boolean>;
		OnActivated?: () => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const Enabled = () => Props.Enabled?.() ?? true;
		const Checked = () => Vide.read(Props.Checked ?? false);
		const TextVisible = () => Vide.read(Props.TextVisible ?? true);
		const BackgroundVisible = () => Vide.read(Props.BackgroundVisible ?? true);

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

		const CheckboxChildren = {
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Color={Color3.fromRGB(31, 31, 31)} />) as UIStroke,
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 3)} />) as UICorner,
		};

		const DisabledChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 3)} />) as UICorner,
		};

		const CheckboxContainerChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			Checkbox: (
				<frame
					{...ViewDefaults.Frame}
					Name="Checkbox"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.8, 0.8)}
					ZIndex={20}
					BackgroundColor3={() => (Enabled() ? Color3.fromRGB(53, 181, 255) : new Color3(0.6, 0.6, 0.6))}
					BackgroundTransparency={() => (Checked() ? 0 : 1)}
				>
					{CheckboxChildren.UIStroke}
					{CheckboxChildren.UICorner}
				</frame>
			) as Frame & typeof CheckboxChildren,
			TextButton: (
				<textbutton {...ViewDefaults.TextButton} Name="TextButton" ZIndex={30} MouseButton1Click={Props.OnActivated} />
			) as TextButton,
			Icon: (
				<imagelabel {...ViewDefaults.ImageLabel} Name="Icon" ZIndex={24} Image={"rbxassetid://11242915823"} Visible={Checked} />
			) as ImageLabel,
			DisabledCheckbox: (
				<frame
					{...ViewDefaults.Frame}
					Name="DisabledCheckbox"
					Visible={() => !Enabled()}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.8, 0.8)}
					ZIndex={18}
					BackgroundColor3={Color3.fromRGB(50, 50, 50)}
				>
					{DisabledChildren.UICorner}
				</frame>
			) as Frame & typeof DisabledChildren,
		};

		const RightChildren = {
			CheckboxCtn: (
				<frame {...ViewDefaults.Frame} Name="CheckboxCtn" ZIndex={20} BackgroundTransparency={1}>
					{CheckboxContainerChildren.UIAspectRatioConstraint}
					{CheckboxContainerChildren.Checkbox}
					{CheckboxContainerChildren.TextButton}
					{CheckboxContainerChildren.Icon}
					{CheckboxContainerChildren.DisabledCheckbox}
				</frame>
			) as Frame & typeof CheckboxContainerChildren,
		};

		const Children = {
			Left: (
				<frame
					{...ViewDefaults.Frame}
					Name="Left"
					Visible={TextVisible}
					BackgroundTransparency={() => (BackgroundVisible() ? 0 : 1)}
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
					Visible={BackgroundVisible}
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
					BackgroundTransparency={() => (BackgroundVisible() ? 0 : 1)}
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={() => (TextVisible() ? new UDim2(0.5, -1, 1, 0) : UDim2.fromScale(1, 1))}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					{RightChildren.CheckboxCtn}
				</frame>
			) as Frame & typeof RightChildren,
			WhiteFrame: (<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />) as Frame,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Checkbox"
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
