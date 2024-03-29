import { Precision } from "../index";

import getPrecision from "./getPrecision";

/**
 * @internal
 */
export default function getMaxPrecision(n1: number, n2: number): Precision {
	const n1Precision = getPrecision(n1);
	const n2Precision = getPrecision(n2);

	return Math.max(n1Precision, n2Precision) as Precision;
}
