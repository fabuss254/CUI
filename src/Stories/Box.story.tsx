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
			Empty: false,
			Background: Color3.fromRGB(45, 45, 45),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Box");
		const Text = Component.Components.Add("Text").SetText("A box owns its nested components.").SetYSize(28);
		const Button = Component.Components.Add("Button").SetButtonText("Nested button");
		Button.SetButtonCallback(() => Preview.SetStatus("Nested button activated"));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetBackgroundColor(Props.controls.Background());
			Text.SetVisible(!Props.controls.Empty());
			Button.SetVisible(!Props.controls.Empty());
		});

		return Preview.Host;
	},
);

export = Story;
