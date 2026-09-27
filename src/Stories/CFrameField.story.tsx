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
			Label: "CFrame",
			X: 0,
			Y: 5,
			Z: 0,
			YawDegrees: Slider(45, -180, 180, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("CFrameField");
		Component.SetOnChangedUnfocus((Value) => Preview.SetStatus(`CFrame: ${Value}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Component.SetValue(
				new CFrame(Props.controls.X(), Props.controls.Y(), Props.controls.Z()).mul(
					CFrame.Angles(0, math.rad(Props.controls.YawDegrees()), 0),
				),
			);
		});

		return Preview.Host;
	},
);

export = Story;
