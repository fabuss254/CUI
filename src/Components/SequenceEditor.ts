import Vide from "@rbxts/vide";
import { SequenceEditorView } from "./Views/SequenceEditor";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class SequenceEditor extends UIComponent<ReturnType<typeof SequenceEditorView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private Callback = (Value: NumberSequence) => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Value: Vide.source(new NumberSequence(0, 1)),
			Selected: Vide.source(0),
			Min: Vide.source(0),
			Max: Vide.source(1),
			Title: Vide.source("Graph - Size"),
		};
		super(Manager, ID, (Props) =>
			SequenceEditorView.Create({
				...Props,
				Value: State.Value,
				Selected: State.Selected,
				Min: State.Min,
				Max: State.Max,
				Title: State.Title,
				OnSelect: (Index) => State.Selected(Index),
				OnPoint: (Index, Time, Value) => this.EditPoint(Index, Time, Value),
				OnTime: (Time) => {
					const Index = Vide.untrack(State.Selected);
					const Points = Vide.untrack(State.Value).Keypoints;
					if (Index === 0 || Index === Points.size() - 1) return;
					this.EditPoint(Index, math.clamp(Time, 0.001, 0.999), Points[Index].Value);
				},
				OnValue: (Value) => {
					const Index = Vide.untrack(State.Selected);
					this.EditPoint(Index, Vide.untrack(State.Value).Keypoints[Index].Time, Value);
				},
				OnMin: (Value) => this.SetMin(Value),
				OnMax: (Value) => this.SetMax(Value),
				OnRemove: () => this.RemovePoint(),
			}),
		);
		this.State = State;
	}

	// @outline PRIVATE_METHODS

	private EditPoint(Index: number, Time: number, Value: number) {
		const Points = [...Vide.untrack(this.State.Value).Keypoints];
		const Point = new NumberSequenceKeypoint(Time, Value);
		if (Index < 0) Points.push(Point);
		else Points[Index] = Point;
		Points.sort((A, B) => A.Time < B.Time);
		const Selected = Points.indexOf(Point);
		Vide.batch(() => {
			this.State.Selected(Selected);
			this.SetValue(new NumberSequence(Points));
		});
		return Selected;
	}

	private RemovePoint() {
		const Index = Vide.untrack(this.State.Selected);
		const Points = Vide.untrack(this.State.Value).Keypoints;
		if (Index <= 0 || Index >= Points.size() - 1) return;
		Vide.batch(() => {
			this.State.Selected(0);
			this.State.Value(new NumberSequence(Points.filter((_, PointIndex) => PointIndex !== Index)));
		});
	}

	// @outline METHODS

	SetValue(NewSequence: NumberSequence) {
		Vide.batch(() => {
			this.State.Value(NewSequence);
			if (Vide.untrack(this.State.Selected) >= NewSequence.Keypoints.size()) this.State.Selected(0);
		});
		this.Callback(NewSequence);
		return this;
	}

	SetMin(Min: number) {
		this.State.Min(Min);
		return this;
	}

	SetMax(Max: number) {
		this.State.Max(Max);
		return this;
	}

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		this.UpdateParentHeight();
		return this;
	}

	SetTitle(NewTitle: string) {
		this.State.Title(NewTitle);
		return this;
	}

	SetOnChanged(Callback: (Value: NumberSequence) => void) {
		this.Callback = Callback;
		return this;
	}
}
