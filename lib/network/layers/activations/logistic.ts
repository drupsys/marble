import { Operator } from "../Layer"

/**
 * Performs the logistic function.
 * @param x product of (activations vector) * (weights vector)
 */
export let LOGISTIC: Operator = (x) => {
    return 1 / (1 + Math.exp(-x))
}

/**
 * Derivative of the logistic function
 * @param x signal
 */
export let LOGISTIC_PRIME: Operator = (x) => {
    x = LOGISTIC(x)
    return x * (1 - x)
}