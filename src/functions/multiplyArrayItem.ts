import { Precision } from "../index";

import precisionsSum from "../get-precision/precisionsSum";
import round from "./round";

/**
 * @internal
 */
export default function multiplyArrayItem(total: number, newNumber: number, precision?: Precision): number {
	const maxPrecision = precision ?? precisionsSum(total, newNumber);
	return round(total * newNumber, maxPrecision);
}
