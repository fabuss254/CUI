import Vide from "@rbxts/vide";
import type { CUI } from "..";
import { TitleView } from "./Views/Title";
import { UIComponent } from "./Base";

export class Title extends UIComponent<TitleView.T_UI> {
	// @outline PROPERTIES

	private TitleText: Vide.Source<string | undefined>;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const TitleText = Vide.source<string | undefined>(undefined);
		super(Manager, ID, (Props) => TitleView.Create({ ...Props, Title: TitleText }));
		this.TitleText = TitleText;
	}

	// @outline METHODS

	SetTitle(NewTitle: string) {
		this.TitleText(`•   ${NewTitle}`);
		return this;
	}

	SetTitleVisible(Visible: boolean) {
		this.UI.TextLabel.Visible = Visible;
		return this;
	}
}
