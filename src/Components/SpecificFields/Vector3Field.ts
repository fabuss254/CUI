import { Field } from "../Field";
import { FieldValueUtils } from "./FieldValueUtils";

export class Vector3Field extends Field<Vector3> {
	// @outline PRIVATE_METHODS

	protected TextToValue(Text: string): Vector3 {
		const Parts = FieldValueUtils.SplitNumberText(Text);
		if (Parts.size() === 1) return Vector3.one.mul(Parts[0]);
		if (Parts.size() >= 3) return new Vector3(Parts[0], Parts[1], Parts[2]);
		return this.GetValue() ?? Vector3.zero;
	}

	protected ValueToText(Value: Vector3): string {
		return `${FieldValueUtils.FormatNumber(Value.X)}, ${FieldValueUtils.FormatNumber(Value.Y)}, ${FieldValueUtils.FormatNumber(Value.Z)}`;
	}
}
