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
			Label: "Enabled option",
			Checked: true,
			ShowLabel: true,
			ShowBackground: true,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Checkbox");
		Component.SetOnChanged((Value) => Preview.SetStatus(`Checked: ${Value}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Component.SetValue(Props.controls.Checked());
			Component.SetTextVisible(Props.controls.ShowLabel());
			Component.SetBackgroundVisible(Props.controls.ShowBackground());
		});

		return Preview.Host;
	},
);

export = Story;
