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
			Label: "Number sequence",
			Shape: Choose(["Ramp", "Peak", "Flat"], 1),
			Height: Slider(260, 160, 420, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("SequenceEditor");
		Component.SetOnChanged((Value) => Preview.SetStatus(`Sequence has ${Value.Keypoints.size()} keypoints`));
		Component.SetMin(0).SetMax(1);

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetTitle(Props.controls.Label()).SetSizeY(Props.controls.Height());
			const Shape = Props.controls.Shape();
			Component.SetValue(
				Shape === "Peak"
					? new NumberSequence([
							new NumberSequenceKeypoint(0, 0),
							new NumberSequenceKeypoint(0.5, 1),
							new NumberSequenceKeypoint(1, 0),
						])
					: Shape === "Flat"
						? new NumberSequence(0.5)
						: new NumberSequence(0, 1),
			);
		});

		return Preview.Host;
	},
);

export = Story;
