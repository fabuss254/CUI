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
			Label: "Choice",
			Empty: false,
			Selected: Choose(["First", "Second", "Third"], 1),
			ShowLabel: true,
			Open: false,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Dropdown");
		Component.SetOnChanged((Value) => Preview.SetStatus(`Selected: ${Value}`));

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label()).SetTextVisible(Props.controls.ShowLabel());
			const Empty = Props.controls.Empty();
			Component.SetChoiceList(Empty ? [] : ["First", "Second", "Third"]);
			Component.SetSelected(Empty ? "<NONE>" : Props.controls.Selected(), true);
			Component.SetIsOpen(Props.controls.Open());
		});

		return Preview.Host;
	},
);

export = Story;
