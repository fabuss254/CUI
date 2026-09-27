import type { CUI } from "..";
import { SeparatorView } from "./Views/Separator";
import { UIComponent } from "./Base";

export class Separator extends UIComponent<ReturnType<typeof SeparatorView.Create>> {
	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, SeparatorView.Create);
	}
}
