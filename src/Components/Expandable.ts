import { Janitor } from "@rbxts/janitor";
import { ExpandableView } from "./Views/Expandable";
import type { CUI } from "..";
import { UIComponent } from "./Base";

export class Expandable extends UIComponent<ExpandableView.T_UI> {
	// @outline PROPERTIES

	private TweenJanitor = new Janitor<{ Content: Tween; Icon: Tween }>();

	private TextRatio = this.UI.Top.Ctn.TextLabel.TextSize / this.UI.Size.Y.Offset;
	private OnExpanded = (IsExpanded: boolean, IsUserInput?: boolean) => {};

	private Expanded = false;
	private ContentHeight = 0;
	private SizeY = 22;

	Components = this.Manager.CreateChildManager(this.UI.Content.InnerContent.DeepContent, this);

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		super(Manager, ID, ExpandableView.Create);
		this.Janitor.Add(this.Components, "Destroy");
		this.Janitor.Add(this.TweenJanitor, "Destroy");

		// Setup the component's base
		this.SetRootSize(new UDim2(1, 0, 0, this.SizeY));
		this.UI.Top.Ctn.TextLabel.TextSize = this.SizeY * this.TextRatio;
		this.UI.Content.Position = new UDim2(0, 0, 0, this.SizeY);

		// Setup the interactions
		this.Janitor.Add(
			this.UI.Content.GetPropertyChangedSignal("Size").Connect(() => {
				this.UpdateInternalSize();
				this.UpdateParentHeight();

				this.UI.Content.Visible = this.UI.Content.Size.Y.Offset > 0;
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Top.Interactibility.MouseButton1Click.Connect(() => {
				this.SetExpanded(!this.IsExpanded(), true);
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Top.Interactibility.MouseEnter.Connect(() => {
				this.UI.Top.WhiteFrame.Visible = true;
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			this.UI.Top.Interactibility.MouseLeave.Connect(() => {
				this.UI.Top.WhiteFrame.Visible = false;
			}),
			"Disconnect",
		);
	}

	// @outline PRIVATE_METHODS

	private UpdateInternalSize() {
		this.SetRootSize(new UDim2(1, 0, 0, this.SizeY + this.UI.Content.Size.Y.Offset));
	}

	// @outline METHODS

	SetSizeY(SizeY: number) {
		this.SizeY = SizeY;

		this.SetRootSize(new UDim2(1, 0, 0, this.SizeY + this.UI.Content.Size.Y.Offset));
		this.UI.Top.Ctn.TextLabel.TextSize = this.SizeY * this.TextRatio;
		this.UI.Content.Position = new UDim2(0, 0, 0, this.SizeY);
	}

	SetText(Text: string) {
		this.UI.Top.Ctn.TextLabel.Text = Text;
		return this;
	}

	SetExpanded(IsExpanded: boolean, IsUserInput?: boolean, SkipAnimation?: boolean): this {
		this.Expanded = IsExpanded;
		this.OnExpanded(this.Expanded, IsUserInput);

		this.TweenJanitor.Add(
			game
				.GetService("TweenService")
				.Create(this.UI.Content, new TweenInfo(SkipAnimation ? 0 : 0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
					Size: new UDim2(1, 0, 0, this.Expanded ? this.ContentHeight : 0),
				}),
			"Destroy",
			"Content",
		).Play();

		this.TweenJanitor.Add(
			game
				.GetService("TweenService")
				.Create(
					this.UI.Top.Ctn.Icon.Logo,
					new TweenInfo(SkipAnimation ? 0 : 0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
					{
						Rotation: this.Expanded ? 90 : 180,
					},
				),
			"Destroy",
			"Icon",
		).Play();

		return this;
	}

	IsExpanded(): boolean {
		return this.Expanded;
	}

	BindOnExpanded(OnExpanded: (IsExpanded: boolean, IsUserInput?: boolean) => void) {
		this.OnExpanded = OnExpanded;
		return this;
	}

	UpdateHeight(IsGlobal?: boolean): this {
		if (this.Destroyed) return this;
		if (!this.UI.Parent) return this;

		this.ContentHeight = this.Components.GetComponentsHeight();
		if (this.IsExpanded()) {
			this.TweenJanitor.Add(
				game.GetService("TweenService").Create(this.UI.Content, new TweenInfo(0, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
					Size: new UDim2(1, 0, 0, this.ContentHeight),
				}),
				"Destroy",
				"Content",
			).Play();
		}

		return super.UpdateHeight(IsGlobal);
	}

	SetBackgroundColor(Color: Color3) {
		super.SetBackgroundColor(Color);
		this.UI.Top.Ctn.BackgroundColor3 = Color;

		return this;
	}
}
