import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ExpandableView {
	// @outline TYPES

	export type T_UI = Frame & {
		Top: Frame & {
			Ctn: Frame & {
				Icon: Frame & {
					UIAspectRatioConstraint: UIAspectRatioConstraint;
					Logo: ImageLabel;
				};
				UIGradient: UIGradient;
				TextLabel: TextLabel;
			};
			WhiteFrame: Frame;
			Interactibility: TextButton;
		};
		Content: Frame & {
			InnerContent: Frame & {
				DeepContent: Frame & {
					UIListLayout: UIListLayout;
				};
			};
		};
	};

	export type T_Props = UIState.T_Props;

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Expandable"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "Item", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? true}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 22)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(46, 46, 46)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 12}
			>
				<frame
					{...ViewDefaults.Frame}
					Name="Top"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={new UDim2(1, 0, 0, 22)}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					<frame
						{...ViewDefaults.Frame}
						Name="Ctn"
						ZIndex={30}
						BackgroundColor3={Color3.fromRGB(83, 83, 83)}
						BorderColor3={Color3.fromRGB(29, 32, 35)}
						BorderSizePixel={1}
						BorderMode={Enum.BorderMode.Inset}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="Icon"
							AnchorPoint={new Vector2(1, 0)}
							Position={UDim2.fromScale(1, 0)}
							Rotation={90}
							ZIndex={32}
							BackgroundTransparency={1}
						>
							<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
							<imagelabel {...ViewDefaults.ImageLabel} Name="Logo" Rotation={180} ZIndex={32} ImageTransparency={0.4} />
						</frame>
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
						<textlabel
							{...ViewDefaults.TextLabel}
							Name="TextLabel"
							AnchorPoint={new Vector2(0, 0.5)}
							Position={new UDim2(0, 6, 0.5, 0)}
							Size={new UDim2(1, -25, 1, 0)}
							ZIndex={31}
							Text={"Expendable Title"}
							TextColor3={Color3.fromRGB(230, 230, 230)}
							TextWrapped={true}
							TextTruncate={Enum.TextTruncate.AtEnd}
						/>
					</frame>
					<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} Visible={false} BackgroundTransparency={0.85} />
					<textbutton {...ViewDefaults.TextButton} Name="Interactibility" ZIndex={1000} />
				</frame>
				<frame
					{...ViewDefaults.Frame}
					Name="Content"
					Position={UDim2.fromOffset(0, 22)}
					Size={UDim2.fromScale(1, 0)}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.75}
				>
					<frame
						{...ViewDefaults.Frame}
						Name="InnerContent"
						Size={new UDim2(1, 0, 1, 150)}
						BackgroundTransparency={1}
						ClipsDescendants={true}
					>
						<frame {...ViewDefaults.Frame} Name="DeepContent" Size={new UDim2(1, 0, 1, -150)} BackgroundTransparency={1}>
							<uilistlayout
								{...ViewDefaults.UIListLayout}
								Name="UIListLayout"
								VerticalAlignment={Enum.VerticalAlignment.Bottom}
							/>
						</frame>
					</frame>
				</frame>
			</frame>
		) as T_UI;
	}
}
