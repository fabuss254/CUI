import { CreateVideStory, Slider } from "@rbxts/ui-labs";
import Vide from "@rbxts/vide";
import { StoryHelper } from "./StoryHelper";

const Story = CreateVideStory(
	{
		vide: Vide,
		controls: {
			Visible: true,
			Width: Slider(0.85, 0.25, 1, 0.05),
			Empty: false,
			Height: Slider(220, 80, 400, 1),
			Zoom: Slider(2, 0.5, 6, 0.1),
			FieldOfView: Slider(30, 10, 90, 1),
			Color: Color3.fromRGB(70, 165, 245),
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Viewport");
		const Model = new Instance("Model");
		Model.Name = "PreviewModel";
		const Body = new Instance("Part");
		Body.Name = "Body";
		Body.Anchored = true;
		Body.Size = new Vector3(3, 2, 2);
		Body.Parent = Model;
		const Top = new Instance("Part");
		Top.Name = "Top";
		Top.Anchored = true;
		Top.Shape = Enum.PartType.Ball;
		Top.Size = new Vector3(1.5, 1.5, 1.5);
		Top.Position = new Vector3(0, 1.75, 0);
		Top.Color = Color3.fromRGB(245, 190, 80);
		Top.Parent = Model;
		Model.PrimaryPart = Body;
		Vide.cleanup(() => Model.Destroy());
		Preview.SetStatus("Preview model is created locally; no place assets or live players are needed.");

		Vide.effect(() => {
			Component.SetVisible(Props.controls.Visible()).SetYSize(Props.controls.Height());
		});
		Vide.effect(() => {
			Body.Color = Props.controls.Color();
			if (Props.controls.Empty()) Component.Clear();
			else Component.SetModel(Model).SetDefaultCamera(Props.controls.Zoom(), Props.controls.FieldOfView());
		});

		return Preview.Host;
	},
);

export = Story;
