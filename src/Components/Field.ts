import Vide from "@rbxts/vide";
import { FieldView } from "./Views/Field";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Field<TValue = string> extends UIComponent<ReturnType<typeof FieldView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private OnChangedEntered: (Value: TValue) => void = () => {};
	private Filter = (Value: string) => Value;
	private DoEnterCheck = false;
	private ValueRevision = 0;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Text: Vide.source("Position Y"),
			TextVisible: Vide.source(true),
			Value: Vide.source<TValue>(undefined as TValue),
			CommittedText: Vide.source(""),
			ValueText: Vide.source("0"),
			Placeholder: Vide.source(""),
			Focused: Vide.source(false),
			SelectAllOnFocus: Vide.source(true),
			OnChangedRaw: (Value: string) => {},
		};
		super(Manager, ID, (Props) =>
			FieldView.Create({
				...Props,
				...State,
				OnTextChanged: (Text) => {
					State.ValueText(Text);
					State.OnChangedRaw(Text);
				},
				OnFocused: () => State.Focused(true),
				OnFocusLost: (EnterPressed) => this.Commit(EnterPressed),
			}),
		);
		this.State = State;
	}

	// @outline PRIVATE_METHODS

	private Commit(EnterPressed: boolean) {
		this.State.Focused(false);
		if (!this.GetEnabled() || (this.DoEnterCheck && !EnterPressed)) {
			this.State.ValueText(Vide.untrack(this.State.CommittedText));
			return;
		}

		const NewText = this.Filter(Vide.untrack(this.State.ValueText));
		const NewValue = this.TextToValue(NewText);
		const DisplayText = this.ValueToText(NewValue);
		Vide.batch(() => {
			this.State.Value(NewValue);
			this.State.CommittedText(DisplayText);
			this.State.ValueText(DisplayText);
		});
		this.OnChangedEntered(NewValue);
	}

	protected TextToValue(Text: string): TValue {
		return Text as unknown as TValue;
	}

	protected ValueToText(Value: TValue): string {
		return Value as unknown as string;
	}

	// @outline METHODS

	SetDoSelectAllOnFocus(DoSelectAllOnFocus: boolean) {
		this.State.SelectAllOnFocus(DoSelectAllOnFocus);
		return this;
	}

	SetText(Text: string) {
		this.State.Text(Text);
		return this;
	}

	SetTextVisible(Visible: boolean) {
		this.State.TextVisible(Visible);
		return this;
	}

	SetValue(Value: TValue | Promise<TValue>) {
		if (this.IsDestroyed()) return this;
		const Revision = ++this.ValueRevision;
		if (typeIs(Value, "table")) {
			this.State.ValueText("<LOADING>");
			this.Janitor.AddPromise(
				Value.then((NewValue) => {
					if (!this.IsDestroyed() && this.ValueRevision === Revision) this.SetValue(NewValue);
				}).catch(() => {
					if (!this.IsDestroyed() && this.ValueRevision === Revision) this.State.ValueText("<ERROR>");
				}),
			);
			return this;
		}

		const Text = this.ValueToText(Value);
		Vide.batch(() => {
			this.State.Value(Value);
			this.State.CommittedText(Text);
			if (!Vide.untrack(this.State.Focused)) this.State.ValueText(Text);
		});
		return this;
	}

	GetValue() {
		return Vide.untrack(this.State.Value);
	}

	SetPlaceholder(Placeholder: string) {
		this.State.Placeholder(Placeholder);
		return this;
	}

	GetPlaceholder() {
		return Vide.untrack(this.State.Placeholder);
	}

	SetOnChangedRaw(Callback: (Value: string) => void) {
		this.State.OnChangedRaw = Callback;
		return this;
	}

	SetOnChangedUnfocus(Callback: (Value: TValue) => void) {
		this.OnChangedEntered = Callback;
		this.DoEnterCheck = false;
		return this;
	}

	SetOnChangedEntered(Callback: ((Value: TValue) => void) | undefined) {
		this.OnChangedEntered = Callback ?? (() => {});
		this.DoEnterCheck = true;
		return this;
	}

	SetNumberFilter(Min?: number, Max?: number) {
		this.Filter = (Value) => {
			const CurVal = math.clamp(tonumber(Value) ?? 0, Min ?? -math.huge, Max ?? math.huge);
			return tostring(CurVal);
		};
		return this;
	}

	SetCustomFilter(Filter: (Value: string) => string) {
		this.Filter = Filter;
		return this;
	}
}
