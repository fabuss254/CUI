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
			LeftWidth: Slider(0.5, 0.15, 0.85, 0.05),
			EmptyLeft: false,
			EmptyRight: false,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Split");
		const Left = Component.LeftComponents.Add("Box");
		Left.Components.Add("Title").SetTitle("Left");
		Left.Components.Add("Checkbox").SetText("Option").SetValue(true);
		const Right = Component.RightComponents.Add("Box");
		Right.Components.Add("Title").SetTitle("Right");
		Right.Components.Add("Button")
			.SetButtonText("Action")
			.SetButtonCallback(() => Preview.SetStatus("Right button activated"));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetLeftSizePercent(Props.controls.LeftWidth());
			Left.SetVisible(!Props.controls.EmptyLeft());
			Right.SetVisible(!Props.controls.EmptyRight());
		});

		return Preview.Host;
	},
);

export = Story;
