import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";
import type { UIState } from "../../Internal/UIState";
import { SequencePlot } from "./SequencePlot";
import { SequenceFields } from "./SequenceFields";

export namespace SequenceEditorView {
	// @outline TYPES

	export type T_Props = UIState.T_Props &
		SequencePlot.T_Props & {
			Title: Vide.Derivable<string>;
			OnMin: (Value: number) => void;
			OnMax: (Value: number) => void;
			OnTime: (Value: number) => void;
			OnValue: (Value: number) => void;
			OnRemove: () => void;
		};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const Refresh = Vide.source(0);
		const SelectedPoint = () => Vide.read(Props.Value).Keypoints[Vide.read(Props.Selected)];
		const RefreshChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={new UDim2(0.5, 1, 0.5, 1)}
					Size={UDim2.fromScale(1, 1)}
					Active={true}
					Selectable={true}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
					Text={"R"}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextXAlignment={Enum.TextXAlignment.Center}
				/>
			) as TextLabel,
		};

		const ButtonsChildren = {
			UIListLayout: (
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" HorizontalAlignment={Enum.HorizontalAlignment.Right} />
			) as UIListLayout,
			Refresh: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Refresh"
					MouseButton1Click={() => Refresh(Vide.untrack(Refresh) + 1)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(68, 72, 90)}
					BackgroundTransparency={0}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
				>
					{RefreshChildren.UIAspectRatioConstraint}
					{RefreshChildren.TextLabel}
				</textbutton>
			) as TextButton & typeof RefreshChildren,
		};

		const HeaderChildren = {
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, 6, 0.5, 0)}
					Size={new UDim2(1, -6, 0, 12)}
					ZIndex={5}
					Active={true}
					Selectable={true}
					FontFace={new Font("rbxassetid://16658246179", Enum.FontWeight.Regular, Enum.FontStyle.Normal)}
					Text={() => Vide.read(Props.Title)}
					TextSize={12}
					TextColor3={Color3.fromRGB(255, 255, 255)}
				/>
			) as TextLabel,
			ButtonCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="ButtonCtn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -4, 1, -2)}
				>
					{ButtonsChildren.UIListLayout}
					{ButtonsChildren.Refresh}
				</frame>
			) as Frame & typeof ButtonsChildren,
		};

		const ContentChildren = {
			Top: (
				<frame
					{...ViewDefaults.Frame}
					Name="Top"
					Size={new UDim2(1, 0, 0, 18)}
					ZIndex={3}
					BackgroundColor3={Color3.fromRGB(44, 44, 44)}
				>
					{HeaderChildren.TextLabel}
					{HeaderChildren.ButtonCtn}
				</frame>
			) as Frame & typeof HeaderChildren,
			Mid: (
				<SequencePlot.Component
					Value={() => {
						Refresh();
						return Vide.read(Props.Value);
					}}
					Selected={Props.Selected}
					Min={Props.Min}
					Max={Props.Max}
					OnSelect={Props.OnSelect}
					OnPoint={Props.OnPoint}
				/>
			) as ReturnType<typeof SequencePlot.Component>,
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
			Bottom: (
				<SequenceFields.Component
					Min={Props.Min}
					Max={Props.Max}
					Time={() => SelectedPoint().Time}
					Value={() => SelectedPoint().Value}
					OnMin={Props.OnMin}
					OnMax={Props.OnMax}
					OnTime={Props.OnTime}
					OnValue={Props.OnValue}
					OnRemove={Props.OnRemove}
				/>
			) as ReturnType<typeof SequenceFields.Component>,
		};

		const Children = {
			BG: (<frame {...ViewDefaults.Frame} Name="BG" ZIndex={3} BackgroundColor3={Color3.fromRGB(38, 38, 38)} />) as Frame,
			Content: (
				<frame {...ViewDefaults.Frame} Name="Content">
					{ContentChildren.Top}
					{ContentChildren.Mid}
					{ContentChildren.UIListLayout}
					{ContentChildren.Bottom}
				</frame>
			) as Frame & typeof ContentChildren,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="SequenceEditor"
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 140)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children.BG}
				{Children.Content}
			</frame>
		) as Frame & typeof Children;
	}
}
