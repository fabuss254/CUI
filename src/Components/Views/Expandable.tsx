import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace ExpandableView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Text?: Vide.Derivable<string>;
		HeaderHeight?: Vide.Derivable<number>;
		ContentHeight?: Vide.Derivable<number>;
		Expansion?: Vide.Derivable<{ Expanded: boolean; SkipAnimation: boolean }>;
		OnToggle?: () => void;
		OnAnimatedHeightChanged?: (Height: number) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const Hovered = Vide.source(false);
		const Expansion = () => Vide.read(Props.Expansion ?? { Expanded: false, SkipAnimation: false });
		const TargetHeight = () => (Expansion().Expanded ? Vide.read(Props.ContentHeight ?? 0) : 0);
		const [AnimatedHeight, SetAnimatedHeight] = Vide.spring(TargetHeight, 0.1, 1);
		const [Rotation, SetRotation] = Vide.spring<number>(() => (Expansion().Expanded ? 90 : 180), 0.1, 1);
		const RenderedHeight = Vide.derive(() => (Expansion().SkipAnimation ? TargetHeight() : math.max(0, AnimatedHeight())));
		const RenderedRotation = () => (Expansion().SkipAnimation ? (Expansion().Expanded ? 90 : 180) : Rotation());
		Vide.effect(() => {
			const State = Expansion();
			if (!State.SkipAnimation) return;
			SetAnimatedHeight({ position: Vide.untrack(TargetHeight), velocity: 0 });
			SetRotation({ position: State.Expanded ? 90 : 180, velocity: 0 });
		});
		Vide.effect(() => {
			const Height = Vide.read(Props.ContentHeight ?? 0);
			if (Vide.untrack(Expansion).Expanded) SetAnimatedHeight({ position: Height, velocity: 0 });
		});
		Vide.effect(() => Props.OnAnimatedHeightChanged?.(RenderedHeight()));
		const IconChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" />
			) as UIAspectRatioConstraint,
			Logo: (
				<imagelabel {...ViewDefaults.ImageLabel} Name="Logo" Rotation={RenderedRotation} ZIndex={32} ImageTransparency={0.4} />
			) as ImageLabel,
		};
		const CtnChildren = {
			Icon: (
				<frame
					{...ViewDefaults.Frame}
					Name="Icon"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Rotation={90}
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
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, 6, 0.5, 0)}
					Size={new UDim2(1, -25, 1, 0)}
					ZIndex={31}
					Text={() => Vide.read(Props.Text ?? "Expendable Title")}
					TextSize={() => (Vide.read(Props.HeaderHeight ?? 22) * 14) / 22}
					TextColor3={Color3.fromRGB(230, 230, 230)}
					TextWrapped={true}
					TextTruncate={Enum.TextTruncate.AtEnd}
				/>
			) as TextLabel,
		};
		const TopChildren = {
			Ctn: (
				<frame
					{...ViewDefaults.Frame}
					Name="Ctn"
					ZIndex={30}
					BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(83, 83, 83)}
					BorderColor3={Color3.fromRGB(29, 32, 35)}
					BorderSizePixel={1}
					BorderMode={Enum.BorderMode.Inset}
				>
					{CtnChildren.Icon}
					{CtnChildren.UIGradient}
					{CtnChildren.TextLabel}
				</frame>
			) as Frame & typeof CtnChildren,
			WhiteFrame: (
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={50} Visible={Hovered} BackgroundTransparency={0.85} />
			) as Frame,
			Interactibility: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Interactibility"
					ZIndex={1000}
					MouseEnter={() => Hovered(true)}
					MouseLeave={() => Hovered(false)}
					MouseButton1Click={Props.OnToggle}
				/>
			) as TextButton,
		};
		const DeepContentChildren = {
			UIListLayout: (
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" VerticalAlignment={Enum.VerticalAlignment.Bottom} />
			) as UIListLayout,
		};
		const InnerContentChildren = {
			DeepContent: (
				<frame {...ViewDefaults.Frame} Name="DeepContent" Size={new UDim2(1, 0, 1, -150)} BackgroundTransparency={1}>
					{DeepContentChildren.UIListLayout}
				</frame>
			) as Frame & typeof DeepContentChildren,
		};
		const ContentChildren = {
			InnerContent: (
				<frame
					{...ViewDefaults.Frame}
					Name="InnerContent"
					Size={new UDim2(1, 0, 1, 150)}
					BackgroundTransparency={1}
					ClipsDescendants={true}
				>
					{InnerContentChildren.DeepContent}
				</frame>
			) as Frame & typeof InnerContentChildren,
		};
		const Children = {
			Top: (
				<frame
					{...ViewDefaults.Frame}
					Name="Top"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={() => new UDim2(1, 0, 0, Vide.read(Props.HeaderHeight ?? 22))}
					ZIndex={15}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "Item" })}
				>
					{TopChildren.Ctn}
					{TopChildren.WhiteFrame}
					{TopChildren.Interactibility}
				</frame>
			) as Frame & typeof TopChildren,
			Content: (
				<frame
					{...ViewDefaults.Frame}
					Name="Content"
					Position={() => UDim2.fromOffset(0, Vide.read(Props.HeaderHeight ?? 22))}
					Size={() => new UDim2(1, 0, 0, RenderedHeight())}
					Visible={() => RenderedHeight() > 0}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.75}
				>
					{ContentChildren.InnerContent}
				</frame>
			) as Frame & typeof ContentChildren,
		};
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
				{Children.Top}

				{Children.Content}
			</frame>
		) as Frame & typeof Children;
	}
}
