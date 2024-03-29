import throwNumbersError from "../errors/throwNumbersError";
import isNumbersArray from "./isNumbersArray";

/**
 * @internal
 */
export default function validateNumbersArray(numbers: any): void {
	if (!numbers) throw new Error("Argument for 'numbers' was not provided.");
	if (!isNumbersArray(numbers)) throwNumbersError();
}
