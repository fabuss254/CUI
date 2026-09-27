import { Field } from "../Field";
import { FieldValueUtils } from "./FieldValueUtils";

export class Vector2Field extends Field<Vector2> {
	// @outline PRIVATE_METHODS

	protected TextToValue(Text: string): Vector2 {
		const Parts = FieldValueUtils.SplitNumberText(Text);
		if (Parts.size() === 1) return Vector2.one.mul(Parts[0]);
		if (Parts.size() >= 2) return new Vector2(Parts[0], Parts[1]);
		return this.GetValue() ?? Vector2.zero;
	}

	protected ValueToText(Value: Vector2): string {
		return `${FieldValueUtils.FormatNumber(Value.X)}, ${FieldValueUtils.FormatNumber(Value.Y)}`;
	}
}
