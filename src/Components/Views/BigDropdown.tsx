import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace BigDropdownView {
	// @outline TYPES

	export type T_UI = Frame & {
		BG: Frame;
		Top: Frame & {
			TextBox: TextBox;
		};
		ScrollingFrame: ScrollingFrame & {
			UIGridLayout: UIGridLayout;
			ExampleButton: TextButton & {
				TextLabel: TextLabel;
			};
		};
		ScrollBG: Frame;
	};

	export type T_Props = UIState.T_Props;

	export type T_ItemProps = {
		Selected?: () => boolean;
	};

	export type T_Item = T_UI["ScrollingFrame"]["ExampleButton"];

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="BigDropdown"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 140)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				<frame {...ViewDefaults.Frame} Name="BG" ZIndex={3} BackgroundColor3={Color3.fromRGB(38, 38, 38)} />
				<frame
					{...ViewDefaults.Frame}
					Name="Top"
					Size={new UDim2(1, 0, 0, 18)}
					ZIndex={3}
					BackgroundColor3={Color3.fromRGB(25, 25, 25)}
				>
					<textbox
						{...ViewDefaults.TextBox}
						Name="TextBox"
						AnchorPoint={new Vector2(0, 0.5)}
						Position={new UDim2(0, 6, 0.5, 0)}
						Size={new UDim2(1, -6, 0, 12)}
						ZIndex={5}
						FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
						Text={""}
						TextSize={12}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextXAlignment={Enum.TextXAlignment.Left}
						ClearTextOnFocus={false}
						PlaceholderText={"Type to search"}
						PlaceholderColor3={Color3.fromRGB(157, 157, 157)}
					/>
				</frame>
				<scrollingframe
					{...ViewDefaults.ScrollingFrame}
					Name="ScrollingFrame"
					AnchorPoint={new Vector2(0, 1)}
					Position={UDim2.fromScale(0, 1)}
					Size={new UDim2(1, 0, 1, -18)}
					CanvasSize={UDim2.fromScale(0, 0)}
					ScrollBarImageColor3={Color3.fromRGB(44, 44, 44)}
					TopImage={"rbxassetid://7549380501"}
					MidImage={"rbxassetid://7549380501"}
					BottomImage={"rbxassetid://7549380501"}
				>
					<uigridlayout {...ViewDefaults.UIGridLayout} Name="UIGridLayout" />
					{Item()}
				</scrollingframe>
				<frame
					{...ViewDefaults.Frame}
					Name="ScrollBG"
					AnchorPoint={new Vector2(1, 1)}
					Position={UDim2.fromScale(1, 1)}
					Size={new UDim2(0, 10, 1, -18)}
					ZIndex={4}
					BackgroundColor3={Color3.fromRGB(71, 71, 71)}
				/>
			</frame>
		) as T_UI;
	}

	export function Item(Props: T_ItemProps = {}): T_Item {
		return (
			<textbutton
				{...ViewDefaults.TextButton}
				Name="ExampleButton"
				Size={UDim2.fromOffset(200, 50)}
				ZIndex={20}
				BackgroundTransparency={0}
				BorderColor3={Color3.fromRGB(29, 145, 208)}
				BorderMode={Enum.BorderMode.Inset}
				FontFace={new Font("rbxassetid://16658221428", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
				TextSize={12}
				BorderSizePixel={() => (Props.Selected?.() ? 1 : 0)}
				BackgroundColor3={() => (Props.Selected?.() ? Color3.fromRGB(43, 69, 99) : Color3.fromRGB(61, 61, 61))}
			>
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					ZIndex={21}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={"BaseHuman/Dash/Forward"}
					TextSize={12}
					TextColor3={Color3.fromRGB(220, 220, 220)}
				/>
			</textbutton>
		) as T_Item;
	}
}
