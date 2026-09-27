import Vide from "@rbxts/vide";
import type { CUI } from "..";
import { TitleView } from "./Views/Title";
import { UIComponent } from "./Base";

export class Title extends UIComponent<ReturnType<typeof TitleView.Create>> {
	// @outline PROPERTIES

	private readonly State;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Title: Vide.source("•   Exporting"),
			TitleVisible: Vide.source(true),
		};
		super(Manager, ID, (Props) => TitleView.Create({ ...Props, ...State }));
		this.State = State;
	}

	// @outline METHODS

	SetTitle(NewTitle: string) {
		this.State.Title(`•   ${NewTitle}`);
		return this;
	}

	SetTitleVisible(Visible: boolean) {
		this.State.TitleVisible(Visible);
		return this;
	}
}
