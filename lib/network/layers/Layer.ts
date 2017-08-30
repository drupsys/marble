import * as linear from "vectorious"
import * as layer from "./"

export function create<T extends Layer>(object: T, bias: number[][], weights: number[][]): T {
    (<any>object).pBias = new linear.Matrix(bias);
    (<any>object).pWeights = new linear.Matrix(weights);
    return object
}

export type Operator = (x: number) => number
export class LayerException extends Error {}

export class Layer {
    private inputCount: number
    private outputCount: number
    private pBias: linear.Matrix
    private pWeights: linear.Matrix
    private h: Operator
    private d: Operator

    private pSignal: linear.Matrix
    private pHypothesis: linear.Matrix

    /**
     * Constructs the layer object.
     * @param inputs number.
     * @param outputs number.
     * @param hypothesis used when activating.
     * @param derivative used during backprop.
     */
    public constructor(inputs: number, outputs: number, h?: Operator, d?: Operator) {
        this.inputCount = inputs
        this.createWeights(outputs)

        this.h = h ? h : layer.IDENTITY
        this.d = d ? d : layer.IDENTITY_PRIME
    }

    /**
     * Generates random weights based on the number of outputs.
     * @param outputs the number of outputs this layer produces.
     */
    public createWeights(outputs: number) {
        this.outputCount = outputs
        this.pWeights = linear.Matrix.random(this.inputCount, outputs)
        this.pBias = linear.Matrix.random(1, outputs)
    }

    /** Gets the number of neurons at this layer. */
    public get length(): number {
        return this.inputCount
    }

    public get derivative(): Operator {
        return this.d
    }

    public get signal(): linear.Matrix {
        return this.pSignal
    }

    public get hypothesis(): linear.Matrix {
        return this.pHypothesis
    }

    public get weights(): linear.Matrix {
        return this.pWeights
    }

    /**
     * Returns the result of a projection for this layer.
     * @param activations to be applied on the layer.
     */
    public forward(activations: linear.Matrix, training: boolean): linear.Matrix {
        if (activations.shape[0] != 1 || activations.shape[1] != this.inputCount)
            throw new LayerException(`shape does not match; expected [1,${this.inputCount}], actual [${activations.shape}]`)

        activations = activations.multiply(this.pWeights).add(this.pBias)
        // console.dir(activations.toArray())
        // console.dir(this.weights.toArray())

        let out = activations.map(this.h)
        
        if (training) {
            this.pSignal = activations
            this.pHypothesis = out
        }

        return out
    }

    public apply(change: linear.Matrix, scale: number) {
        // console.dir(this.weights.toArray())
        // console.dir(change.toArray())
        change = change.scale(scale).multiply(this.weights.T)
        this.weights.subtract(change)
        // console.dir(this.weights.toArray())
    }
}