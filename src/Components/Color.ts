import Vide from "@rbxts/vide";
import { Richtext } from "../Libraries/Richtext";
import { ColorView } from "./Views/Color";
import type { CUI } from "..";
import { UIComponent } from "./Base";

const CSK = ColorSequenceKeypoint;

function ToHEX(Color: Color3) {
	return string.format("#%02X%02X%02X", Color.R * 0xff, Color.G * 0xff, Color.B * 0xff);
}

let ActiveColor: undefined | Color = undefined;
let GlobalMode: "RGB" | "HSV" = "HSV";
export class Color extends UIComponent<ColorView.T_UI> {
	// @outline PROPERTIES

	private OnChanged = (Value: Color3) => {};
	private CurrentColor: Vide.Source<Color3>;

	private IsOpen: Vide.Source<boolean>;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const CurrentColor = Vide.source(new Color3(1, 1, 1));
		const IsOpen = Vide.source(false);
		super(Manager, ID, (Props) => ColorView.Create({ ...Props, Color: CurrentColor, IsOpen }));
		this.CurrentColor = CurrentColor;
		this.IsOpen = IsOpen;
		this.Janitor.Add(() => {
			if (ActiveColor === this) ActiveColor = undefined;
		}, true);

		this.Janitor.Add(
			this.UI.Right.Ctn.Btn.MouseButton1Click.Connect(() => {
				this.SetOpen(!Vide.untrack(this.IsOpen));
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.Selector.RatioedCtn.Others.Mode.Btn.MouseButton1Click.Connect(() => {
				this.SetMode(GlobalMode === "RGB" ? "HSV" : "RGB");
			}),
			"Disconnect",
		);

		// Automatically select text on focus
		this.Janitor.Add(
			this.UI.Right.Selector.RatioedCtn.Others.HTML.TextBox.Focused.Connect(() => {
				if (!this.UI.FindFirstChild("Right")) return;
				this.UI.Right.Selector.RatioedCtn.Others.HTML.TextBox.CursorPosition =
					this.UI.Right.Selector.RatioedCtn.Others.HTML.TextBox.Text.size() + 1;
				this.UI.Right.Selector.RatioedCtn.Others.HTML.TextBox.SelectionStart = 1;
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Right.Selector.RatioedCtn.Others.HTML.TextBox.FocusLost.Connect((Enter) => {
				if (!Enter) return;

				const Hex = this.UI.Right.Selector.RatioedCtn.Others.HTML.TextBox.Text;
				const NewColor = Richtext.TextToColor(Hex);
				if (!NewColor) {
					this.SetColor(Vide.untrack(this.CurrentColor));
					return;
				}

				this.SetColor(NewColor);
				this.OnChanged(NewColor);
			}),
			"Disconnect",
		);

		this.SetupSlider(this.UI.Right.Selector.RatioedCtn.Sliders.R, 1);
		this.SetupSlider(this.UI.Right.Selector.RatioedCtn.Sliders.G, 2);
		this.SetupSlider(this.UI.Right.Selector.RatioedCtn.Sliders.B, 3);
		this.SetOpen(false);
	}

	// @outline PRIVATE_METHODS

	private SetupSlider(SliderUI: Color["UI"]["Right"]["Selector"]["RatioedCtn"]["Sliders"]["R"], ComponentIndex: number) {
		let UpdateInput = (x: number, y: number) => {
			const SliderCtn = SliderUI.Items.SliderCtn;
			const RelativePos = (x - SliderCtn.InnerSlider.AbsolutePosition.X) / SliderCtn.InnerSlider.AbsoluteSize.X;
			const NewValue = math.clamp(RelativePos, 0, 1);

			const CurrentColor = Vide.untrack(this.CurrentColor);
			let NewColor = CurrentColor;
			if (GlobalMode === "RGB") {
				if (ComponentIndex === 1) {
					NewColor = new Color3(NewValue, CurrentColor.G, CurrentColor.B);
				} else if (ComponentIndex === 2) {
					NewColor = new Color3(CurrentColor.R, NewValue, CurrentColor.B);
				} else {
					NewColor = new Color3(CurrentColor.R, CurrentColor.G, NewValue);
				}
			} else {
				const [H, S, V] = CurrentColor.ToHSV();
				if (ComponentIndex === 1) {
					NewColor = Color3.fromHSV(NewValue, S, V);
				} else if (ComponentIndex === 2) {
					NewColor = Color3.fromHSV(H, NewValue, V);
				} else {
					NewColor = Color3.fromHSV(H, S, NewValue);
				}
			}

			this.SetColor(NewColor);
			this.OnChanged(NewColor);
		};

		let Holding = false;
		this.Janitor.Add(
			SliderUI.Interactibility.MouseButton1Down.Connect((x, y) => (Holding = true) && UpdateInput(x, y)),
			"Disconnect",
		);
		this.Janitor.Add(
			SliderUI.Interactibility.MouseButton1Up.Connect(() => (Holding = false)),
			"Disconnect",
		);
		this.Janitor.Add(
			SliderUI.Interactibility.MouseLeave.Connect(() => (Holding = false)),
			"Disconnect",
		);

		this.Janitor.Add(
			SliderUI.Interactibility.MouseMoved.Connect((x, y) => {
				if (!Holding) return;

				UpdateInput(x, y);
			}),
			"Disconnect",
		);
	}

	private GetHTML() {
		return ToHEX(Vide.untrack(this.CurrentColor));
	}

	private SetMode(Mode: "RGB" | "HSV") {
		GlobalMode = Mode;
		this.UpdateData();
		return this;
	}

	private UpdateData() {
		const CurrentColor = Vide.untrack(this.CurrentColor);
		const Selector = this.UI.Right.Selector;
		Selector.RatioedCtn.Others.Mode.Btn.Text = GlobalMode;
		Selector.RatioedCtn.Others.HTML.TextBox.Text = this.GetHTML();

		if (GlobalMode === "RGB") {
			const [R, G, B] = [CurrentColor.R, CurrentColor.G, CurrentColor.B];
			Selector.RatioedCtn.Sliders.R.Items.NumCtn.Title.Text = tostring(math.floor(R * 255));
			Selector.RatioedCtn.Sliders.R.Items.SliderCtn.InnerSlider.Cursor.Position = UDim2.fromScale(R, 0.5);
			Selector.RatioedCtn.Sliders.R.Items.SliderCtn.InnerSlider.UIGradient.Color = new ColorSequence(
				new Color3(0, G, B),
				new Color3(1, G, B),
			);
			Selector.RatioedCtn.Sliders.G.Items.NumCtn.Title.Text = tostring(math.floor(G * 255));
			Selector.RatioedCtn.Sliders.G.Items.SliderCtn.InnerSlider.Cursor.Position = UDim2.fromScale(G, 0.5);
			Selector.RatioedCtn.Sliders.G.Items.SliderCtn.InnerSlider.UIGradient.Color = new ColorSequence(
				new Color3(R, 0, B),
				new Color3(R, 1, B),
			);
			Selector.RatioedCtn.Sliders.B.Items.NumCtn.Title.Text = tostring(math.floor(B * 255));
			Selector.RatioedCtn.Sliders.B.Items.SliderCtn.InnerSlider.Cursor.Position = UDim2.fromScale(B, 0.5);
			Selector.RatioedCtn.Sliders.B.Items.SliderCtn.InnerSlider.UIGradient.Color = new ColorSequence(
				new Color3(R, G, 0),
				new Color3(R, G, 1),
			);
		} else {
			const [H, S, V] = CurrentColor.ToHSV();
			Selector.RatioedCtn.Sliders.R.Items.NumCtn.Title.Text = tostring(math.floor(H * 255));
			Selector.RatioedCtn.Sliders.R.Items.SliderCtn.InnerSlider.Cursor.Position = UDim2.fromScale(H, 0.5);
			Selector.RatioedCtn.Sliders.R.Items.SliderCtn.InnerSlider.UIGradient.Color = new ColorSequence([
				new CSK(0, Color3.fromHSV(0, S, V)),
				new CSK(0.1, Color3.fromHSV(0.1, S, V)),
				new CSK(0.2, Color3.fromHSV(0.2, S, V)),
				new CSK(0.3, Color3.fromHSV(0.3, S, V)),
				new CSK(0.4, Color3.fromHSV(0.4, S, V)),
				new CSK(0.5, Color3.fromHSV(0.5, S, V)),
				new CSK(0.6, Color3.fromHSV(0.6, S, V)),
				new CSK(0.7, Color3.fromHSV(0.7, S, V)),
				new CSK(0.8, Color3.fromHSV(0.8, S, V)),
				new CSK(0.9, Color3.fromHSV(0.9, S, V)),
				new CSK(1, Color3.fromHSV(1, S, V)),
			]);
			Selector.RatioedCtn.Sliders.G.Items.NumCtn.Title.Text = tostring(math.floor(S * 255));
			Selector.RatioedCtn.Sliders.G.Items.SliderCtn.InnerSlider.Cursor.Position = UDim2.fromScale(S, 0.5);
			Selector.RatioedCtn.Sliders.G.Items.SliderCtn.InnerSlider.UIGradient.Color = new ColorSequence(
				Color3.fromHSV(H, 0, V),
				Color3.fromHSV(H, 1, V),
			);
			Selector.RatioedCtn.Sliders.B.Items.NumCtn.Title.Text = tostring(math.floor(V * 255));
			Selector.RatioedCtn.Sliders.B.Items.SliderCtn.InnerSlider.Cursor.Position = UDim2.fromScale(V, 0.5);
			Selector.RatioedCtn.Sliders.B.Items.SliderCtn.InnerSlider.UIGradient.Color = new ColorSequence(
				Color3.fromHSV(H, S, 0),
				Color3.fromHSV(H, S, 1),
			);
		}
	}

	private UpdateDisplay() {
		this.UpdateData();
	}

	protected UpdateEnabledDisplay(): void {
		const IsEnabled = this.GetEnabled();
		if (!IsEnabled && Vide.untrack(this.IsOpen)) this.SetOpen(false);

		this.UI.Right.NonEnabled.Visible = !IsEnabled;
	}

	// @outline METHODS

	SetText(Text: string) {
		this.UI.Left.Title.Text = Text;
		return this;
	}

	SetColor(NewColor: Color3) {
		this.CurrentColor(NewColor);
		this.UpdateData();
		return this;
	}

	GetColor() {
		return Vide.untrack(this.CurrentColor);
	}

	SetOnChanged(Callback: (Value: Color3) => void) {
		this.OnChanged = Callback;
		return this;
	}

	SetOpen(IsOpen: boolean) {
		if (!this.GetEnabled()) IsOpen = false;
		if (ActiveColor && ActiveColor !== this) {
			ActiveColor.SetOpen(false);
		}

		this.IsOpen(IsOpen);
		this.UpdateDisplay();

		if (IsOpen) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			ActiveColor = this;
		} else if (ActiveColor === this) {
			ActiveColor = undefined;
		}
		return this;
	}
}
