import { Operator } from "../Layer"

/**
 * Performs the identity function.
 * @param x product of (activations vector) * (weights vector)
 */
export let BENT_IDENTITY: Operator = (x) => {
    let top = Math.sqrt(x ** 2 + 1) - 1
    return top / 2 + x
}

/**
 * Derivative of the identity function.
 * @param x signal
 */
export let BENT_IDENTITY_PRIME: Operator = (x) => {
    let bottom = 2 * Math.sqrt(x ** 2 + 1)
    return x / bottom + 1
}