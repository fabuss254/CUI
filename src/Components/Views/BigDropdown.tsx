import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";
import { BigDropdownItemView } from "./BigDropdownItem";

export namespace BigDropdownView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Choices?: Vide.Derivable<readonly string[]>;
		Selected?: Vide.Derivable<string | undefined>;
		Filter?: Vide.Derivable<string>;
		OnFilterChanged?: (Filter: string) => void;
		OnSelected?: (Choice: string) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const VisibleChoices = Vide.derive(() => {
			const Filter = Vide.read(Props.Filter ?? "").lower();
			return Vide.read(Props.Choices ?? []).filter((Choice) => Filter === "" || Choice.lower().find(Filter)[0] !== undefined);
		});
		const Items = Vide.values(VisibleChoices, (Choice, Index) =>
			BigDropdownItemView.Create({
				Text: Choice,
				LayoutOrder: Index,
				Selected: () => Vide.read(Props.Selected) === Choice,
				OnSelected: () => Props.OnSelected?.(Choice),
			}),
		);
		const TopChildren = {
			TextBox: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="TextBox"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, 6, 0.5, 0)}
					Size={new UDim2(1, -6, 0, 12)}
					ZIndex={5}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={() => Vide.read(Props.Filter ?? "")}
					TextChanged={Props.OnFilterChanged}
					action={(Input) =>
						Vide.cleanup(
							Input.Focused.Connect(() => {
								Input.CursorPosition = Input.Text.size() + 1;
								Input.SelectionStart = 1;
							}),
						)
					}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextXAlignment={Enum.TextXAlignment.Left}
					ClearTextOnFocus={false}
					PlaceholderText={"Type to search"}
					PlaceholderColor3={Color3.fromRGB(157, 157, 157)}
				/>
			) as TextBox,
		};
		const ScrollingFrameChildren = {
			UIGridLayout: (<uigridlayout {...ViewDefaults.UIGridLayout} Name="UIGridLayout" />) as UIGridLayout,
		};
		const Children = {
			BG: (<frame {...ViewDefaults.Frame} Name="BG" ZIndex={3} BackgroundColor3={Color3.fromRGB(38, 38, 38)} />) as Frame,
			Top: (
				<frame
					{...ViewDefaults.Frame}
					Name="Top"
					Size={new UDim2(1, 0, 0, 18)}
					ZIndex={3}
					BackgroundColor3={Color3.fromRGB(25, 25, 25)}
				>
					{TopChildren.TextBox}
				</frame>
			) as Frame & typeof TopChildren,
			ScrollingFrame: (
				<scrollingframe
					{...ViewDefaults.ScrollingFrame}
					Name="ScrollingFrame"
					AnchorPoint={new Vector2(0, 1)}
					Position={UDim2.fromScale(0, 1)}
					Size={new UDim2(1, 0, 1, -18)}
					CanvasSize={() => UDim2.fromOffset(0, VisibleChoices().size() * 18)}
					ScrollBarImageColor3={Color3.fromRGB(44, 44, 44)}
					TopImage={"rbxassetid://7549380501"}
					MidImage={"rbxassetid://7549380501"}
					BottomImage={"rbxassetid://7549380501"}
				>
					{ScrollingFrameChildren.UIGridLayout}
					{Items}
				</scrollingframe>
			) as ScrollingFrame & typeof ScrollingFrameChildren,
			ScrollBG: (
				<frame
					{...ViewDefaults.Frame}
					Name="ScrollBG"
					AnchorPoint={new Vector2(1, 1)}
					Position={UDim2.fromScale(1, 1)}
					Size={new UDim2(0, 10, 1, -18)}
					ZIndex={4}
					BackgroundColor3={Color3.fromRGB(71, 71, 71)}
				/>
			) as Frame,
		};
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
				{Children.BG}

				{Children.Top}

				{Children.ScrollingFrame}

				{Children.ScrollBG}
			</frame>
		) as Frame & typeof Children;
	}
}
