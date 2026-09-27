export namespace Richtext {
	// @outline FUNCTIONS

	export function TextToColor(Text: string): Color3 | undefined {
		const SingleNumber = tonumber(Text);
		if (SingleNumber !== undefined) return Color3.fromRGB(SingleNumber, SingleNumber, SingleNumber);

		if (Text.find(",")[0] !== undefined) {
			const [R, G, B] = Text.split(",").map((Value) => tonumber(Value) ?? 0);
			return Color3.fromRGB(R, G, B);
		}

		const [Success, Color] = pcall(() => Color3.fromHex(Text));
		if (Success) return Color;
		return undefined;
	}
}
