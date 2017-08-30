import { Operator } from "../Layer"

/**
 * Performs the identity function.
 * @param x product of (activations vector) * (weights vector)
 */
export let IDENTITY: Operator = (x) => {
    return x
}

/**
 * Derivative of the identity function.
 * @param x signal
 */
export let IDENTITY_PRIME: Operator = (x) => {
    return 1
}