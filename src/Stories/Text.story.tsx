import { Choose, CreateVideStory, Slider } from "@rbxts/ui-labs";
import Vide from "@rbxts/vide";
import { StoryHelper } from "./StoryHelper";

const Story = CreateVideStory(
	{
		vide: Vide,
		controls: {
			Visible: true,
			Width: Slider(0.85, 0.25, 1, 0.05),
			Text: "A reusable <b>CUI</b> text component. Narrow the preview to inspect wrapping.",
			State: Choose(["Ready", "Empty", "Loading", "Error"], 1),
			RichText: true,
			AutoResize: true,
			Height: Slider(48, 20, 180, 1),
			TextSize: Slider(16, 10, 32, 1),
			TextColor: Color3.fromRGB(235, 235, 235),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Text");
		const Pending = new Promise<string>(() => {});
		Vide.cleanup(() => Pending.cancel());

		Vide.effect(() => {
			Component.SetVisible(Props.controls.Visible());
			Component.SetRichTextEnabled(Props.controls.RichText());
			Component.SetTextSize(Props.controls.TextSize()).SetTextColor(Props.controls.TextColor());
			Component.SetYSize(Props.controls.Height()).SetAutoResize(Props.controls.AutoResize());
		});
		Vide.effect(() => {
			const State = Props.controls.State();
			if (State === "Loading") Component.SetText(Pending);
			else if (State === "Error") Component.SetText(new Promise<string>((Resolve, Reject) => Reject("Preview error")));
			else Component.SetText(State === "Empty" ? "" : Props.controls.Text());
		});

		return Preview.Host;
	},
);

export = Story;
