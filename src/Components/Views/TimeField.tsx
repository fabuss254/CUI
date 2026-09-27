import Vide from "@rbxts/vide";
import { ViewDefaults } from "./Defaults";

export namespace TimeField {
	// @outline TYPES

	export type T_Props = {
		Name: string;
		Title: string;
		Order: number;
		Width: number;
		Value: Vide.Derivable<number>;
		OnChanged: (Value: number) => void;
	};

	// @outline FUNCTIONS

	export function Component(Props: T_Props) {
		const Draft = Vide.source<string>();
		let Box: TextBox | undefined;
		Vide.effect(() => {
			Vide.read(Props.Value);
			Draft(undefined);
		});

		const TopChildren = {
			Title: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="Title"
					Size={UDim2.fromScale(1, 1)}
					ZIndex={9000000}
					Text={Props.Title}
					TextTransparency={0.3}
					TextXAlignment={Enum.TextXAlignment.Center}
					action={ViewDefaults.Attributes({ _TextColor3: "BrightText" })}
				/>
			) as TextLabel,
		};

		const InputChildren = {
			UICorner: (<uicorner {...ViewDefaults.UICorner} Name="UICorner" />) as UICorner,
			Box: (
				<textbox
					{...ViewDefaults.TextBox}
					Name="Box"
					Active={false}
					Selectable={false}
					TextTransparency={0.1}
					ClearTextOnFocus={false}
					Text={() => Draft() ?? string.format(Props.Name === "Year" ? "%04d" : "%02d", Vide.read(Props.Value))}
					TextChanged={(Value) => Draft(Value)}
					Focused={() => {
						if (Box) {
							Box.CursorPosition = Box.Text.size() + 1;
							Box.SelectionStart = 1;
						}
					}}
					FocusLost={() => {
						if (Box) Props.OnChanged(tonumber(Box.Text) ?? 0);
						Draft(undefined);
					}}
					action={(Instance) => {
						Box = Instance;
					}}
				/>
			) as TextBox,
		};

		const BottomChildren = {
			Ctn: (
				<frame
					{...ViewDefaults.Frame}
					Name="Ctn"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.8, 0.8)}
					ZIndex={9000003}
					BackgroundColor3={new Color3()}
					BackgroundTransparency={0.8}
				>
					{InputChildren.UICorner}
					{InputChildren.Box}
				</frame>
			) as Frame & typeof InputChildren,
		};

		const Children = {
			Top: (
				<frame {...ViewDefaults.Frame} Name="Top" Size={UDim2.fromScale(1, 0.4)} BackgroundTransparency={1}>
					{TopChildren.Title}
				</frame>
			) as Frame & typeof TopChildren,
			Bottom: (
				<frame {...ViewDefaults.Frame} Name="Bottom" Size={UDim2.fromScale(1, 0.6)} BackgroundTransparency={1}>
					{BottomChildren.Ctn}
				</frame>
			) as Frame & typeof BottomChildren,
			UIListLayout: (<uilistlayout {...ViewDefaults.UIListLayout} Name="UIListLayout" />) as UIListLayout,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name={Props.Name}
				LayoutOrder={Props.Order}
				Size={new UDim2(0, Props.Width, 1, 0)}
				ZIndex={9000003}
				BackgroundTransparency={1}
			>
				{Children.Top}
				{Children.Bottom}
				{Children.UIListLayout}
			</frame>
		) as Frame & typeof Children;
	}
}
