import FloatToolkit from "../index.js";

import { round } from "./round.js";

import { getMaxPrecision } from "../get-precision/getMaxPrecision.js";

/**
 * @internal
 */
export function addArrayItem(total: number, newNumber: number, precision?: FloatToolkit.Precision): number {
	const maxPrecision = precision ?? getMaxPrecision(total, newNumber);
	return round(total + newNumber, maxPrecision);
}
