import { Janitor } from "@rbxts/janitor";
import { SequenceEditorView } from "./Views/SequenceEditor";
import type { CUI } from "..";
import { UIComponent } from "./Base";

function NumberStr(Number: number) {
	return `${math.floor(Number * 100) / 100}`;
}

export class SequenceEditor extends UIComponent<SequenceEditorView.T_UI> {
	// @outline PROPERTIES

	private Value: NumberSequence = new NumberSequence(0, 1);
	private SelectedIndex = 0;
	private HoveringIndex = -1;

	private Min = 0;
	private Max = 1;

	private Callback = (Value: NumberSequence) => {};
	private CurveJanitor = new Janitor();

	private MousePos = new Vector2(0, 0);
	private MouseInUI = false;
	private HoldingMouse = false;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, SequenceEditorView.Create);
		this.Janitor.Add(this.CurveJanitor, "Destroy");

		this.UpdateCurve();

		// Top Button
		const TopButton = this.UI.Content.Top.ButtonCtn;
		this.Janitor.Add(
			TopButton.Refresh.MouseButton1Click.Connect(() => {
				this.UpdateCurve();
			}),
			"Disconnect",
		);

		// Bottom Input
		const InputCtn = this.UI.Content.Bottom.Ctn;
		InputCtn.Max.TextBox.Text = tostring(this.Max);
		InputCtn.Min.TextBox.Text = tostring(this.Min);

		this.Janitor.Add(
			InputCtn.Max.TextBox.FocusLost.Connect((Entered) => {
				if (Entered) {
					this.Max = tonumber(InputCtn.Max.TextBox.Text) ?? 0;
					this.UpdateCurve();
					return;
				}

				InputCtn.Max.TextBox.Text = tostring(this.Max);
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			InputCtn.Min.TextBox.FocusLost.Connect((Entered) => {
				if (Entered) {
					this.Min = tonumber(InputCtn.Min.TextBox.Text) ?? 0;
					this.UpdateCurve();
					return;
				}

				InputCtn.Min.TextBox.Text = tostring(this.Min);
			}),
			"Disconnect",
		);

		InputCtn.Time.TextBox.Text = "0";
		InputCtn.Value.TextBox.Text = "0";

		this.Janitor.Add(
			InputCtn.Time.TextBox.FocusLost.Connect((Entered) => {
				const IsEdge = this.SelectedIndex === 0 || this.SelectedIndex === this.Value.Keypoints.size() - 1;
				const Keypoint = this.Value.Keypoints[this.SelectedIndex];
				const NewTime = math.clamp(tonumber(InputCtn.Time.TextBox.Text) ?? 0, 0.001, 0.999);

				if (!IsEdge && Entered) {
					const NewKeypointList: NumberSequenceKeypoint[] = [];
					this.Value.Keypoints.forEach((Point, Index) => {
						if (Index === this.SelectedIndex) {
							NewKeypointList.push(new NumberSequenceKeypoint(NewTime, Point.Value));
						} else {
							NewKeypointList.push(Point);
						}
					});

					NewKeypointList.sort((A, B) => A.Time < B.Time);
					this.SetValue(new NumberSequence(NewKeypointList));
					return;
				}

				InputCtn.Time.TextBox.Text = NumberStr(Keypoint.Time);
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			InputCtn.Value.TextBox.FocusLost.Connect((Entered) => {
				const Keypoint = this.Value.Keypoints[this.SelectedIndex];
				const NewValue = tonumber(InputCtn.Value.TextBox.Text) ?? 0;

				if (Entered) {
					const NewKeypointList: NumberSequenceKeypoint[] = [];
					this.Value.Keypoints.forEach((Point, Index) => {
						if (Index === this.SelectedIndex) {
							NewKeypointList.push(new NumberSequenceKeypoint(Point.Time, NewValue));
						} else {
							NewKeypointList.push(Point);
						}
					});

					NewKeypointList.sort((A, B) => A.Time < B.Time);
					this.SetValue(new NumberSequence(NewKeypointList));
					return;
				}

				InputCtn.Value.TextBox.Text = NumberStr(Keypoint.Value);
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			InputCtn.RemoveBtn.Btn.MouseButton1Click.Connect(() => {
				if (this.SelectedIndex <= 0 || this.SelectedIndex >= this.Value.Keypoints.size() - 1) return;

				const Keypoints: NumberSequenceKeypoint[] = [];
				this.Value.Keypoints.forEach((KeyPoint, Index) => {
					if (Index !== this.SelectedIndex) Keypoints.push(KeyPoint);
				});

				this.Value = new NumberSequence(Keypoints);
				this.UpdateCurve();
				this.SelectPoint(0);
				this.HoveringIndex = -1;
			}),
			"Disconnect",
		);

		// CONNECTIONS
		const Btn = this.UI.Content.Mid.MouseInteraction;

		this.Janitor.Add(
			Btn.MouseMoved.Connect((X, Y) => {
				this.MousePos = new Vector2(X, Y);
				this.Update();
			}),
			"Disconnect",
		);
		this.Janitor.Add(
			Btn.MouseButton1Down.Connect(() => {
				this.HoldingMouse = true;
				this.Update();
			}),
			"Disconnect",
		);
		this.Janitor.Add(
			Btn.MouseButton1Up.Connect(() => {
				this.HoldingMouse = false;
				this.Update();
			}),
			"Disconnect",
		);
		this.Janitor.Add(
			Btn.MouseEnter.Connect(() => {
				this.MouseInUI = true;
				this.Update();
			}),
			"Disconnect",
		);
		this.Janitor.Add(
			Btn.MouseLeave.Connect(() => {
				this.MouseInUI = false;
				this.HoldingMouse = false;
				this.Update();
			}),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	private UpdateCurve() {
		this.CurveJanitor.Cleanup();
		const UI = this.UI;
		const SequenceCtn = UI.Content.Mid.InnerContent.SequenceContainer;

		// Remove all points
		SequenceCtn.ControlPoints.ClearAllChildren();
		SequenceCtn.Curve.ClearAllChildren();

		// Add points
		let HasSelected = false;
		const Keypoints = this.Value.Keypoints;
		Keypoints.forEach((CurrentKeyPoint, Index) => {
			const NextKeyPoint = Keypoints[Index + 1];

			const PosStart = new UDim2(CurrentKeyPoint.Time, 0, 1 - (CurrentKeyPoint.Value - this.Min) / (this.Max - this.Min), 0);
			const PosEnd = NextKeyPoint
				? new UDim2(NextKeyPoint.Time, 0, 1 - (NextKeyPoint.Value - this.Min) / (this.Max - this.Min), 0)
				: undefined;

			// Point
			const Point = this.CreateOwnedUI(SequenceEditorView.Point, this.CurveJanitor);
			Point.Position = PosStart;
			Point.ZIndex = SequenceCtn.ZIndex + 10;
			Point.Name = tostring(Index);
			Point.Parent = SequenceCtn.ControlPoints;

			const IsSelected = this.SelectedIndex === Index;
			Point.BackgroundColor3 = IsSelected ? Color3.fromRGB(255, 115, 115) : Color3.fromRGB(255, 255, 255);
			if (IsSelected) HasSelected = true;

			// Line
			if (!PosEnd) return;

			const Pos = UDim2.fromScale((PosStart.X.Scale + PosEnd.X.Scale) / 2, (PosStart.Y.Scale + PosEnd.Y.Scale) / 2);

			const StartPosPixel = SequenceCtn.AbsolutePosition.add(
				SequenceCtn.AbsoluteSize.mul(new Vector2(PosStart.X.Scale, PosStart.Y.Scale)),
			);
			const EndPosPixel = SequenceCtn.AbsolutePosition.add(SequenceCtn.AbsoluteSize.mul(new Vector2(PosEnd.X.Scale, PosEnd.Y.Scale)));
			const Rot = math.atan2(EndPosPixel.Y - StartPosPixel.Y, EndPosPixel.X - StartPosPixel.X);

			const Line = this.CreateOwnedUI(SequenceEditorView.Line, this.CurveJanitor);
			Line.Position = Pos;
			Line.Rotation = math.deg(Rot);
			Line.Size = UDim2.fromOffset(StartPosPixel.sub(EndPosPixel).Magnitude, 1);
			Line.ZIndex = SequenceCtn.ZIndex + 7;
			Line.Parent = SequenceCtn.Curve;
		});

		// Set the value of hovered point
		const SelectedPoint = Keypoints[this.SelectedIndex];
		if (SelectedPoint) {
			const InputCtn = this.UI.Content.Bottom.Ctn;
			InputCtn.Time.TextBox.Text = NumberStr(SelectedPoint.Time);
			InputCtn.Value.TextBox.Text = NumberStr(SelectedPoint.Value);
		}

		// Reset selected point if it doesn't exist
		if (!HasSelected) this.SelectPoint(0);
	}

	private Update() {
		const UI = this.UI;
		const SequenceCtn = UI.Content.Mid.InnerContent.SequenceContainer;

		if (this.HoldingMouse) {
			const RelativeMousePos = this.MousePos.sub(SequenceCtn.AbsolutePosition);

			let NewTime = RelativeMousePos.X / SequenceCtn.AbsoluteSize.X;
			const NewValuePercent = 1 - RelativeMousePos.Y / SequenceCtn.AbsoluteSize.Y;
			const NewValue = math.clamp(this.Min + (this.Max - this.Min) * NewValuePercent, this.Min, this.Max);

			if (this.HoveringIndex === -1) {
				// When clicking where no point is

				const NewSequencePoints: NumberSequenceKeypoint[] = [];
				const ThisNewKeypoint = new NumberSequenceKeypoint(NewTime, NewValue);
				this.Value.Keypoints.forEach((KeyPoint, Index) => NewSequencePoints.push(KeyPoint));
				NewSequencePoints.push(ThisNewKeypoint);
				NewSequencePoints.sort((A, B) => A.Time < B.Time);

				const Index = NewSequencePoints.indexOf(ThisNewKeypoint);
				const NewSequence = new NumberSequence(NewSequencePoints);
				this.SetValue(NewSequence);

				this.SelectPoint(Index);
				this.HoveringIndex = Index;
			} else {
				// When clicking where a point is

				// Clamp to 0 and 1
				if (this.HoveringIndex === 0) {
					NewTime = 0;
				} else if (this.HoveringIndex === this.Value.Keypoints.size() - 1) {
					NewTime = 1;
				}

				const NewSequencePoints: NumberSequenceKeypoint[] = [];
				let ThisSelectedKeypoint: NumberSequenceKeypoint | undefined;
				this.Value.Keypoints.forEach((KeyPoint, Index) => {
					if (Index === this.HoveringIndex) {
						ThisSelectedKeypoint = new NumberSequenceKeypoint(NewTime, NewValue);
						NewSequencePoints.push(ThisSelectedKeypoint);
					} else {
						NewSequencePoints.push(KeyPoint);
					}
				});
				NewSequencePoints.sort((A, B) => A.Time < B.Time);

				assert(ThisSelectedKeypoint, "The selected sequence keypoint must exist");
				const Index = NewSequencePoints.indexOf(ThisSelectedKeypoint);
				const NewSequence = new NumberSequence(NewSequencePoints);
				this.SetValue(NewSequence);

				this.SelectPoint(Index);
				this.HoveringIndex = Index;
			}
		} else {
			this.HoveringIndex = -1;
			SequenceCtn.ControlPoints.GetChildren().forEach((Point) => {
				if (!Point.IsA("Frame")) return;

				const PointIndex = tonumber(Point.Name) ?? 0;
				const PointPos = Point.AbsolutePosition.add(Point.AbsoluteSize.mul(0.5));
				const DistanceFromMouse = this.MousePos.sub(PointPos).Magnitude;

				if (DistanceFromMouse < 10) {
					this.HoveringIndex = PointIndex;
					this.SelectPoint(PointIndex);
				}
			});
		}
	}

	private SelectPoint(Index: number) {
		if (this.SelectedIndex === Index) return;
		this.SelectedIndex = Index;

		const UI = this.UI;
		const SequenceCtn = UI.Content.Mid.InnerContent.SequenceContainer;

		SequenceCtn.ControlPoints.GetChildren().forEach((Point) => {
			if (!Point.IsA("Frame")) return;

			const IsSelected = tonumber(Point.Name) === Index;
			Point.BackgroundColor3 = IsSelected ? Color3.fromRGB(255, 115, 115) : Color3.fromRGB(255, 255, 255);
		});

		this.UpdateCurve();
	}

	// @outline METHODS

	SetValue(NewSequence: NumberSequence) {
		this.Value = NewSequence;
		this.UpdateCurve();
		this.Callback(this.Value);
		return this;
	}

	SetMin(Min: number) {
		const InputCtn = this.UI.Content.Bottom.Ctn;

		this.Min = Min;
		this.UpdateCurve();

		InputCtn.Min.TextBox.Text = tostring(this.Min);
		return this;
	}

	SetMax(Max: number) {
		const InputCtn = this.UI.Content.Bottom.Ctn;

		this.Max = Max;
		this.UpdateCurve();

		InputCtn.Max.TextBox.Text = tostring(this.Max);
		return this;
	}

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		this.UpdateParentHeight();

		return this;
	}

	SetTitle(NewTitle: string) {
		this.UI.Content.Top.TextLabel.Text = NewTitle;
		return this;
	}

	SetOnChanged(Callback: (Value: NumberSequence) => void) {
		this.Callback = Callback;
		return this;
	}
}
