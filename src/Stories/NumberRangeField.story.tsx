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
			Label: "Number range",
			Minimum: 5,
			Maximum: 10,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("NumberRangeField");
		Component.SetOnChangedUnfocus((Value) => Preview.SetStatus(`Range: ${Value.Min} to ${Value.Max}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			const Minimum = Props.controls.Minimum();
			const Maximum = Props.controls.Maximum();
			Component.SetValue(new NumberRange(math.min(Minimum, Maximum), math.max(Minimum, Maximum)));
		});

		return Preview.Host;
	},
);

export = Story;
