import * as linear from "vectorious"

export function create<T extends Layer>(object: T, weights: linear.Matrix): T {
    (<any>object).weights = weights
    return object
}

export type Operator = (x: number) => number
export class LayerException extends Error {}

export class Layer {
    private inputs: number
    private outputs: number
    protected weights: linear.Matrix
    private h: Operator = (x) => { return x }
    private d: Operator = (x) => { return 1 }

    /**
     * Constructs the layer object.
     * @param inputs number.
     * @param outputs number.
     * @param hypothesis used when activating.
     * @param derivative used during backprop.
     */
    public constructor(inputs: number, outputs: number, h?: Operator, d?: Operator) {
        this.inputs = inputs
        this.createWeights(outputs)

        if (h) this.h = h
        if (d) this.d = d
    }

    /**
     * Generates random weights based on the number of outputs.
     * @param outputs the number of outputs this layer produces.
     */
    public createWeights(outputs: number) {
        this.outputs = outputs
        this.weights = linear.Matrix.random(this.inputs + 1, outputs)
    }

    /** Gets the number of neurons at this layer. */
    public get length(): number {
        return this.inputs
    }

    /**
     * Returns the result of a projection for this layer.
     * @param activations to be applied on the layer.
     */
    public forward(activations: linear.Matrix): linear.Matrix {
        if (activations.shape[0] != 1 || activations.shape[1] != this.inputs)
            throw new LayerException(`shape does not match; expected [1,${this.inputs}], actual [${activations.shape}]`)

        activations = new linear.Matrix([[1].concat(activations.toArray()[0])])
        console.dir(activations.toArray())
        console.dir(this.weights.toArray())
        return activations.multiply(this.weights).map(this.h)
    }

    public backward(actual: linear.Matrix, expected: linear.Matrix) {
        
    }

}