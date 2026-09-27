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
			Empty: false,
			Selected: Choose(["None", "First", "Second", "Third"], 1),
			Height: Slider(160, 60, 320, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("BigDropdown");
		Component.SetOnChanged((Value) => Preview.SetStatus(`Selected: ${Value ?? "none"}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetChoiceList(Props.controls.Empty() ? [] : ["First", "Second", "Third", "Fourth", "Fifth"]);
			const Selected = Props.controls.Selected();
			Component.SetSelected(Selected === "None" ? undefined : Selected);
			Component.SetSizeY(Props.controls.Height());
		});

		return Preview.Host;
	},
);

export = Story;
