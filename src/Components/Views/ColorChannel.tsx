import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace ColorChannel {
	// @outline TYPES

	export type T_Props = {
		Name: string;
		Index: number;
		Color: Vide.Derivable<Color3>;
		Mode: Vide.Derivable<"RGB" | "HSV">;
		OnChanged: (Value: number) => void;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const Holding = Vide.source(false);
		let Slider: Frame | undefined;
		const Channels = () => {
			const Color = Vide.read(Props.Color);
			const [H, S, V] = Color.ToHSV();
			return Vide.read(Props.Mode) === "RGB" ? [Color.R, Color.G, Color.B] : [H, S, V];
		};
		const Channel = () => Channels()[Props.Index];
		const Gradient = () => {
			const Values = Channels();
			const IsRGB = Vide.read(Props.Mode) === "RGB";
			const Points: ColorSequenceKeypoint[] = [];
			const Steps = !IsRGB && Props.Index === 0 ? 10 : 1;
			for (let Index = 0; Index <= Steps; Index++) {
				const Alpha = Index / Steps;
				Values[Props.Index] = Alpha;
				Points.push(
					new ColorSequenceKeypoint(
						Alpha,
						IsRGB ? new Color3(Values[0], Values[1], Values[2]) : Color3.fromHSV(Values[0], Values[1], Values[2]),
					),
				);
			}
			return new ColorSequence(Points);
		};
		const UpdateInput = (X: number) => {
			if (!Slider || Slider.AbsoluteSize.X === 0) return;
			Props.OnChanged(math.clamp((X - Slider.AbsolutePosition.X) / Slider.AbsoluteSize.X, 0, 1));
		};

		const CursorChildren = {
			UIAspectRatioConstraint: (
				<uiaspectratioconstraint {...ViewDefaults.UIAspectRatioConstraint} Name="UIAspectRatioConstraint" AspectRatio={0.25} />
			) as UIAspectRatioConstraint,
			UIStroke: (<uistroke {...ViewDefaults.UIStroke} Name="UIStroke" Transparency={0.5} />) as UIStroke,
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" CornerRadius={new UDim(1, 0)} />) as UICorner,
		};

		const TrackChildren = {
			UIGradient: (<uigradient {...ViewDefaults.UIGradient} Name="UIGradient" Color={Gradient} />) as UIGradient,
			Cursor: (
				<frame
					{...ViewDefaults.Frame}
					Name="Cursor"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={() => UDim2.fromScale(Channel(), 0.5)}
					Size={UDim2.fromScale(4, 4)}
					ZIndex={9000021}
					BackgroundColor3={Color3.fromRGB(53, 181, 255)}
				>
					{CursorChildren.UIAspectRatioConstraint}
					{CursorChildren.UIStroke}
					{CursorChildren.UICorner}
				</frame>
			) as Frame & typeof CursorChildren,
		};

		const SliderChildren = {
			InnerSlider: (
				<frame
					{...ViewDefaults.Frame}
					Name="InnerSlider"
					action={(Instance) => {
						Slider = Instance;
					}}
					AnchorPoint={new Vector2(1, 0.5)}
					Position={UDim2.fromScale(1, 0.5)}
					Size={new UDim2(1, -4, 0.2, 0)}
					ZIndex={9000015}
				>
					{TrackChildren.UIGradient}
					{TrackChildren.Cursor}
				</frame>
			) as Frame & typeof TrackChildren,
		};

		const NumberChildren = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
			Title: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					ZIndex={9000004}
					Text={() => tostring(math.floor(Channel() * 255))}
					TextXAlignment={Enum.TextXAlignment.Center}
					action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
				/>
			) as TextLabel,
		};

		const ItemsChildren = {
			UIListLayout: (
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" FillDirection={Enum.FillDirection.Horizontal} />
			) as UIListLayout,
			SliderCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="SliderCtn"
					AnchorPoint={new Vector2(0, 0.5)}
					Position={UDim2.fromScale(0, 0.5)}
					Size={UDim2.fromScale(0.9, 1)}
				>
					{SliderChildren.InnerSlider}
				</frame>
			) as Frame & typeof SliderChildren,
			NumCtn: (
				<frame {...ViewDefaults.Frame} Name="NumCtn" AnchorPoint={new Vector2(0, 0.5)} Position={UDim2.fromScale(0, 0.5)}>
					{NumberChildren.UIFlexItem}
					{NumberChildren.Title}
				</frame>
			) as Frame & typeof NumberChildren,
		};

		const Children = {
			Interactibility: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="Interactibility"
					ZIndex={9000053}
					MouseButton1Down={(X) => {
						Holding(true);
						UpdateInput(X);
					}}
					MouseButton1Up={() => Holding(false)}
					MouseLeave={() => Holding(false)}
					MouseMoved={(X) => {
						if (Holding()) UpdateInput(X);
					}}
				/>
			) as TextButton,
			Items: (
				<folder Name="Items">
					{ItemsChildren.UIListLayout}
					{ItemsChildren.SliderCtn}
					{ItemsChildren.NumCtn}
				</folder>
			) as Folder & typeof ItemsChildren,
		};

		return (
			<frame {...ViewDefaults.Frame} Name={Props.Name} LayoutOrder={Props.Index}>
				{Children.Interactibility}
				{Children.Items}
			</frame>
		) as Frame & typeof Children;
	}
}
