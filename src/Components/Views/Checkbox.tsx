import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace CheckboxView {
	// @outline TYPES

	export type T_UI = Frame & {
		Left: Frame & {
			Title: TextLabel;
		};
		BG: Frame;
		Right: Frame & {
			CheckboxCtn: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Checkbox: Frame & {
					UIStroke: UIStroke;
					UICorner: UICorner;
				};
				TextButton: TextButton;
				Icon: ImageLabel;
				DisabledCheckbox: Frame & {
					UICorner: UICorner;
				};
			};
		};
		WhiteFrame: Frame;
	};

	export type T_Props = UIState.T_Props & {
		Checked?: () => boolean;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		const { Checked } = Props;

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
				<frame
					{...ViewDefaults.Frame}
					Name="Left"
					Size={new UDim2(0.5, -1, 1, 0)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					<textlabel
						{...ViewDefaults.TextLabel}
						Name="Title"
						ZIndex={20}
						FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
						action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
					/>
				</frame>
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
					<frame {...ViewDefaults.Frame} Name="CheckboxCtn" ZIndex={20} BackgroundTransparency={1}>
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
						<frame
							{...ViewDefaults.Frame}
							Name="Checkbox"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={20}
							BackgroundColor3={Color3.fromRGB(53, 181, 255)}
							BackgroundTransparency={Checked ? () => (Checked() ? 0 : 1) : 1}
						>
							<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Color={Color3.fromRGB(31, 31, 31)} />
							<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 3)} />
						</frame>
						<textbutton {...ViewDefaults.TextButton} Name="TextButton" ZIndex={30} />
						<imagelabel
							{...ViewDefaults.ImageLabel}
							Name="Icon"
							ZIndex={24}
							Image={"rbxassetid://11242915823"}
							Visible={Checked ?? false}
						/>
						<frame
							{...ViewDefaults.Frame}
							Name="DisabledCheckbox"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.8, 0.8)}
							ZIndex={18}
							BackgroundColor3={Color3.fromRGB(50, 50, 50)}
						>
							<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(0, 3)} />
						</frame>
					</frame>
				</frame>
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />
			</frame>
		) as T_UI;
	}
}
