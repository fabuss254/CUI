import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace TabView {
	// @outline TYPES

	export type T_UI = Frame & {
		TabCtn: Frame & {
			UIListLayout: UIListLayout;
			TabFrameSelected: Frame & {
				DecoHighlight: Frame;
				Title: TextLabel;
				WhiteFrame: Frame;
				Interactibility: TextButton;
			};
			TabFrameUnSelected: Frame & {
				DecoHighlight: Frame;
				Title: TextLabel;
				WhiteFrame: Frame;
				Interactibility: TextButton;
			};
		};
		ContentCtn: Frame & {
			ContainerEx: Frame & {
				UIListLayout: UIListLayout;
			};
			UIFlexItem: UIFlexItem;
		};
		UIListLayout: UIListLayout;
	};

	export type T_Props = UIState.T_Props;

	export type T_Header = T_UI["TabCtn"]["TabFrameSelected"];
	export type T_Unselected = T_UI["TabCtn"]["TabFrameUnSelected"];
	export type T_Content = T_UI["ContentCtn"]["ContainerEx"];

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}): T_UI {
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
				<frame
					{...ViewDefaults.Frame}
					Name="TabCtn"
					Size={new UDim2(1, 0, 0, 18)}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					BackgroundTransparency={0.45}
				>
					<uilistlayout
						{...ViewDefaults.UIListLayout}
						Name="UIListLayout"
						FillDirection={Enum.FillDirection.Horizontal}
						Wraps={true}
					/>
					{Header()}
					{Unselected()}
				</frame>
				<frame
					{...ViewDefaults.Frame}
					Name="ContentCtn"
					LayoutOrder={8}
					AnchorPoint={new Vector2(0, 1)}
					Position={UDim2.fromScale(0, 1)}
					BackgroundTransparency={1}
				>
					{Content()}
					<uiflexitem {...ViewDefaults.UIFlexItem} Name="UIFlexItem" />
				</frame>
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
			</frame>
		) as T_UI;
	}

	export function Header(): T_Header {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="TabFrameSelected"
				Size={UDim2.fromOffset(50, 18)}
				ZIndex={10}
				BackgroundColor3={Color3.fromRGB(46, 46, 46)}
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "Dark", _BorderColor3: "Border" })}
			>
				<frame
					{...ViewDefaults.Frame}
					Name="DecoHighlight"
					Size={UDim2.fromScale(1, 0.1)}
					ZIndex={20}
					BackgroundColor3={Color3.fromRGB(53, 181, 255)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "RibbonTabTopBar" })}
				/>
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					ZIndex={30}
					Text={"Camera"}
					action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
				/>
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={800} BackgroundTransparency={1} />
				<textbutton {...ViewDefaults.TextButton} Name="Interactibility" ZIndex={3543456} />
			</frame>
		) as T_Header;
	}

	export function Unselected(): T_Unselected {
		return (
			<frame
				{...ViewDefaults.Frame}
				Name="TabFrameUnSelected"
				Size={UDim2.fromOffset(48, 18)}
				ZIndex={10}
				BackgroundColor3={Color3.fromRGB(64, 64, 64)}
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "Light", _BorderColor3: "Border" })}
			>
				<frame
					{...ViewDefaults.Frame}
					Name="DecoHighlight"
					Size={UDim2.fromScale(1, 0.1)}
					ZIndex={20}
					BackgroundColor3={Color3.fromRGB(53, 53, 53)}
					action={ViewDefaults.Attributes({ _BackgroundColor3: "RibbonTab" })}
				/>
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					ZIndex={30}
					Text={"Object"}
					TextColor3={Color3.fromRGB(170, 170, 170)}
					action={ViewDefaults.Attributes({ _TextColor3: "SubText" })}
				/>
				<frame {...ViewDefaults.Frame} Name="WhiteFrame" ZIndex={800} BackgroundTransparency={1} />
				<textbutton {...ViewDefaults.TextButton} Name="Interactibility" ZIndex={3543456} />
			</frame>
		) as T_Unselected;
	}

	export function Content(): T_Content {
		return (
			<frame {...ViewDefaults.Frame} Name="ContainerEx" BackgroundTransparency={1}>
				<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />
			</frame>
		) as T_Content;
	}
}
