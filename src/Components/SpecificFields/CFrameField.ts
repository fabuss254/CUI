import { Field } from "../Field";
import { FieldValueUtils } from "./FieldValueUtils";

export class CFrameField extends Field<CFrame> {
	// @outline PRIVATE_METHODS

	protected TextToValue(Text: string): CFrame {
		const Parts = FieldValueUtils.SplitNumberText(Text);
		if (Parts.size() === 1) return new CFrame(Vector3.one.mul(Parts[0]));
		if (Parts.size() >= 3 && Parts.size() < 6) return new CFrame(Parts[0], Parts[1], Parts[2]);
		if (Parts.size() >= 6) {
			return new CFrame(Parts[0], Parts[1], Parts[2]).mul(
				CFrame.fromOrientation(math.rad(Parts[3]), math.rad(Parts[4]), math.rad(Parts[5])),
			);
		}

		return this.GetValue() ?? new CFrame();
	}

	protected ValueToText(Value: CFrame): string {
		const [X, Y, Z] = [Value.Position.X, Value.Position.Y, Value.Position.Z];
		const [Rx, Ry, Rz] = Value.ToOrientation();
		return `${FieldValueUtils.FormatNumber(X)}, ${FieldValueUtils.FormatNumber(Y)}, ${FieldValueUtils.FormatNumber(Z)}, ${FieldValueUtils.FormatNumber(math.deg(Rx))}, ${FieldValueUtils.FormatNumber(math.deg(Ry))}, ${FieldValueUtils.FormatNumber(math.deg(Rz))}`;
	}
}
