import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace SliderView {
	// @outline TYPES

	export type T_UI = Frame & {
		Left: Frame & {
			Title: TextLabel;
		};
		BG: Frame;
		Right: Frame & {
			TextBox: TextBox & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
			};
			SliderCtn: Frame & {
				SliderBar: Frame & {
					Cursor: Frame & {
						UIAspectRatioConstraint: UIAspectRatioConstraint;
					};
					SliderBG: Frame;
				};
				SliderInteractibility: TextButton;
			};
		};
		WhiteFrame: Frame;
	};

	export type T_Props = UIState.T_Props & {
		ValueText?: () => string;
		Percent?: () => number;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		const { ValueText, Percent } = Props;

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
						Text={"Slider"}
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
					<textbox
						{...ViewDefaults.TextBox}
						Name="TextBox"
						AnchorPoint={new Vector2(0, 0)}
						Position={UDim2.fromOffset(6, 0)}
						ZIndex={800}
						TextXAlignment={Enum.TextXAlignment.Left}
						ClearTextOnFocus={false}
						action={ViewDefaults.Attributes({ FieldName: "Object_Position Y", _TextColor3: "BrightText" })}
						Text={() => ValueText?.() ?? "0"}
					>
						<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
					</textbox>
					<frame
						{...ViewDefaults.Frame}
						Name="SliderCtn"
						AnchorPoint={new Vector2(1, 0)}
						Position={UDim2.fromScale(1, 0)}
						Size={new UDim2(1, -26, 1, 0)}
						BackgroundTransparency={1}
					>
						<frame
							{...ViewDefaults.Frame}
							Name="SliderBar"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(0.9, 0.15)}
							ZIndex={20}
							BackgroundTransparency={0.55}
							BorderSizePixel={1}
						>
							<frame
								{...ViewDefaults.Frame}
								Name="Cursor"
								AnchorPoint={new Vector2(0.5, 0.5)}
								Size={UDim2.fromScale(5, 5)}
								ZIndex={30}
								BackgroundColor3={Color3.fromRGB(53, 181, 255)}
								BorderColor3={Color3.fromRGB(10, 10, 10)}
								BorderSizePixel={1}
								Position={Percent ? () => UDim2.fromScale(Percent(), 0.5) : UDim2.fromScale(0.5, 0.5)}
							>
								<uiaspectratioconstraint
									{...ViewDefaults.UIAspectRatioConstraint}
									Name="UIAspectRatioConstraint"
									AspectRatio={0.3}
								/>
							</frame>
							<frame
								{...ViewDefaults.Frame}
								Name="SliderBG"
								AnchorPoint={new Vector2(0, 0.5)}
								Position={UDim2.fromScale(0, 0.5)}
								ZIndex={25}
								BackgroundColor3={Color3.fromRGB(93, 134, 172)}
								Size={Percent ? () => UDim2.fromScale(Percent(), 1) : UDim2.fromScale(0.5, 1)}
							/>
						</frame>
						<textbutton
							{...ViewDefaults.TextButton}
							Name="SliderInteractibility"
							AnchorPoint={new Vector2(0.5, 0.5)}
							Position={UDim2.fromScale(0.5, 0.5)}
							ZIndex={50}
						/>
					</frame>
				</frame>
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} BackgroundTransparency={1} />
			</frame>
		) as T_UI;
	}
}
