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
			Height: Slider(160, 40, 320, 1),
			Scroll: Slider(0, 0, 260, 1),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("List");
		const Items = Component.Components.Add("Box");
		for (let Index = 1; Index <= 12; Index++) {
			Items.Components.Add("Button")
				.SetButtonText(`Item ${Index}`)
				.SetYSize(28)
				.SetButtonCallback(() => Preview.SetStatus(`Activated item ${Index}`));
		}

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Items.SetVisible(!Props.controls.Empty());
			Component.SetSizeY(Props.controls.Height()).SetScroll(Props.controls.Scroll());
		});

		return Preview.Host;
	},
);

export = Story;
