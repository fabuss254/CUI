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
			Label: "Text field",
			Value: "Editable value",
			Placeholder: "Enter text",
			State: Choose(["Ready", "Empty", "Loading", "Error"], 1),
			RequireEnter: false,
			ShowLabel: true,
		},
	},
	(Props) => {
		const Preview = StoryHelper.CreateHost(Props.controls.Width);
		const Component = Preview.Container.Components.Add("Field");
		const Pending = new Promise<string>(() => {});
		Vide.cleanup(() => Pending.cancel());

		Vide.effect(() => {
			Component.SetEnabled(Props.controls.Enabled()).SetVisible(Props.controls.Visible());
			Component.SetText(Props.controls.Label()).SetTextVisible(Props.controls.ShowLabel());
			Component.SetPlaceholder(Props.controls.Placeholder());
		});
		Vide.effect(() => {
			const OnCommit = (Value: string) => Preview.SetStatus(`Committed: ${Value}`);
			if (Props.controls.RequireEnter()) Component.SetOnChangedEntered(OnCommit);
			else Component.SetOnChangedUnfocus(OnCommit);
		});
		Vide.effect(() => {
			const State = Props.controls.State();
			if (State === "Loading") Component.SetValue(Pending);
			else if (State === "Error") Component.SetValue(new Promise<string>((Resolve, Reject) => Reject("Preview error")));
			else Component.SetValue(State === "Empty" ? "" : Props.controls.Value());
		});

		return Preview.Host;
	},
);

export = Story;
