import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";
import { TabHeaderView } from "./TabHeader";
import { TabContentView } from "./TabContent";

export namespace TabView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Tabs?: Vide.Derivable<ReadonlyArray<{ Name: string }>>;
		Selected?: Vide.Derivable<string>;
		HeaderHeight?: Vide.Derivable<number>;
		OnSelected?: (Name: string) => void;
		OnHeaderHeightChanged?: (Height: number) => void;
		OnContentCreated?: (Name: string, Content: Frame) => () => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const Tabs = Vide.values(
			() => Vide.read(Props.Tabs ?? []),
			(Tab, Index) => {
				const Selected = () => Vide.read(Props.Selected ?? "") === Tab.Name;
				const Header = TabHeaderView.Create({
					Name: Tab.Name,
					Selected,
					LayoutOrder: Index,
					OnSelected: () => Props.OnSelected?.(Tab.Name),
				});
				const Content = TabContentView.Create({ Name: Tab.Name, Visible: Selected });
				const Cleanup = Props.OnContentCreated?.(Tab.Name, Content);
				if (Cleanup) Vide.cleanup(Cleanup);
				return { Header, Content };
			},
		);
		const TabChildren = {
			UIListLayout: (
				<uilistlayout
					{...ViewDefaults.UIListLayout}
					Name="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					Wraps={true}
					AbsoluteContentSizeChanged={(Size) => Props.OnHeaderHeightChanged?.(Size.Y)}
				/>
			) as UIListLayout,
		};
		const ContentChildren = {
			UIFlexItem: (<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />) as UIFlexItem,
		};
		const Children = {
			TabCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="TabCtn"
					Size={() => new UDim2(1, 0, 0, Vide.read(Props.HeaderHeight ?? 18))}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.45}
				>
					{TabChildren.UIListLayout}
					{() => Tabs().map((Tab) => Tab.Header)}
				</frame>
			) as Frame & typeof TabChildren,
			ContentCtn: (
				<frame
					{...ViewDefaults.Frame}
					Name="ContentCtn"
					LayoutOrder={8}
					AnchorPoint={new Vector2(0, 1)}
					Position={UDim2.fromScale(0, 1)}
					BackgroundTransparency={1}
				>
					{() => Tabs().map((Tab) => Tab.Content)}
					{ContentChildren.UIFlexItem}
				</frame>
			) as Frame & typeof ContentChildren,
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
		};
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Tab"
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 100)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(53, 53, 53)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 0}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children.TabCtn}
				{Children.ContentCtn}
				{Children.UIListLayout}
			</frame>
		) as Frame & typeof Children;
	}
}
