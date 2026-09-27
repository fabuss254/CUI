import type { CUI } from "..";
import { BigDropdown } from "./BigDropdown";
import { Box } from "./Box";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Color } from "./Color";
import { Dropdown } from "./Dropdown";
import { Expandable } from "./Expandable";
import { Field as FieldBase } from "./Field";
import { Graph } from "./Graph";
import { Image } from "./Image";
import { List } from "./List";
import { RichtextEditor } from "./RichtextEditor";
import { Separator } from "./Separator";
import { SequenceEditor } from "./SequenceEditor";
import { Slider } from "./Slider";
import { Split } from "./Split";
import { Tab } from "./Tab";
import { Text } from "./Text";
import { Time } from "./Time";
import { Title } from "./Title";
import { Viewport } from "./Viewport";
import { CFrameField } from "./SpecificFields/CFrameField";
import { NumberField } from "./SpecificFields/NumberField";
import { NumberRangeField } from "./SpecificFields/NumberRangeField";
import { Vector2Field } from "./SpecificFields/Vector2Field";
import { Vector3Field } from "./SpecificFields/Vector3Field";

export namespace Components {
	const Field = FieldBase as {
		new (Manager: CUI.ComponentManager, ID: string): FieldBase<string>;
		prototype: FieldBase<string>;
	};

	export const Classes = {
		Box,
		Button,
		Checkbox,
		Dropdown,
		BigDropdown,
		Field,
		NumberField,
		NumberRangeField,
		Vector2Field,
		Vector3Field,
		CFrameField,
		List,
		Slider,
		Split,
		Tab,
		Text,
		Title,
		Viewport,
		Graph,
		SequenceEditor,
		Color,
		Image,
		Separator,
		Expandable,
		RichtextEditor,
		Time,
	};
}
