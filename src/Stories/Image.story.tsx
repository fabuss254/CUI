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
			Image: "rbxasset://textures/ui/GuiImagePlaceholder.png",
			Tint: Color3.fromRGB(255, 255, 255),
			Transparency: Slider(0, 0, 1, 0.05),
			Height: Slider(150, 32, 320, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Image");
		Component.MakeItFit();
		Preview.SetStatus("Uses a Studio placeholder; enter an image URI to preview your own asset.");

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetImage(Props.controls.Image());
			Component.SetImageColor(Props.controls.Tint());
			Component.SetImageTransparency(Props.controls.Transparency());
			Component.SetHeight(Props.controls.Height());
		});

		return Preview.Host;
	},
);

export = Story;
