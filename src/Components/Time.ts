import Vide from "@rbxts/vide";
import { TimeView } from "./Views/Time";
import type { CUI } from "..";
import { UIComponent } from "./Base";

let ActiveSelector: Time | undefined;

export class Time extends UIComponent<ReturnType<typeof TimeView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private OnChanged = (NewTime: number) => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Time: Vide.source(-1),
			Title: Vide.source("Time Selector"),
			Open: Vide.source(false),
		};
		super(Manager, ID, (Props) =>
			TimeView.Create({
				...Props,
				Time: State.Time,
				Title: State.Title,
				IsOpen: State.Open,
				OnToggle: () => this.SetIsOpen(!Vide.untrack(State.Open)),
				OnTimestamp: (Value) => this.ChangeTime(Value),
				OnField: (Field, Value) => this.ChangeField(Field, Value),
				OnNow: () => this.ChangeTime(DateTime.now().UnixTimestamp),
			}),
		);
		this.State = State;
		this.Janitor.Add(() => {
			if (ActiveSelector === this) ActiveSelector = undefined;
		}, true);
	}

	// @outline PRIVATE_METHODS

	private ChangeTime(Value: number) {
		this.SetTime(Value);
		this.OnChanged(this.GetTime());
	}

	private ChangeField(Field: "Year" | "Month" | "Day" | "Hour" | "Minute", Value: number) {
		const Date = DateTime.fromUnixTimestamp(this.GetTime()).ToLocalTime();
		const Fields = { Year: Date.Year, Month: Date.Month, Day: Date.Day, Hour: Date.Hour, Minute: Date.Minute };
		Fields[Field] = Value;
		const [Success, NewTime] = pcall(() => DateTime.fromLocalTime(Fields.Year, Fields.Month, Fields.Day, Fields.Hour, Fields.Minute));
		if (!Success) {
			print(`[CUI::Time] Invalid date/time entered: ${Fields.Year}-${Fields.Month}-${Fields.Day} ${Fields.Hour}:${Fields.Minute}`);
			return;
		}
		this.ChangeTime(NewTime.UnixTimestamp);
	}

	// @outline METHODS

	SetText(Text: string) {
		this.State.Title(Text);
		return this;
	}

	SetTime(NewTime: number) {
		this.State.Time(math.clamp(NewTime, 0, 32503680000));
		return this;
	}

	SetTimeToNow() {
		return this.SetTime(DateTime.now().UnixTimestamp);
	}

	GetTime() {
		return Vide.untrack(this.State.Time);
	}

	SetOnChanged(Callback: (NewTime: number) => void) {
		this.OnChanged = Callback;
		return this;
	}

	SetIsOpen(IsOpen: boolean) {
		if (ActiveSelector && ActiveSelector !== this) ActiveSelector.SetIsOpen(false);
		if (!this.GetEnabled()) IsOpen = false;
		this.State.Open(IsOpen);
		if (IsOpen) ActiveSelector = this;
		else if (ActiveSelector === this) ActiveSelector = undefined;
		return this;
	}
}
