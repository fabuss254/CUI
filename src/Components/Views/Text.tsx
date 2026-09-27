import Vide from "@rbxts/vide";
import type { UIState } from "../../Internal/UIState";
import { ViewDefaults } from "./Defaults";

export namespace TextView {
	// @outline TYPES

	export type T_Props = UIState.T_Props & {
		Text?: Vide.Derivable<string>;
		RichText?: Vide.Derivable<boolean>;
		AutoResize?: Vide.Derivable<boolean>;
		TextColor?: Vide.Derivable<Color3>;
		TextSize?: Vide.Derivable<number>;
		TextXAlignment?: Vide.Derivable<Enum.TextXAlignment>;
		TextYAlignment?: Vide.Derivable<Enum.TextYAlignment>;
		FontWeight?: Vide.Derivable<Enum.FontWeight>;
		OnHeightChanged?: (Height: number) => void;
	};

	// @outline FUNCTIONS

	export function Create(Props: T_Props = {}) {
		const Width = Vide.source(0);
		const Text = () => Vide.read(Props.Text ?? "Exporting");
		const FontFace = Vide.derive(
			() =>
				new Font(
					"rbxasset://fonts/families/SourceSansPro.json",
					Vide.read(Props.FontWeight ?? Enum.FontWeight.Regular),
					Enum.FontStyle.Normal,
				),
		);
		let PendingTask: thread | undefined;
		let PendingBounds: GetTextBoundsParams | undefined;
		let Revision = 0;
		const CancelMeasurement = () => {
			if (PendingTask) task.cancel(PendingTask);
			PendingTask = undefined;
			PendingBounds?.Destroy();
			PendingBounds = undefined;
		};
		Vide.cleanup(CancelMeasurement);
		Vide.effect(() => {
			const CurrentRevision = ++Revision;
			CancelMeasurement();
			if (!Vide.read(Props.AutoResize ?? false)) return;
			const CurrentWidth = Width();
			const CurrentText = Text();
			const CurrentFont = FontFace();
			const CurrentSize = Vide.read(Props.TextSize ?? 14);
			Vide.read(Props.RichText ?? false);
			if (CurrentWidth <= 0) return;
			PendingTask = task.defer(() => {
				const Bounds = new Instance("GetTextBoundsParams");
				PendingBounds = Bounds;
				Bounds.Width = CurrentWidth + 6;
				Bounds.Text = CurrentText;
				Bounds.Font = CurrentFont;
				Bounds.Size = CurrentSize;
				const Size = game.GetService("TextService").GetTextBoundsAsync(Bounds);
				Bounds.Destroy();
				PendingBounds = undefined;
				PendingTask = undefined;
				if (Revision === CurrentRevision) Props.OnHeightChanged?.(Size.Y + 4);
			});
		});

		const Children = {
			TextLabel: (
				<textlabel
					{...ViewDefaults.TextLabel}
					Name="TextLabel"
					Size={new UDim2(1, -6, 1, -2)}
					BackgroundColor3={Color3.fromRGB(136, 255, 0)}
					FontFace={FontFace}
					RichText={() => Vide.read(Props.RichText ?? false)}
					TextSize={() => Vide.read(Props.TextSize ?? 14)}
					TextXAlignment={() => Vide.read(Props.TextXAlignment ?? Enum.TextXAlignment.Left)}
					TextYAlignment={() => Vide.read(Props.TextYAlignment ?? Enum.TextYAlignment.Center)}
					TextColor3={() => Vide.read(Props.TextColor ?? Color3.fromRGB(218, 218, 218))}
					TextWrapped={true}
					action={ViewDefaults.Attributes({ _TextColor3: "TitlebarText" })}
					Text={Text}
				/>
			) as TextLabel,
		};

		return (
			<frame
				{...ViewDefaults.Frame}
				Name="Text"
				AbsoluteSizeChanged={(Size) => Width(Size.X)}
				BorderColor3={Color3.fromRGB(34, 34, 34)}
				BorderSizePixel={1}
				BorderMode={Enum.BorderMode.Inset}
				action={ViewDefaults.Attributes({ _BackgroundColor3: "CategoryItem", _BorderColor3: "Border" })}
				Visible={() => Props.Visible?.() ?? false}
				Size={() => Props.Size?.() ?? new UDim2(1, 0, 0, 18)}
				BackgroundColor3={() => Props.BackgroundColor3?.() ?? Color3.fromRGB(53, 53, 53)}
				BackgroundTransparency={() => Props.BackgroundTransparency?.() ?? 1}
				LayoutOrder={() => Props.LayoutOrder?.() ?? 0}
			>
				{Children.TextLabel}
			</frame>
		) as Frame & typeof Children;
	}
}
