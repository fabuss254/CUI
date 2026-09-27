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
			Label: "Press me",
			Confirmation: false,
			Height: Slider(28, 16, 80, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Button");
		let Clicks = 0;
		Component.SetButtonCallback(() => Preview.SetStatus(`Activated ${++Clicks} times`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetButtonText(Props.controls.Label());
			Component.DoNeedConfirmation(Props.controls.Confirmation());
			Component.SetYSize(Props.controls.Height());
		});

		return Preview.Host;
	},
);

export = Story;
