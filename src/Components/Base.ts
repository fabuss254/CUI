import { Janitor } from "@rbxts/janitor";
import Vide from "@rbxts/vide";
import type { CUI } from "..";
import { ClassUtils } from "../Libraries/ClassUtils";
import Signal from "../Libraries/signal";
import type { UIState } from "../Internal/UIState";

const ComponentRoots = new Set<Instance>();

export class UIComponent<T extends GuiObject> {
	// @outline PROPERTIES

	protected readonly UI: T;
	protected readonly Manager: CUI.ComponentManager;
	protected readonly ID: string;
	protected readonly Janitor = new Janitor();
	protected readonly AllGuiObjects = new Set<GuiObject>();
	protected Destroyed = false;

	private ZOffset = 0;
	private readonly ZLayer = Vide.source(0);
	private readonly Visible = Vide.source(true);
	private readonly RootSize = Vide.source<UDim2>();
	private readonly BackgroundColor = Vide.source<Color3>();
	private readonly BackgroundTransparency = Vide.source<number>();
	private readonly LayoutOrder = Vide.source(0);
	private readonly Enabled = Vide.source(true);
	private EnabledPermission: string | string[] | undefined;
	private EnabledRank: number | undefined;

	readonly OnEnabledChanged = this.Janitor.Add(new Signal<[IsEnabled: boolean]>());

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string, CreateUI: (Props: UIState.T_Props) => T) {
		this.Manager = Manager;
		this.ID = ID;
		this.UI = this.CreateOwnedUI(() => {
			const UI = CreateUI({
				Visible: this.Visible,
				Size: this.RootSize,
				BackgroundColor3: this.BackgroundColor,
				BackgroundTransparency: this.BackgroundTransparency,
				LayoutOrder: this.LayoutOrder,
				Enabled: this.Enabled,
			});
			ComponentRoots.add(UI);
			this.AllGuiObjects.add(UI);
			UI.GetDescendants().forEach((Descendant) => this.TrackGuiObject(Descendant, UI));
			Vide.effect(() => {
				const Layer = this.ZLayer();
				this.AllGuiObjects.forEach((Object) => this.ApplyZIndex(Object, Layer));
			});
			Vide.cleanup(() => ComponentRoots.delete(UI));
			return UI;
		});
		this.UI.Name = ClassUtils.GetClassName(ClassUtils.GetClassFromInstance(this));
		this.Janitor.Add(
			this.UI.DescendantAdded.Connect((Descendant) => this.TrackGuiObject(Descendant, this.UI)),
			"Disconnect",
		);
		this.Janitor.Add(
			this.UI.DescendantRemoving.Connect((Descendant) => {
				if (Descendant.IsA("GuiObject")) this.AllGuiObjects.delete(Descendant);
			}),
			"Disconnect",
		);
		this.SetZIndex(1000 * this.GetDepth());
		this.UI.Parent = Manager.ContentFrame;
		Manager.RegisterComponent(ID, this);
		this.Janitor.Add(
			this.UI.Destroying.Connect(() => this.Destroy()),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	private ApplyZIndex(UI: GuiObject, Layer: number) {
		if (UI.GetAttribute("DefaultZIndex") === undefined) UI.SetAttribute("DefaultZIndex", UI.ZIndex);
		UI.ZIndex = (UI.GetAttribute("DefaultZIndex") as number) + Layer;
	}

	private TrackGuiObject(Descendant: Instance, Root: GuiObject) {
		if (!Descendant.IsA("GuiObject")) return;
		let Ancestor: Instance | undefined = Descendant;
		while (Ancestor && Ancestor !== Root) {
			if (ComponentRoots.has(Ancestor)) return;
			Ancestor = Ancestor.Parent;
		}
		this.AllGuiObjects.add(Descendant);
		this.ApplyZIndex(Descendant, Vide.untrack(this.ZLayer));
	}

	protected CreateOwnedUI<U extends Instance>(CreateUI: () => U, Owner = this.Janitor): U {
		const [Destroy, UI] = Vide.root(() => {
			const Instance = CreateUI();
			Vide.cleanup(Instance);
			return Instance;
		});
		Owner.Add(Destroy, true);
		return UI;
	}

	protected SetRootSize(Size: UDim2) {
		this.RootSize(Size);
	}

	// @outline METHODS

	GetDepth() {
		return this.Manager.Parent.GetDepth() + 1;
	}

	GetWidth() {
		return this.Manager.GetWidth();
	}

	SetZIndex(Offset: number) {
		this.ZOffset = Offset;
		this.ZLayer(Offset + this.GetMainContainer().GetZIndex());
		return this;
	}

	UpdateZIndex() {
		return this.SetZIndex(this.ZOffset);
	}

	SetVisible(Visible: boolean) {
		if (Vide.untrack(this.Visible) !== Visible) {
			this.Visible(Visible);
			this.UpdateParentHeight();
		}
		return this;
	}

	GetVisible() {
		return Vide.untrack(this.Visible);
	}

	GetYSize() {
		return (Vide.untrack(this.RootSize) ?? this.UI.Size).Y.Offset;
	}

	SetBackgroundColor(Color: Color3) {
		this.BackgroundColor(Color);
		return this;
	}

	GetBackgroundColor() {
		return Vide.untrack(this.BackgroundColor) ?? this.UI.BackgroundColor3;
	}

	SetBackgroundTransparency(Transparency: number) {
		this.BackgroundTransparency(Transparency);
		return this;
	}

	GetBackgroundTransparency() {
		return Vide.untrack(this.BackgroundTransparency) ?? this.UI.BackgroundTransparency;
	}

	UpdateParentHeight() {
		this.Manager.Parent.UpdateHeight();
		return this;
	}

	UpdateHeight(IsGlobal?: boolean): this {
		if (!IsGlobal) this.UpdateParentHeight();
		return this;
	}

	GetMainContainer(): CUI.ComponentContainer {
		return this.Manager.Parent.GetMainContainer();
	}

	GetHeight(): number {
		return (Vide.untrack(this.RootSize) ?? this.UI.Size).Y.Offset;
	}

	GetUI() {
		return this.UI;
	}

	GetID() {
		return this.ID;
	}

	SetLayoutOrder(Order: number) {
		this.LayoutOrder(Order);
		return this;
	}

	GetLayoutOrder() {
		return Vide.untrack(this.LayoutOrder);
	}

	IsDestroyed() {
		return this.Destroyed;
	}

	GetEnabled() {
		return Vide.untrack(this.Enabled);
	}

	SetEnabled(IsEnabled: boolean) {
		if (this.GetEnabled() === IsEnabled) return this;
		this.Enabled(IsEnabled);
		this.UpdateEnabledDisplay();
		this.OnEnabledChanged.Fire(IsEnabled);
		return this;
	}

	// Retained archive metadata; no game permission system is consulted.
	SetEnabledPermission(Permission: string | string[]) {
		this.EnabledPermission = Permission;
		this.UpdateEnabled();
		return this;
	}

	SetEnabledRank(Rank: number) {
		this.EnabledRank = Rank;
		this.UpdateEnabled();
		return this;
	}

	protected UpdateEnabled() {
		this.UpdateEnabledDisplay();
	}

	protected UpdateEnabledDisplay() {}

	// @outline LIFECYCLE

	OnCreate() {
		this.UpdateEnabledDisplay();
	}

	Destroy() {
		if (this.Destroyed) return;
		this.Destroyed = true;
		this.OnDestroy();
	}

	protected OnDestroy() {
		this.Janitor.Destroy();
		this.Manager.UnregisterComponent(this.ID, this);
		this.UpdateParentHeight();
	}
}
