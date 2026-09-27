import Vide from "@rbxts/vide";
import { TextView } from "./Views/Text";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Text extends UIComponent<ReturnType<typeof TextView.Create>> {
	// @outline PROPERTIES

	private readonly State;
	private TextRevision = 0;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const State = {
			Text: Vide.source("Exporting"),
			RichText: Vide.source(false),
			AutoResize: Vide.source(false),
			TextColor: Vide.source(Color3.fromRGB(218, 218, 218)),
			TextSize: Vide.source(14),
			TextXAlignment: Vide.source<Enum.TextXAlignment>(Enum.TextXAlignment.Left),
			TextYAlignment: Vide.source<Enum.TextYAlignment>(Enum.TextYAlignment.Center),
			FontWeight: Vide.source<Enum.FontWeight>(Enum.FontWeight.Regular),
		};
		super(Manager, ID, (Props) =>
			TextView.Create({
				...Props,
				...State,
				OnHeightChanged: (Height) => {
					this.SetRootSize(new UDim2(1, 0, 0, Height));
					this.UpdateParentHeight();
				},
			}),
		);
		this.State = State;
	}

	// @outline METHODS

	SetRichTextEnabled(Enabled: boolean) {
		if (this.Destroyed) return this;
		this.State.RichText(Enabled);
		return this;
	}

	SetAutoResize(DoResize: boolean) {
		if (this.Destroyed) return this;
		this.State.AutoResize(DoResize);
		return this;
	}

	SetTextColor(NewTextColor: Color3) {
		if (this.Destroyed) return this;
		this.State.TextColor(NewTextColor);
		return this;
	}

	SetText(NewText: string | Promise<string>) {
		if (this.Destroyed) return this;
		const Revision = ++this.TextRevision;
		if (typeIs(NewText, "table")) {
			this.State.Text("<LOADING>");
			this.Janitor.AddPromise(
				NewText.then((Text) => {
					if (!this.IsDestroyed() && this.TextRevision === Revision) this.State.Text(Text);
				}).catch(() => {
					if (!this.IsDestroyed() && this.TextRevision === Revision) this.State.Text("<ERROR>");
				}),
			);
			return this;
		}
		this.State.Text(NewText);
		return this;
	}

	SetYSize(Size: number) {
		if (this.Destroyed) return this;
		Vide.batch(() => {
			this.State.AutoResize(false);
			this.SetRootSize(new UDim2(1, 0, 0, Size));
		});
		return this;
	}

	SetTextSize(Size: number) {
		if (this.Destroyed) return this;
		this.State.TextSize(Size);
		return this;
	}

	SetTextXAlignment(Alignment: Enum.TextXAlignment) {
		if (this.Destroyed) return this;
		this.State.TextXAlignment(Alignment);
		return this;
	}

	SetTextYAlignment(Alignment: Enum.TextYAlignment) {
		if (this.Destroyed) return this;
		this.State.TextYAlignment(Alignment);
		return this;
	}

	SetFontWeight(Weight: Enum.FontWeight) {
		if (this.Destroyed) return this;
		this.State.FontWeight(Weight);
		return this;
	}
}
