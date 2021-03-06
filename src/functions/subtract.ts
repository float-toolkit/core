import FloatToolkit from "../index.js";

import { extractFirstNumber } from "./extractFirstNumber.js";
import { addArrayItem } from "./addArrayItem.js";

import { validateNumbersArray } from "../eval/validateNumbersArray.js";

/**
 * @internal
 */
export function subtract(numbers: number[], precision?: FloatToolkit.Precision): number {
	validateNumbersArray(numbers);

	const [firstNumber, newNumbers] = extractFirstNumber(numbers);
	return newNumbers.reduce((total, newNumber) => addArrayItem(total, -newNumber, precision), firstNumber ?? 0);
}
