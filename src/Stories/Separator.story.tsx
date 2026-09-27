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
			Background: Color3.fromRGB(70, 70, 70),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Separator");
		Preview.Container.Components.Add("Text").SetText("Content after the separator").SetYSize(28);
		Preview.SetStatus("Separator retains its authored pixel height at each preview width.");

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetBackgroundColor(Props.controls.Background());
		});

		return Preview.Host;
	},
);

export = Story;
