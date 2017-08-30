import { Operator } from "../Layer"

/**
 * Performs the logistic function.
 * @param x product of (activations vector) * (weights vector)
 */
export let TANH: Operator = (x) => {
    return Math.tanh(x)
}

/**
 * Derivative of the tan h function
 * @param x signal
 */
export let TANH_PRIME: Operator = (x) => {
    return 1 - (Math.tanh(x) ** 2)
}