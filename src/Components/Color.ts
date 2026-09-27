import Vide from "@rbxts/vide";
import { Richtext } from "../Libraries/Richtext";
import { ColorView } from "./Views/Color";
import type { CUI } from "..";
import { UIComponent } from "./Base";

let ActiveColor: Color | undefined;
let GlobalMode: "RGB" | "HSV" = "HSV";

export class Color extends UIComponent<ReturnType<typeof ColorView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private OnChanged = (Value: Color3) => {};

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Color: Vide.source(new Color3(1, 1, 1)),
			Title: Vide.source("Color Selector"),
			Mode: Vide.source(GlobalMode),
			Open: Vide.source(false),
		};
		super(Manager, ID, (Props) =>
			ColorView.Create({
				...Props,
				Color: State.Color,
				Title: State.Title,
				Mode: State.Mode,
				IsOpen: State.Open,
				OnToggle: () => this.SetOpen(!Vide.untrack(State.Open)),
				OnModeToggle: () => {
					GlobalMode = Vide.untrack(State.Mode) === "RGB" ? "HSV" : "RGB";
					State.Mode(GlobalMode);
				},
				OnColorText: (Text) => {
					const NewColor = Richtext.TextToColor(Text);
					if (NewColor) this.ChangeColor(NewColor);
				},
				OnChannel: (Index, Value) => this.ChangeChannel(Index, Value),
			}),
		);
		this.State = State;
		this.Janitor.Add(() => {
			if (ActiveColor === this) ActiveColor = undefined;
		}, true);
	}

	// @outline PRIVATE_METHODS

	private ChangeColor(Value: Color3) {
		this.SetColor(Value);
		this.OnChanged(Value);
	}

	private ChangeChannel(Index: number, Value: number) {
		const Color = this.GetColor();
		const [H, S, V] = Color.ToHSV();
		const Channels = Vide.untrack(this.State.Mode) === "RGB" ? [Color.R, Color.G, Color.B] : [H, S, V];
		Channels[Index] = Value;
		this.ChangeColor(
			Vide.untrack(this.State.Mode) === "RGB"
				? new Color3(Channels[0], Channels[1], Channels[2])
				: Color3.fromHSV(Channels[0], Channels[1], Channels[2]),
		);
	}

	protected UpdateEnabledDisplay() {
		if (!this.GetEnabled() && Vide.untrack(this.State.Open)) this.SetOpen(false);
	}

	// @outline METHODS

	SetText(Text: string) {
		this.State.Title(Text);
		return this;
	}

	SetColor(NewColor: Color3) {
		this.State.Color(NewColor);
		return this;
	}

	GetColor() {
		return Vide.untrack(this.State.Color);
	}

	SetOnChanged(Callback: (Value: Color3) => void) {
		this.OnChanged = Callback;
		return this;
	}

	SetOpen(IsOpen: boolean) {
		if (!this.GetEnabled()) IsOpen = false;
		if (ActiveColor && ActiveColor !== this) ActiveColor.SetOpen(false);
		Vide.batch(() => {
			this.State.Mode(GlobalMode);
			this.State.Open(IsOpen);
		});
		if (IsOpen) ActiveColor = this;
		else if (ActiveColor === this) ActiveColor = undefined;
		return this;
	}
}
