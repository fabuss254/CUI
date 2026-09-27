import { Field } from "../Field";
import { FieldValueUtils } from "./FieldValueUtils";

export class NumberRangeField extends Field<NumberRange> {
	// @outline PRIVATE_METHODS

	protected TextToValue(Text: string): NumberRange {
		const Parts = FieldValueUtils.SplitNumberText(Text);
		if (Parts.size() === 1) return new NumberRange(Parts[0]);
		if (Parts.size() >= 2) return new NumberRange(math.min(Parts[0], Parts[1]), math.max(Parts[0], Parts[1]));
		return this.GetValue() ?? new NumberRange(0);
	}

	protected ValueToText(Value: NumberRange): string {
		return Value.Min === Value.Max
			? FieldValueUtils.FormatNumber(Value.Min)
			: `${FieldValueUtils.FormatNumber(Value.Min)}, ${FieldValueUtils.FormatNumber(Value.Max)}`;
	}
}
