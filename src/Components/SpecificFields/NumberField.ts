import { Field } from "../Field";
import { FieldValueUtils } from "./FieldValueUtils";

export class NumberField extends Field<number> {
	// @outline PRIVATE_METHODS

	protected TextToValue(Text: string): number {
		return tonumber(Text) ?? this.GetValue() ?? 0;
	}

	protected ValueToText(Value: number): string {
		return FieldValueUtils.FormatNumber(Value);
	}
}
