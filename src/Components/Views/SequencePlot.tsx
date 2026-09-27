import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";
import { SequencePoint } from "./SequencePoint";
import { SequenceLine } from "./SequenceLine";

export namespace SequencePlot {
	// @outline TYPES

	export type T_Props = {
		Value: Vide.Derivable<NumberSequence>;
		Selected: Vide.Derivable<number>;
		Min: Vide.Derivable<number>;
		Max: Vide.Derivable<number>;
		OnSelect: (Index: number) => void;
		OnPoint: (Index: number, Time: number, Value: number) => number;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const PixelSize = Vide.source(Vector2.zero);
		const Mouse = Vide.source(Vector2.zero);
		const Holding = Vide.source(false);
		const Hovered = Vide.source(-1);
		let Plot: Frame | undefined;
		const Keypoints = () => Vide.read(Props.Value).Keypoints;
		const Position = (Point: NumberSequenceKeypoint) =>
			new Vector2(Point.Time, 1 - (Point.Value - Vide.read(Props.Min)) / (Vide.read(Props.Max) - Vide.read(Props.Min)));
		const Points = Vide.indexes(Keypoints, (Point, LuaIndex) => {
			const Index = LuaIndex - 1;
			return (
				<SequencePoint.Component
					Name={tostring(Index)}
					Position={() => Position(Point())}
					Selected={() => Vide.read(Props.Selected) === Index}
				/>
			);
		});
		const Segments = () => {
			const CurrentPoints = Keypoints();
			return CurrentPoints.filter((_, Index) => Index < CurrentPoints.size() - 1).map((Start, Index) => ({
				Start,
				End: CurrentPoints[Index + 1],
			}));
		};
		const Lines = Vide.indexes(Segments, (Segment) => (
			<SequenceLine.Component Start={() => Position(Segment().Start)} End={() => Position(Segment().End)} PixelSize={PixelSize} />
		));

		const Update = () => {
			if (!Plot || Plot.AbsoluteSize.X === 0 || Plot.AbsoluteSize.Y === 0) return;
			const Points = Vide.untrack(Keypoints);
			const CurrentPlot = Plot;
			if (Holding()) {
				const Relative = Mouse().sub(Plot.AbsolutePosition).div(Plot.AbsoluteSize);
				const Index = Hovered();
				let Time = Relative.X;
				if (Index === 0) Time = 0;
				else if (Index === Points.size() - 1) Time = 1;
				const Min = Vide.read(Props.Min);
				const Max = Vide.read(Props.Max);
				const Value = math.clamp(Min + (Max - Min) * (1 - Relative.Y), Min, Max);
				Hovered(Props.OnPoint(Index, Time, Value));
			} else {
				Hovered(-1);
				Points.forEach((Point, Index) => {
					const Center = CurrentPlot.AbsolutePosition.add(Position(Point).mul(CurrentPlot.AbsoluteSize));
					if (Mouse().sub(Center).Magnitude < 10) {
						Hovered(Index);
						Props.OnSelect(Index);
					}
				});
			}
		};

		const GridChildren = {
			"X0.25": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.25"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.25, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.85}
				/>
			) as Frame,
			"X0.5": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.5"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.85}
				/>
			) as Frame,
			"X0.75": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.75"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.75, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.85}
				/>
			) as Frame,
			Y1: (
				<frame
					{...ViewDefaults.Frame}
					Name="Y1"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0)}
					Size={new UDim2(10, 0, 0, 1)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(148, 189, 255)}
					BackgroundTransparency={0.6}
				/>
			) as Frame,
			Y0: (
				<frame
					{...ViewDefaults.Frame}
					Name="Y0"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 1)}
					Size={new UDim2(10, 0, 0, 1)}
					ZIndex={10}
					BackgroundColor3={Color3.fromRGB(148, 189, 255)}
					BackgroundTransparency={0.6}
				/>
			) as Frame,
			"X0.125": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.125"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.125, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.95}
				/>
			) as Frame,
			"X0.375": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.375"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.375, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.95}
				/>
			) as Frame,
			"X0.625": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.625"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.625, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.95}
				/>
			) as Frame,
			"X0.875": (
				<frame
					{...ViewDefaults.Frame}
					Name="X0.875"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.875, 0.5)}
					Size={new UDim2(0, 1, 10, 0)}
					ZIndex={10}
					BackgroundTransparency={0.95}
				/>
			) as Frame,
		};

		const PlotChildren = {
			Deco: (
				<folder Name="Deco">
					{GridChildren["X0.25"]}
					{GridChildren["X0.5"]}
					{GridChildren["X0.75"]}
					{GridChildren.Y1}
					{GridChildren.Y0}
					{GridChildren["X0.125"]}
					{GridChildren["X0.375"]}
					{GridChildren["X0.625"]}
					{GridChildren["X0.875"]}
				</folder>
			) as Folder & typeof GridChildren,
			Curve: (<folder Name="Curve">{Lines}</folder>) as Folder,
			ControlPoints: (<folder Name="ControlPoints">{Points}</folder>) as Folder,
		};

		const ViewportChildren = {
			SequenceContainer: (
				<frame
					{...ViewDefaults.Frame}
					Name="SequenceContainer"
					action={(Instance) => {
						Plot = Instance;
						PixelSize(Instance.AbsoluteSize);
					}}
					AbsoluteSizeChanged={PixelSize}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
				>
					{PlotChildren.Deco}
					{PlotChildren.Curve}
					{PlotChildren.ControlPoints}
				</frame>
			) as Frame & typeof PlotChildren,
		};

		const Children = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
			MouseInteraction: (
				<textbutton
					{...ViewDefaults.TextButton}
					Name="MouseInteraction"
					ZIndex={4000}
					MouseMoved={(X, Y) => {
						Mouse(new Vector2(X, Y));
						Update();
					}}
					MouseButton1Down={(X, Y) => {
						Mouse(new Vector2(X, Y));
						Holding(true);
						Update();
					}}
					MouseButton1Up={() => {
						Holding(false);
						Update();
					}}
					MouseLeave={() => {
						Holding(false);
						Hovered(-1);
					}}
				/>
			) as TextButton,
			InnerContent: (
				<frame
					{...ViewDefaults.Frame}
					Name="InnerContent"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(1, -6, 0.9, -6)}
					ZIndex={5}
					BackgroundColor3={Color3.fromRGB(22, 22, 22)}
					ClipsDescendants={true}
				>
					{ViewportChildren.SequenceContainer}
				</frame>
			) as Frame & typeof ViewportChildren,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Mid"
				LayoutOrder={5}
				Size={new UDim2(1, 0, 0, 18)}
				ZIndex={3}
				BackgroundColor3={Color3.fromRGB(38, 38, 38)}
			>
				{Children.UIFlexItem}
				{Children.MouseInteraction}
				{Children.InnerContent}
			</frame>
		) as Frame & typeof Children;
	}
}
