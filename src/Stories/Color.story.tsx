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
			Label: "Accent color",
			Color: Color3.fromRGB(90, 170, 255),
			Open: false,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Color");
		Component.SetOnChanged((Value) => Preview.SetStatus(`Color: #${Value.ToHex()}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Component.SetColor(Props.controls.Color());
			Component.SetOpen(Props.controls.Open());
		});

		return Preview.Host;
	},
);

export = Story;
