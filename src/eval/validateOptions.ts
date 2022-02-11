import { FTOptionLabel } from "../types";

import { defaultOptions } from "../defaultOptions";
import { FTConfigError } from "../errors/FTConfigError";

/**
 * @internal
 */
export function validateOptions(options: any): void {
	if (options == null || typeof options !== "object" || options instanceof Array) throw new TypeError("Argument for 'options' must be an options object.");

	Object.keys(options).forEach((key) => {
		if (!(key in defaultOptions)) throw new FTConfigError(`FloatToolkit does not support the option ${key}.`);

		const optionType = typeof options[key as FTOptionLabel];
		const expectedType = typeof defaultOptions[key as FTOptionLabel];
		if (optionType !== expectedType) throw new FTConfigError(`${key} must be a property of type '${expectedType}'.`);
	});
}