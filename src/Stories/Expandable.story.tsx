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
			Label: "Expandable group",
			Expanded: true,
			Empty: false,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Expandable");
		const Content = Component.Components.Add("Box");
		Content.Components.Add("Text").SetText("Nested components keep the same class API.").SetYSize(28);
		Content.Components.Add("Checkbox").SetText("Nested option").SetValue(true);
		Component.BindOnExpanded((Expanded, IsUserInput) => {
			Preview.SetStatus(`Expanded: ${Expanded}; user input: ${IsUserInput === true}`);
		});

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label());
			Content.SetVisible(!Props.controls.Empty());
			Component.SetExpanded(Props.controls.Expanded(), false, true);
		});

		return Preview.Host;
	},
);

export = Story;
