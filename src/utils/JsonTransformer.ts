/**
 * A function used to transform a value during JSON.stringify.
 */
export type ReplacerFn = (key: string, value: unknown) => unknown;

/**
 * A function used to transform a value during JSON.parse.
 */
export type ReviverFn = (key: string, value: unknown) => unknown;

/**
 * Combines multiple replacer functions into one.
 * The functions are applied in order so that later replacers receive the output of earlier ones.
 *
 * @param replacers - An array of replacer functions.
 * @returns A combined replacer function.
 */
export function combineReplacers(...replacers: ReplacerFn[]): ReplacerFn {
    return (key: string, value: unknown): unknown =>
        replacers.reduce((currentValue, replacer) => replacer(key, currentValue), value);
}

/**
 * Combines multiple reviver functions into one.
 * The functions are applied in order so that later revivers receive the output of earlier ones.
 *
 * @param revivers - An array of reviver functions.
 * @returns A combined reviver function.
 */
export function combineRevivers(...revivers: ReviverFn[]): ReviverFn {
    return (key: string, value: unknown): unknown =>
        revivers.reduce((currentValue, reviver) => reviver(key, currentValue), value);
}

/**
 * A replacer function that converts BigInt values to a string with a trailing "n".
 * For example, 123456789n becomes "123456789n".
 *
 * @param key - The key of the property.
 * @param value - The value to be processed.
 * @returns The processed value.
 */
export function bigIntReplacer(key: string, value: unknown): unknown {
    return typeof value === "bigint" ? `${value.toString()}n` : value;
}

/**
 * A reviver function that converts strings ending with "n" back into BigInt values.
 * For example, "123456789n" becomes 123456789n.
 *
 * @param key - The key of the property.
 * @param value - The value to be processed.
 * @returns The processed value.
 */
export function bigIntReviver(key: string, value: unknown): unknown {
    return typeof value === "string" && /^\d+n$/.test(value)
        ? BigInt(value.slice(0, -1))
        : value;
}

/**
 * The default replacer function that combines all specialized replacers.
 * Add additional replacer functions to the combineReplacers call if needed.
 */
export const defaultReplacer: ReplacerFn = combineReplacers(
    bigIntReplacer
    // , otherReplacerFn, etc.
);

/**
 * The default reviver function that combines all specialized revivers.
 * Add additional reviver functions to the combineRevivers call if needed.
 */
export const defaultReviver: ReviverFn = combineRevivers(
    bigIntReviver
    // , otherReviverFn, etc.
);
