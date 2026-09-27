import Vide from "@rbxts/vide";
import { Janitor } from "@rbxts/janitor";
import { TimeView } from "./Views/Time";
import type { CUI } from "..";
import { UIComponent } from "./Base";

function TimeToFormattedString(Time: number) {
	return DateTime.fromUnixTimestamp(Time).FormatLocalTime("lll", "en-us");
}

function SetupAutoSelect(TextBox: TextBox, Owner: Janitor) {
	TextBox.ClearTextOnFocus = false;
	Owner.Add(
		TextBox.Focused.Connect(() => {
			TextBox.CursorPosition = TextBox.Text.size() + 1;
			TextBox.SelectionStart = 1;
		}),
		"Disconnect",
	);
}

let ActiveSelector: undefined | Time = undefined;
export class Time extends UIComponent<TimeView.T_UI> {
	// @outline PROPERTIES

	private OnChanged = (NewTime: number) => {};
	private SelectedTime: Vide.Source<number>;

	private IsOpen: Vide.Source<boolean>;

	// @outline CONSTRUCTOR

	constructor(Manager: CUI.ComponentManager, ID: string) {
		const SelectedTime = Vide.source(-1);
		const IsOpen = Vide.source(false);
		super(Manager, ID, (Props) => TimeView.Create({ ...Props, TimeText: () => TimeToFormattedString(SelectedTime()), IsOpen }));
		this.SelectedTime = SelectedTime;
		this.IsOpen = IsOpen;
		this.Janitor.Add(() => {
			if (ActiveSelector === this) ActiveSelector = undefined;
		}, true);

		// On click field, open/close selector
		this.Janitor.Add(
			this.UI.Right.Ctn.Btn.MouseButton1Click.Connect(() => {
				this.SetIsOpen(!Vide.untrack(this.IsOpen));
			}),
			"Disconnect",
		);

		// Setup timestamp box
		const SelectorContent = this.UI.Right.Selector.Ctn.Content;
		SetupAutoSelect(SelectorContent.Top.Left.Timestamp.Box, this.Janitor);
		this.Janitor.Add(
			SelectorContent.Top.Left.Timestamp.Box.FocusLost.Connect((Enter) => {
				const NewTime = tonumber(SelectorContent.Top.Left.Timestamp.Box.Text) ?? 0;
				this.SetTime(NewTime);
				this.OnChanged(Vide.untrack(this.SelectedTime));
			}),
			"Disconnect",
		);

		// Setup time selectors
		const Selectors = {
			Year: SelectorContent.Top.Right.Date.Year.Bottom.Ctn.Box,
			Month: SelectorContent.Top.Right.Date.Month.Bottom.Ctn.Box,
			Day: SelectorContent.Top.Right.Date.Day.Bottom.Ctn.Box,
			Hour: SelectorContent.Top.Right.Time.Hour.Bottom.Ctn.Box,
			Minute: SelectorContent.Top.Right.Time.Minute.Bottom.Ctn.Box,
		};

		for (const [SelectorName, TextBox] of pairs(Selectors)) {
			SetupAutoSelect(TextBox, this.Janitor);
			this.Janitor.Add(
				TextBox.FocusLost.Connect((Enter) => {
					const Year = tonumber(Selectors.Year.Text) ?? 0;
					const Month = tonumber(Selectors.Month.Text) ?? 0;
					const Day = tonumber(Selectors.Day.Text) ?? 0;
					const Hour = tonumber(Selectors.Hour.Text) ?? 0;
					const Minute = tonumber(Selectors.Minute.Text) ?? 0;

					const [Success, NewDateTime] = pcall(() => DateTime.fromLocalTime(Year, Month, Day, Hour, Minute));
					if (!Success) {
						print(`[CUI::Time] Invalid date/time entered: ${Year}-${Month}-${Day} ${Hour}:${Minute}`);
						this.UpdateData();
						return;
					}

					this.SetTime(NewDateTime.UnixTimestamp);
					this.OnChanged(Vide.untrack(this.SelectedTime));
				}),
				"Disconnect",
			);
		}

		// Setup set to now button
		this.Janitor.Add(
			SelectorContent.Top.Left.SetToNow.Btn.MouseButton1Click.Connect(() => {
				this.SetTimeToNow();
				this.OnChanged(Vide.untrack(this.SelectedTime));
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			SelectorContent.Top.Left.SetToNow.Btn.MouseEnter.Connect(() => {
				SelectorContent.Top.Left.SetToNow.Hover.Visible = true;
			}),
			"Disconnect",
		);

		this.Janitor.Add(
			SelectorContent.Top.Left.SetToNow.Btn.MouseLeave.Connect(() => {
				SelectorContent.Top.Left.SetToNow.Hover.Visible = false;
			}),
			"Disconnect",
		);

		// Initial update
		this.SetIsOpen(false);
	}

	// @outline PRIVATE_METHODS

	private UpdateData() {
		const SelectorContent = this.UI.Right.Selector.Ctn.Content;
		if (Vide.untrack(this.IsOpen)) {
			SelectorContent.Top.Left.Timestamp.Box.Text = tostring(Vide.untrack(this.SelectedTime));

			const DateInfo = DateTime.fromUnixTimestamp(Vide.untrack(this.SelectedTime)).ToLocalTime();
			SelectorContent.Top.Right.Date.Year.Bottom.Ctn.Box.Text = string.format("%04d", DateInfo.Year);
			SelectorContent.Top.Right.Date.Month.Bottom.Ctn.Box.Text = string.format("%02d", DateInfo.Month);
			SelectorContent.Top.Right.Date.Day.Bottom.Ctn.Box.Text = string.format("%02d", DateInfo.Day);
			SelectorContent.Top.Right.Time.Hour.Bottom.Ctn.Box.Text = string.format("%02d", DateInfo.Hour);
			SelectorContent.Top.Right.Time.Minute.Bottom.Ctn.Box.Text = string.format("%02d", DateInfo.Minute);
		}
	}

	private UpdateDisplay() {
		this.UpdateData();
	}

	protected UpdateEnabledDisplay(): void {
		const IsEnabled = this.GetEnabled();

		this.UI.Right.Ctn.NonEnabled.Visible = !IsEnabled;
		this.UI.Right.Ctn.TextCtn.TextLabel.TextTransparency = IsEnabled ? 0 : 0.25;
	}

	// @outline METHODS

	SetText(Text: string) {
		this.UI.Left.Title.Text = Text;
		return this;
	}

	SetTime(NewTime: number) {
		NewTime = math.clamp(NewTime, 0, 32503680000); // Year 3000
		this.SelectedTime(NewTime);
		this.UpdateData();
		return this;
	}

	SetTimeToNow() {
		this.SetTime(DateTime.now().UnixTimestamp);
		return this;
	}

	GetTime() {
		return Vide.untrack(this.SelectedTime);
	}

	SetOnChanged(Callback: (NewTime: number) => void) {
		this.OnChanged = Callback;
		return this;
	}

	SetIsOpen(IsOpen: boolean) {
		if (ActiveSelector && ActiveSelector !== this) {
			ActiveSelector.SetIsOpen(false);
		}

		if (!this.GetEnabled()) IsOpen = false;
		this.IsOpen(IsOpen);
		this.UpdateDisplay();

		if (IsOpen) {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			ActiveSelector = this;
		} else if (ActiveSelector === this) {
			ActiveSelector = undefined;
		}
		return this;
	}
}
