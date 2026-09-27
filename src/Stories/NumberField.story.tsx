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
			Label: "Number",
			Value: 42,
			Placeholder: "Enter a number",
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("NumberField");
		Component.SetOnChangedUnfocus((Value) => Preview.SetStatus(`Number: ${Value}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Component.SetPlaceholder(Props.controls.Placeholder());
			Component.SetValue(Props.controls.Value());
		});

		return Preview.Host;
	},
);

export = Story;
