import { CreateVideStory, Slider } from "@rbxts/ui-labs";
import Vide from "@rbxts/vide";
import { StoryHelper } from "./StoryHelper";

const Story = CreateVideStory(
	{
		vide: Vide,
		controls: {
			Enabled: true,
			Visible: true,
			Width: Slider(0.85, 0.25, 1, 0.05),
			Label: "Rich text",
			Text: "Edit <b>bold</b> and <i>italic</i> text.",
			FontColor: Color3.fromRGB(255, 190, 100),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("RichtextEditor");
		Component.SetOnChanged((Value) => Preview.SetStatus(`Text: ${Value}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Component.SetValue(Props.controls.Text());
			Component.SetFontColor(Props.controls.FontColor());
		});

		return Preview.Host;
	},
);

export = Story;
