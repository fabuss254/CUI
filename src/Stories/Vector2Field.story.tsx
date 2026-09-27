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
			Label: "Vector2",
			X: 10,
			Y: 20,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Vector2Field");
		Component.SetOnChangedUnfocus((Value) => Preview.SetStatus(`Vector2: ${Value}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Component.SetValue(new Vector2(Props.controls.X(), Props.controls.Y()));
		});

		return Preview.Host;
	},
);

export = Story;
