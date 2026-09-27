import Vide from "@rbxts/vide";
import { ExpandableView } from "./Views/Expandable";
import type { CUI } from "..";
import { UIComponent } from "./Base";

function CreateState() {
	return {
		Text: Vide.source("Expendable Title"),
		HeaderHeight: Vide.source(22),
		ContentHeight: Vide.source(0),
		RenderedHeight: Vide.source(0),
		Expansion: Vide.source({ Expanded: false, SkipAnimation: false }),
	};
}

export class Expandable extends UIComponent<ReturnType<typeof ExpandableView.Create>> {
	// @outline PROPERTIES

	private readonly State: ReturnType<typeof CreateState>;
	private OnExpanded = (IsExpanded: boolean, IsUserInput?: boolean) => {};

	readonly Components: CUI.ComponentManager;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = CreateState();
		let Ready = false;
		super(Manager, ID, (Props) =>
			ExpandableView.Create({
				...Props,
				Text: State.Text,
				HeaderHeight: State.HeaderHeight,
				ContentHeight: State.ContentHeight,
				Expansion: State.Expansion,
				OnToggle: () => this.SetExpanded(!this.IsExpanded(), true),
				OnAnimatedHeightChanged: (Height) => {
					State.RenderedHeight(Height);
					if (Ready) this.UpdateInternalSize();
				},
			}),
		);
		this.State = State;
		this.Components = this.Manager.CreateChildManager(this.UI.Content.InnerContent.DeepContent, this);
		this.Janitor.Add(this.Components, "Destroy");
		Ready = true;
	}

	// @outline PRIVATE_METHODS

	private UpdateInternalSize() {
		this.SetRootSize(new UDim2(1, 0, 0, Vide.untrack(this.State.HeaderHeight) + Vide.untrack(this.State.RenderedHeight)));
		this.UpdateParentHeight();
	}

	// @outline METHODS

	SetSizeY(SizeY: number) {
		this.State.HeaderHeight(SizeY);
		this.UpdateInternalSize();
	}

	SetText(Text: string) {
		this.State.Text(Text);
		return this;
	}

	SetExpanded(IsExpanded: boolean, IsUserInput?: boolean, SkipAnimation = false): this {
		this.State.Expansion({ Expanded: IsExpanded, SkipAnimation });
		this.OnExpanded(IsExpanded, IsUserInput);
		return this;
	}

	IsExpanded(): boolean {
		return Vide.untrack(this.State.Expansion).Expanded;
	}

	BindOnExpanded(OnExpanded: (IsExpanded: boolean, IsUserInput?: boolean) => void) {
		this.OnExpanded = OnExpanded;
		return this;
	}

	UpdateHeight(IsGlobal?: boolean): this {
		if (this.IsDestroyed()) return this;
		this.State.ContentHeight(this.Components.GetComponentsHeight());
		return super.UpdateHeight(IsGlobal);
	}
}
