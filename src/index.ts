import PackageJSON from "../package.json";

import { _Precision, precisionRange } from "./Precision";
import defaultOptions from "./defaultOptions";
import versionNumbers from "./versionNumbers";

import isValidPrecision from "./eval/isValidPrecision";
import validateOptions from "./eval/validateOptions";

import round from "./functions/round";
import add from "./functions/add";
import subtract from "./functions/subtract";
import multiply from "./functions/multiply";
import divide from "./functions/divide";

/**
 * A FloatToolkit contains methods to round floats and perform accurate math operations with them.
 * Its behavior can be configured to cover the program's needs.
 */
class FloatToolkit {
	/**
	 * @param defaultPrecision The precision (number of decimals) to use if not specified in the function itself. Can be changed later. Default value if 10.
	 * @param options An optional configuration object.
	 *
	 * @example
	 * import FloatToolkit from "@float-toolkit/core";
	 * const ft = new FloatToolkit(10, { forceUseDefaultPrecision: true });
	 */
	constructor(defaultPrecision: FloatToolkit.Precision = 10, options: Partial<FloatToolkit.Options> = {}) {
		this.defaultPrecision = defaultPrecision;
		this.resetOptions(options);
	}

	/**
	 * @internal
	 */
	#precision: FloatToolkit.Precision = 10;

	/**
	 * @internal
	 */
	#options: FloatToolkit.Options = defaultOptions;

	/**
	 * An integer between 1 and 17.
	 * Defines the precision (number of decimals) to use by default, if the precision is not specified in the function itself.
	 */
	get defaultPrecision(): FloatToolkit.Precision {
		return this.#precision;
	}

	set defaultPrecision(precision: FloatToolkit.Precision) {
		if (!isValidPrecision(precision))
			throw new TypeError(`defaultPrecision must be an integer between ${precisionRange.min} and ${precisionRange.max}.`);

		this.#precision = precision;
	}

	/**
	 * The options object for this FloatToolkit.
	 */
	get options(): Readonly<FloatToolkit.Options> {
		return Object.freeze(this.#options);
	}

	/**
	 * Changes the values in the options object for this FloatToolkit and returns the new object.
	 *
	 * @param options The configuration object that contains the new options to apply.
	 * @returns The new options object.
	 *
	 * @example
	 * ft.setOptions({ forceUseDefaultPrecision: true }); // Previous options with forceUseDefaultPrecision set to true.
	 */
	setOptions(options: Partial<FloatToolkit.Options>): Readonly<FloatToolkit.Options> {
		validateOptions(options);

		this.#options = { ...this.#options, ...options };
		return this.options;
	}

	/**
	 * Resets the options object for this FloatToolkit to its default values and returns the new object.
	 *
	 * @param options An optional configuration object containing new options to apply after resetting.
	 * @returns The new options object.
	 *
	 * @example
	 * ft.resetOptions({ forceUseDefaultPrecision: true }); // Default options with forceUseDefaultPrecision set to true.
	 */
	resetOptions(options: Partial<FloatToolkit.Options> = {}): Readonly<FloatToolkit.Options> {
		validateOptions(options);

		this.#options = { ...defaultOptions, ...options };
		return this.options;
	}

	/**
	 * @internal
	 */
	#choosePrecision(precisionParam?: FloatToolkit.Precision): FloatToolkit.Precision | undefined {
		if (!precisionParam && this.options.forceUseDefaultPrecision) return this.defaultPrecision;

		return precisionParam;
	}

	/**
	 * Rounds a number to the specified precision, or to the FloatToolkit's default precision.
	 *
	 * @param n The number to round.
	 * @param precision	The precision to use. If not specified, the FloatToolkit's default precision is used instead.
	 * @returns The rounded number.
	 *
	 * @example
	 * ft.round(0.1 + 0.2); // 0.3 if the precision is set to 16 or lower.
	 */
	round(n: number, precision = this.defaultPrecision): number {
		return round(n, precision);
	}

	/**
	 * Adds two or more numbers, and rounds the sum.
	 *
	 * **NOTE:** By default, this method does not use the FloatToolkit's default precision. Instead, it calculates the best precision to use based on the original
	 * numbers (dynamic precision). To always use the default precision, set the `forceUseDefaultPrecision` option to `true`.
	 *
	 * @param numbers The numbers to add.
	 * @param precision The precision to use instead of the one chosen by the function.
	 * @returns The rounded sum
	 *
	 * @example
	 * ft.add([0.1, 0.2]); // 0.3 if using dynamic precision, or if the precision is set to 16 or lower.
	 */
	add(numbers: number[], precision?: FloatToolkit.Precision): number {
		precision = this.#choosePrecision(precision);

		return add(numbers, precision);
	}

	/**
	 * Subtracts two or more numbers (starting with the second number, all of the numbers are subtracted from the first one), and rounds the difference.
	 *
	 * **NOTE:** By default, this method does not use the FloatToolkit's default precision. Instead, it calculates the best precision to use based on the original
	 * numbers (dynamic precision). To always use the default precision, set the `forceUseDefaultPrecision` option to `true`.
	 *
	 * @param numbers The numbers to subtract.
	 * @param precision The precision to use instead of the one chosen by the function.
	 * @returns The rounded difference
	 *
	 * @example
	 * ft.subtract([0.8, 0.1, 0.3]); // 0.4 if using dynamic precision, or if the precision is set to 15 or lower.
	 */
	subtract(numbers: number[], precision?: FloatToolkit.Precision): number {
		precision = this.#choosePrecision(precision);

		return subtract(numbers, precision);
	}

	/**
	 * Multiplies two or more numbers, and rounds the product.
	 *
	 * **NOTE:** By default, this method does not use the FloatToolkit's default precision. Instead, it calculates the best precision to use based on the original
	 * numbers (dynamic precision). To always use the default precision, set the `forceUseDefaultPrecision` option to `true`.
	 *
	 * @param numbers The numbers to multiply.
	 * @param precision The precision to use instead of the one chosen by the function.
	 * @returns The rounded product
	 *
	 * @example
	 * ft.multiply([0.1, 0.9]); // 0.09 if using dynamic precision, or if the precision is set to 16 or lower.
	 */
	multiply(numbers: number[], precision?: FloatToolkit.Precision): number {
		precision = this.#choosePrecision(precision);

		return multiply(numbers, precision);
	}

	/**
	 * Divides two or more numbers (starting with the second number, all of the numbers divide the first one), and rounds the result.
	 *
	 * @param numbers The numbers to divide.
	 * @param precision The precision to use instead of the one chosen by the function.
	 * @returns The rounded result
	 *
	 * @example
	 * ft.divide([0.09, 0.9]); // 0.1 if the precision is set to 16 or lower.
	 */
	divide(numbers: number[], precision = this.defaultPrecision): number {
		return divide(numbers, precision);
	}
}

namespace FloatToolkit {
	/**
	 * An integer between 1 and 17, which can be used as a FloatToolkit's default precision.
	 */
	export type Precision = _Precision;

	/**
	 * Options that can be set to a FloatToolkit to modify its behavior.
	 */
	export interface Options {
		/**
		 * Always use the FloatToolkit's default precision instead of dynamic precision.
		 */
		forceUseDefaultPrecision: boolean;
	}

	/**
	 * @internal
	 */
	export type OptionLabel = keyof Options;

	/**
	 * @internal
	 */
	export type FirstNumberExtractedArray = [number | undefined, number[]];

	/**
	 * An object containing the package version.
	 */
	export interface Version {
		/**
		 * The full version number (M.m.P)
		 */
		get full(): string;

		/**
		 * The major version (first number)
		 */
		get major(): string;

		/**
		 * The minor version (second number)
		 */
		get minor(): string;

		/**
		 * The patch version (third number)
		 */
		get patch(): string;
	}

	/**
	 * Contains the package's major, minor and patch version numbers.
	 */
	export const VERSION: Version = {
		get full() {
			return PackageJSON.version;
		},

		get major() {
			return versionNumbers[0]!;
		},

		get minor() {
			return versionNumbers[1]!;
		},

		get patch() {
			return versionNumbers[2]!;
		},
	};
}

export = FloatToolkit;
