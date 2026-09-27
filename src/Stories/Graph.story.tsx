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
			Start: Slider(0, 0, 1, 0.05),
			End: Slider(1, 0, 1, 0.05),
			Height: Slider(200, 100, 360, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Graph");
		Preview.SetStatus("The archived Graph renderer is unfinished; these controls exercise its existing API.");

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetCurve([Props.controls.Start(), Props.controls.End(), [0.25, 0], [0.75, 1]]);
			Component.SetSizeY(Props.controls.Height());
		});

		return Preview.Host;
	},
);

export = Story;
