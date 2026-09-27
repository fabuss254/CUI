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
			Label: "Amount",
			Value: Slider(50, 0, 100, 1),
			Increment: Slider(1, 1, 20, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Slider");
		Component.SetRange(0, 100);
		Component.SetOnChanged((Value) => Preview.SetStatus(`Value: ${Value}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Component.SetIncrement(Props.controls.Increment());
			Component.SetValue(Props.controls.Value());
		});

		return Preview.Host;
	},
);

export = Story;
