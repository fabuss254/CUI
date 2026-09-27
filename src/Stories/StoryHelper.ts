import Vide from "@rbxts/vide";
import { CUI } from "../index";

export namespace StoryHelper {
	// @outline FUNCTIONS

	export function CreateHost(Width: () => number) {
		const Host = Vide.create("Frame")({
			Name: "CUIStory",
			AnchorPoint: new Vector2(0.5, 0),
			Position: UDim2.fromScale(0.5, 0.05),
			Size: () => new UDim2(Width(), 0, 0, 600),
			BackgroundTransparency: 1,
		});
		const Status = Vide.create("TextLabel")({
			Name: "CallbackStatus",
			Size: new UDim2(1, 0, 0, 32),
			BackgroundTransparency: 1,
			Text: "Change the controls or interact with the component.",
			TextColor3: Color3.fromRGB(190, 190, 190),
			TextSize: 14,
			TextWrapped: true,
			TextXAlignment: Enum.TextXAlignment.Left,
			Parent: Host,
		});
		const Content = Vide.create("Frame")({
			Name: "Content",
			Position: UDim2.fromOffset(0, 36),
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			Parent: Host,
		});
		Vide.create("UIListLayout")({
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Parent: Content,
		});
		const Container = CUI.CreateComponentContainer(Content);
		const HeightConnection = Container.OnUpdateHeight.Connect((Height) => {
			Content.Size = new UDim2(1, 0, 0, Height);
		});
		Vide.cleanup(() => {
			HeightConnection.Disconnect();
			Container.Destroy();
			Host.Destroy();
		});

		return {
			Host,
			Container,
			SetStatus: (Text: string) => {
				Status.Text = Text;
			},
		};
	}
}
