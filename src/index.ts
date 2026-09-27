import { Janitor } from "@rbxts/janitor";
import { Components } from "./Components";
import type { UIComponent } from "./Components/Base";
import { ClassUtils } from "./Libraries/ClassUtils";
import Signal from "./Libraries/signal";

const HttpService = game.GetService("HttpService");

export namespace CUI {
	// @outline TYPES

	export type T_AllComponents = typeof Components.Classes;
	export type T_Component = T_AllComponents[keyof T_AllComponents]["prototype"];

	export interface I_ComponentContainer {
		UpdateHeight(): this;
		GetMainContainer(): ComponentContainer;
		GetDepth(): number;
		GetWidth(): number;
	}

	// @outline VARIABLES

	const AllComponentPool = new Map<string, UIComponent<GuiObject>>();

	// @outline CLASSES

	export class ComponentManager {
		// @outline PROPERTIES

		readonly Parent: I_ComponentContainer;
		readonly ContentFrame: GuiObject;
		private LayoutOrder = 0;
		private readonly ComponentPool = new Map<string, T_Component>();
		private readonly RetrieveWidth: () => number;
		private Destroyed = false;

		// @outline CONSTRUCTOR

		constructor(ContentFrame: GuiObject, Parent: I_ComponentContainer, RetrieveWidth?: () => number) {
			this.ContentFrame = ContentFrame;
			this.Parent = Parent;
			this.RetrieveWidth = RetrieveWidth ?? (() => Parent.GetWidth());
		}

		// @outline METHODS

		Add<T extends keyof T_AllComponents>(
			ComponentName: T,
			ID?: string,
			Setup?: (Component: T_AllComponents[T]["prototype"]) => void,
		): T_AllComponents[T]["prototype"] {
			assert(!this.Destroyed, "Cannot add a component to a destroyed manager");
			while (ID === undefined || this.ComponentPool.has(ID)) ID = HttpService.GenerateGUID(false);
			// The registry key determines the concrete constructor and returned component.
			const ComponentClass = Components.Classes[ComponentName];
			const Component = new ComponentClass(this, ID) as T_AllComponents[T]["prototype"];
			this.ComponentPool.set(ID, Component);
			Component.OnCreate();
			Component.SetLayoutOrder(this.LayoutOrder++);
			if (Setup) Setup(Component);
			this.Parent.UpdateHeight();
			return Component;
		}

		Remove(ID: string) {
			const Component = this.ComponentPool.get(ID);
			if (Component) Component.Destroy();
			return this;
		}

		Get(ID: string): T_Component | undefined {
			return this.ComponentPool.get(ID);
		}

		FindFirstByType<T extends keyof T_AllComponents>(Type: T): T_AllComponents[T]["prototype"] | undefined {
			for (const [, Component] of this.ComponentPool) {
				if (IsComponentType(Component, Type)) return Component;
			}
		}

		GetAll(): Map<string, T_Component> {
			return this.ComponentPool;
		}

		GetComponentsHeight() {
			let Height = 0;
			for (const [, Component] of this.ComponentPool) {
				if (Component.GetVisible()) Height += Component.GetHeight();
			}
			return Height;
		}

		GetWidth() {
			return this.RetrieveWidth();
		}

		CreateChildManager(ContentFrame: GuiObject, Parent: I_ComponentContainer, RetrieveWidth?: () => number): ComponentManager {
			return new ComponentManager(ContentFrame, Parent, RetrieveWidth);
		}

		/** Internal component lifecycle registration. */
		RegisterComponent(ID: string, Component: UIComponent<GuiObject>) {
			DefineComponent(ID, Component);
		}

		/** Internal component lifecycle removal. */
		UnregisterComponent(ID: string, Component: UIComponent<GuiObject>) {
			if (AllComponentPool.get(ID) === Component) AllComponentPool.delete(ID);
			if (this.ComponentPool.get(ID) === Component) this.ComponentPool.delete(ID);
		}

		// @outline LIFECYCLE

		Destroy() {
			if (this.Destroyed) return;
			this.Destroyed = true;
			const OwnedComponents = new Array<T_Component>();
			for (const [, Component] of this.ComponentPool) OwnedComponents.push(Component);
			OwnedComponents.forEach((Component) => Component.Destroy());
			this.ComponentPool.clear();
		}
	}

	export class ComponentContainer implements I_ComponentContainer {
		// @outline PROPERTIES

		readonly ID: string;
		readonly Components: ComponentManager;
		private readonly UI: Frame;
		private readonly Janitor = new Janitor();
		private IsDestroyed = false;

		readonly OnUpdateHeight = this.Janitor.Add(new Signal<[Height: number]>());
		readonly OnUpdateWidth = this.Janitor.Add(new Signal<[Width: number]>());

		// @outline CONSTRUCTOR

		constructor(ID: string, ParentUI: Frame) {
			this.ID = ID;
			this.UI = ParentUI;
			this.Components = new ComponentManager(ParentUI, this);
			let Width = ParentUI.AbsoluteSize.X;
			this.Janitor.Add(
				ParentUI.GetPropertyChangedSignal("AbsoluteSize").Connect(() => {
					const NewWidth = ParentUI.AbsoluteSize.X;
					if (Width === NewWidth) return;
					Width = NewWidth;
					this.OnUpdateWidth.Fire(NewWidth);
				}),
			);
			this.Janitor.Add(ParentUI.Destroying.Connect(() => this.Destroy()));
		}

		// @outline METHODS

		UpdateHeight(): this {
			if (!this.IsDestroyed) this.OnUpdateHeight.Fire(this.Components.GetComponentsHeight());
			return this;
		}

		GetMainContainer() {
			return this;
		}

		GetZIndex() {
			return this.UI.ZIndex;
		}

		GetHeight() {
			return this.UI.Size.Y.Offset;
		}

		GetDepth() {
			return 0;
		}

		GetWidth(): number {
			return this.UI.AbsoluteSize.X;
		}

		// @outline LIFECYCLE

		Destroy() {
			if (this.IsDestroyed) return;
			this.IsDestroyed = true;
			this.Components.Destroy();
			this.Janitor.Destroy();
		}
	}

	// @outline FUNCTIONS

	export function DefineComponent(ID: string, Component: UIComponent<GuiObject>) {
		AllComponentPool.set(ID, Component);
	}

	export function GetComponent<T extends keyof T_AllComponents>(ID: string) {
		return AllComponentPool.get(ID) as T_AllComponents[T]["prototype"] | undefined;
	}

	export function IsComponentType<T extends keyof T_AllComponents>(
		Component: UIComponent<GuiObject>,
		Type: T,
	): Component is T_AllComponents[T]["prototype"] {
		return ClassUtils.GetClassFromInstance(Component) === Components.Classes[Type];
	}

	export function CreateComponentContainer(ContentFrame: Frame) {
		return new ComponentContainer(HttpService.GenerateGUID(false), ContentFrame);
	}

	export function Clear() {
		const Components = new Array<UIComponent<GuiObject>>();
		for (const [, Component] of AllComponentPool) Components.push(Component);
		Components.forEach((Component) => Component.Destroy());
		AllComponentPool.clear();
	}
}
