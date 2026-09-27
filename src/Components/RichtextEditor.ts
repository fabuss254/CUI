import Vide from "@rbxts/vide";
import { Richtext } from "../Libraries/Richtext";
import { RichTextEditorView } from "./Views/RichTextEditor";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class RichtextEditor extends UIComponent<ReturnType<typeof RichTextEditorView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private OnChanged = (Value: string) => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Value: Vide.source(""),
			Title: Vide.source("Dialog - Quatuar"),
			Color: Vide.source(new Color3(1, 1, 1)),
			Selection: Vide.source<[number, number]>([0, 0]),
			HeightRevision: Vide.source(0),
		};
		let Ready = false;
		super(Manager, ID, (Props) =>
			RichTextEditorView.Create({
				...Props,
				Value: State.Value,
				Title: State.Title,
				Color: State.Color,
				HeightRevision: State.HeightRevision,
				OnChanged: (Value) => {
					if (Ready && Value !== Vide.untrack(State.Value)) this.SetValue(Value);
				},
				OnSelection: (Start, End) => State.Selection([Start, End]),
				OnClearSelection: () => this.ClearSelectedText(),
				OnColor: (Text) => this.SetFontColor(Richtext.TextToColor(Text) ?? Vide.untrack(State.Color)),
				OnFormat: (Prefix, Suffix) => {
					this.AppendToSelectedText(Prefix, Suffix);
					this.ClearSelectedText();
				},
				OnHeight: (Height) => {
					if (this.IsDestroyed() || this.GetYSize() === Height) return;
					this.SetRootSize(new UDim2(1, 0, 0, Height));
					this.UpdateParentHeight();
				},
			}),
		);
		this.State = State;
		Ready = true;
	}

	// @outline METHODS

	ClearSelectedText() {
		this.State.Selection([0, 0]);
	}

	GetSelectedText(): string {
		const [Start, End] = Vide.untrack(this.State.Selection);
		return Start === End ? "" : this.GetValue().sub(Start, End - 1);
	}

	AppendToSelectedText(Prefix: string, Suffix = Prefix) {
		const CurrentText = this.GetValue();
		const [Start, End] = Vide.untrack(this.State.Selection);
		if (Start === End) return;
		this.SetValue(`${CurrentText.sub(0, Start - 1)}${Prefix}${CurrentText.sub(Start, End - 1)}${Suffix}${CurrentText.sub(End)}`);
	}

	SetFontColor(Color: Color3) {
		this.State.Color(Color);
	}

	SetText(Text: string) {
		this.State.Title(Text);
		return this;
	}

	SetValue(Value: string) {
		this.State.Value(Value);
		this.OnChanged(Value);
		return this;
	}

	GetValue() {
		return Vide.untrack(this.State.Value);
	}

	SetOnChanged(Callback: ((Value: string) => void) | undefined) {
		this.OnChanged = Callback ?? (() => {});
		return this;
	}

	UpdateHeight(IsGlobal?: boolean): this {
		this.State.HeightRevision(Vide.untrack(this.State.HeightRevision) + 1);
		return this;
	}
}
