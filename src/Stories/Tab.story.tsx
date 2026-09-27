import { Choose, CreateVideStory, Slider } from "@rbxts/ui-labs";
import Vide from "@rbxts/vide";
import { StoryHelper } from "./StoryHelper";

const Story = CreateVideStory(
	{
		vide: Vide,
		controls: {
			Enabled: true,
			Visible: true,
			Width: Slider(0.85, 0.25, 1, 0.05),
			Selected: Choose(["General", "Details", "Empty"], 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Tab");
		Component.SetTabs(["General", "Details", "Empty"]);
		const General = Component.GetComponentCtn("General");
		General?.Add("Text").SetText("General tab content").SetYSize(28);
		General?.Add("Checkbox").SetText("Option").SetValue(true);
		const Details = Component.GetComponentCtn("Details");
		Details?.Add("Text").SetText("This tab has its own component manager.").SetYSize(28);
		Component.SetOnTabChanged((Name) => Preview.SetStatus(`Open tab: ${Name}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.OpenTab(Props.controls.Selected());
		});

		return Preview.Host;
	},
);

export = Story;
