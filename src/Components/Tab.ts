import { Janitor } from "@rbxts/janitor";
import { TabView } from "./Views/Tab";
import Signal from "../Libraries/signal";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Tab extends UIComponent<TabView.T_UI> {
	// @outline PROPERTIES

	private SelectedColors = {
		Background: this.UI.TabCtn.TabFrameSelected.BackgroundColor3,
		Text: this.UI.TabCtn.TabFrameSelected.Title.TextColor3,
		Highlight: this.UI.TabCtn.TabFrameSelected.DecoHighlight.BackgroundColor3,
	};
	private UnselectedColors = {
		Background: this.UI.TabCtn.TabFrameUnSelected.BackgroundColor3,
		Text: this.UI.TabCtn.TabFrameUnSelected.Title.TextColor3,
		Highlight: this.UI.TabCtn.TabFrameUnSelected.DecoHighlight.BackgroundColor3,
	};

	private TabsJanitor = new Janitor();
	private TabsRevision = 0;

	private ComponentContainers: Map<string, CUI.ComponentManager> = new Map();
	private CurTab = "";
	private OnTabChanged: (NewTab: string) => void = () => {};

	OnTabOpened = new Signal<[NewTab: string]>();

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, TabView.Create);
		this.Janitor.Add(this.TabsJanitor, "Destroy");

		this.UI.TabCtn.GetChildren()
			.filter((v): v is Frame => v.IsA("Frame"))
			.forEach((Tab) => Tab.Destroy());

		this.UI.ContentCtn.GetChildren()
			.filter((v): v is Frame => v.IsA("Frame"))
			.forEach((Tab) => Tab.Destroy());

		this.Janitor.Add(
			this.GetMainContainer().OnUpdateWidth.Connect(() => this.UpdateTabHeight()),
			"Disconnect",
		);
	}

	// @outline METHODS

	SetSizeY(SizeY: number) {
		this.SetRootSize(new UDim2(1, 0, 0, SizeY));
		this.UpdateHeight();
		this.UpdateParentHeight();
		return this;
	}

	SetTabs(Tabs: string[]) {
		if (this.IsDestroyed()) return this;
		const Revision = ++this.TabsRevision;
		this.CurTab = "";
		this.TabsJanitor.Cleanup();
		this.ComponentContainers.clear();

		Tabs.forEach((TabName, i) => {
			if (this.IsDestroyed() || this.TabsRevision !== Revision || this.ComponentContainers.has(TabName)) return;
			const NewTabFrame = this.CreateOwnedUI(TabView.Header, this.TabsJanitor);
			NewTabFrame.Name = TabName;
			NewTabFrame.Title.Text = TabName;
			NewTabFrame.LayoutOrder = i;
			NewTabFrame.Parent = this.UI.TabCtn;
			NewTabFrame.GetDescendants()
				.filter((v): v is GuiObject => v.IsA("GuiObject"))
				.forEach((v) => (v.ZIndex += this.UI.ZIndex));

			const TextBound = new Instance("GetTextBoundsParams");
			TextBound.Text = TabName;
			TextBound.Size = NewTabFrame.Title.TextSize;
			TextBound.Width = 100000;
			TextBound.Font = NewTabFrame.Title.FontFace;

			const Size = game.GetService("TextService").GetTextBoundsAsync(TextBound);
			TextBound.Destroy();
			if (this.IsDestroyed() || this.TabsRevision !== Revision) return;
			NewTabFrame.Size = UDim2.fromOffset(Size.X + 12, NewTabFrame.Size.Y.Offset);

			this.TabsJanitor.Add(
				NewTabFrame.Interactibility.MouseEnter.Connect(() => (NewTabFrame.WhiteFrame.BackgroundTransparency = 0.8)),
				"Disconnect",
			);
			this.TabsJanitor.Add(
				NewTabFrame.Interactibility.MouseLeave.Connect(() => (NewTabFrame.WhiteFrame.BackgroundTransparency = 1)),
				"Disconnect",
			);
			this.TabsJanitor.Add(
				NewTabFrame.Interactibility.MouseButton1Click.Connect(() => this.OpenTab(TabName)),
				"Disconnect",
			);

			const NewTabContent = this.CreateOwnedUI(TabView.Content, this.TabsJanitor);
			NewTabContent.Name = TabName;
			NewTabContent.Parent = this.UI.ContentCtn;
			NewTabContent.GetDescendants()
				.filter((v): v is GuiObject => v.IsA("GuiObject"))
				.forEach((v) => (v.ZIndex += this.UI.ZIndex));

			const Tab = this.Manager.CreateChildManager(NewTabContent, this);
			this.ComponentContainers.set(TabName, Tab);
			this.TabsJanitor.Add(Tab, "Destroy");
		});

		if (this.IsDestroyed() || this.TabsRevision !== Revision) return this;
		const FirstTab = Tabs[0];
		if (FirstTab !== undefined) this.OpenTab(FirstTab);
		this.UpdateTabHeight();
		return this;
	}

	GetOpenTabName() {
		return this.CurTab;
	}

	OpenTab(TabName: string) {
		if (!this.ComponentContainers.has(TabName)) return this;
		this.CurTab = TabName;
		this.UpdateDisplay();
		this.UpdateHeight();
		this.UpdateParentHeight();

		this.OnTabChanged(TabName);
		this.OnTabOpened.Fire(TabName);
		return this;
	}

	UpdateDisplay() {
		const Selected = this.SelectedColors;
		const Unselected = this.UnselectedColors;

		this.UI.TabCtn.GetChildren()
			.filter((v): v is ReturnType<typeof TabView.Header> => v.IsA("Frame"))
			.forEach((Tab) => {
				const IsSelected = Tab.Name === this.CurTab;
				Tab.BackgroundColor3 = IsSelected ? Selected.Background : Unselected.Background;
				Tab.Title.TextColor3 = IsSelected ? Selected.Text : Unselected.Text;
				Tab.DecoHighlight.BackgroundColor3 = IsSelected ? Selected.Highlight : Unselected.Highlight;

				Tab.WhiteFrame.Visible = !IsSelected;
			});

		this.UI.ContentCtn.GetChildren()
			.filter((v): v is Frame => v.IsA("Frame"))
			.forEach((Tab) => (Tab.Visible = Tab.Name === this.CurTab));

		return this;
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
		const TabCtn = this.UI.FindFirstChild("TabCtn") as typeof this.UI.TabCtn;
		if (!TabCtn) return;

		TabCtn.Size = new UDim2(1, 0, 0, TabCtn.UIListLayout.AbsoluteContentSize.Y);
		this.UpdateHeight();
	}

	GetHeight(): number {
		return this.GetYSize();
	}

	UpdateHeight(IsGlobal?: boolean): this {
		if (this.IsDestroyed()) return this;
		const ActiveManager = this.ComponentContainers.get(this.CurTab);
		if (this.UI.Parent)
			this.SetRootSize(new UDim2(1, 0, 0, (ActiveManager?.GetComponentsHeight() ?? 0) + this.UI.TabCtn.Size.Y.Offset));
		return super.UpdateHeight(IsGlobal);
	}

	// @outline LIFECYCLE

	OnDestroy(): void {
		this.OnTabOpened.Destroy();
		super.OnDestroy();
	}
}
