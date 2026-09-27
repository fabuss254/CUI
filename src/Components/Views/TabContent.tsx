import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace TabContentView {
	// @outline TYPES

	export type T_Props = {
		Name: string;
		Visible: Vide.Derivable<boolean>;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props) {
		const Children = { UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout };
		const Content = (
			<frame {...ViewDefaults.Frame} Name={Props.Name} BackgroundTransparency={1} Visible={() => Vide.read(Props.Visible)}>
				{Children.UIListLayout}
			</frame>
		) as Frame & typeof Children;
		Vide.cleanup(Content);
		return Content;
	}
}
