import Vide from "@rbxts/vide";
import { TabView } from "./Views/Tab";
import Signal from "../Libraries/signal";
import type { CUI } from "..";
import { UIComponent } from "./Base";

function CreateState() {
	return {
		Tabs: Vide.source<ReadonlyArray<{ Name: string }>>([]),
		Selected: Vide.source(""),
		HeaderHeight: Vide.source(18),
	};
}

export class Tab extends UIComponent<ReturnType<typeof TabView.Create>> {
	// @outline PROPERTIES

	private readonly State: ReturnType<typeof CreateState>;
	private readonly ComponentContainers = new Map<string, CUI.ComponentManager>();
	private OnTabChanged: (NewTab: string) => void = () => {};

	readonly OnTabOpened = new Signal<[NewTab: string]>();

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = CreateState();
		let Ready = false;
		super(Manager, ID, (Props) =>
			TabView.Create({
				...Props,
				Tabs: State.Tabs,
				Selected: State.Selected,
				HeaderHeight: State.HeaderHeight,
				OnSelected: (Name) => this.OpenTab(Name),
				OnHeaderHeightChanged: (Height) => {
					State.HeaderHeight(Height);
					if (Ready) this.UpdateHeight();
				},
				OnContentCreated: (Name, Content) => {
					const TabManager = this.Manager.CreateChildManager(Content, this);
					this.ComponentContainers.set(Name, TabManager);
					return () => {
						TabManager.Destroy();
						if (this.ComponentContainers.get(Name) === TabManager) this.ComponentContainers.delete(Name);
					};
				},
			}),
		);
		this.State = State;
		Ready = true;
		this.Janitor.Add(this.OnTabOpened, "Destroy");
	}

	// @outline METHODS

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		return this;
	}

	SetTabs(Tabs: string[]) {
		if (this.IsDestroyed()) return this;
		const UniqueTabs = [...new Set(Tabs)];
		Vide.batch(() => {
			this.State.Selected(UniqueTabs[0] ?? "");
			this.State.Tabs(UniqueTabs.map((Name) => ({ Name })));
		});
		if (UniqueTabs[0] !== undefined) this.OpenTab(UniqueTabs[0]);
		this.UpdateHeight();
		return this;
	}

	GetOpenTabName() {
		return Vide.untrack(this.State.Selected);
	}

	OpenTab(TabName: string) {
		if (!Vide.untrack(this.State.Tabs).some((Tab) => Tab.Name === TabName)) return this;
		this.State.Selected(TabName);
		this.UpdateHeight();
		this.OnTabChanged(TabName);
		this.OnTabOpened.Fire(TabName);
		return this;
	}

	UpdateDisplay() {
		return this.UpdateHeight();
	}

	GetComponentCtn(Name: string) {
		const Manager = this.ComponentContainers.get(Name);
		assert(Manager, `Unknown tab "${Name}"`);
		return Manager;
	}

	GetAllComponentCtn() {
		const Managers: CUI.ComponentManager[] = [];
		this.ComponentContainers.forEach((Manager) => Managers.push(Manager));
		return Managers;
	}

	SetOnTabChanged(Callback: (NewTab: string) => void) {
		this.OnTabChanged = Callback;
		return this;
	}

	UpdateTabHeight() {
		this.UpdateHeight();
	}

	GetHeight(): number {
		return this.GetYSize();
	}

	UpdateHeight(IsGlobal?: boolean): this {
		if (this.IsDestroyed()) return this;
		const ActiveManager = this.ComponentContainers.get(this.GetOpenTabName());
		this.SetRootSize(new UDim2(1, 0, 0, (ActiveManager?.GetComponentsHeight() ?? 0) + Vide.untrack(this.State.HeaderHeight)));
		return super.UpdateHeight(IsGlobal);
	}
}
