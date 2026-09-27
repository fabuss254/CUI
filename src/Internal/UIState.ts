export namespace UIState {
	/** Private view inputs supplied by component classes, not consumer-facing state. */
	export type T_Props = {
		Enabled?: () => boolean;
		Visible?: () => boolean | undefined;
		Size?: () => UDim2 | undefined;
		BackgroundColor3?: () => Color3 | undefined;
		BackgroundTransparency?: () => number | undefined;
		LayoutOrder?: () => number | undefined;
	};
}
