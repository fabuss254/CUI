export namespace FieldValueUtils {
	// @outline FUNCTIONS

	export function FormatNumber(Value: number) {
		return tostring(math.round(Value * 1000) / 1000);
	}

	export function SplitNumberText(Text: string) {
		const Parts: number[] = [];

		Text.gsub("%s+", "")[0]
			.split(",")
			.forEach((Part) => {
				const Value = tonumber(Part);
				if (Value !== undefined) Parts.push(Value);
			});

		return Parts;
	}
}
