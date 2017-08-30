import * as linear from "vectorious"

import { Layer } from "./layers/Layer"
import * as layer from "./layers"

export class NetworkTrainingException extends Error {}
export class NetworkInputException extends Error {}
export class NetworkOutputException extends Error {}

export class Network {
    private layers: Layer[] = []

    /**
     * Constructs an instance of an artificial neural network.
     * @param inputCount of the neural network.
     * @param outputCount of the neural network.
     * @param h defines the hypothesis function used by this layer.
     * @param d defines the derivative function used by this layer.
     */
    public constructor(private inputCount: number, private outputCount: number, h?: layer.Operator, d?: layer.Operator) {
        this.layers.push(new layer.Layer(inputCount, outputCount, h, d))
    }

    /**
     * Adds a new hidden layer to the network.
     * @param inputs The number of inputs this layer accepts.
     * @param h defines the hypothesis function used by this layer.
     * @param d defines the derivative function used by this layer.
     */
    public addLayer(inputs: number, h?: layer.Operator, d?: layer.Operator) {
        let lastLayer = this.layers[this.layers.length - 1]
        lastLayer.createWeights(inputs)
        this.layers.push(new layer.Layer(inputs, this.outputCount, h, d))
    }
    
    /**
     * Sets the internal layers with the provided ones.
     * @param internal internal layers.
     */
    public setLayers(internal: Layer[]){
        this.layers = internal
    }

    /** Gets the number of inputs the artificial neural network should receive. */
    public get inputs(): number {
        return this.inputCount;
    }

    /** Gets the number of outputs that the artificial neuroal network will produce. */
    public get outputs(): number {
        return this.outputCount
    }

    private calcError(estimate: linear.Matrix, target: linear.Matrix) {
        let total = 0
        target.subtract(estimate).each((x) => {
            total += 0.5 * (x ** 2)
        })

        return total
    }

    public train(inputs: linear.Matrix[], expectations: linear.Matrix[]) {
        this.validateInputs(inputs, expectations, (expected, input) => {
            this.forwardPropagate(input, true)
            this.backwardPropagate(expected)
        })
    }
    
    public cost(inputs: linear.Matrix[], expectations: linear.Matrix[]) {
        let cost = 0
        this.validateInputs(inputs, expectations, (expected, input) => {
            cost += this.calcError(this.forwardPropagate(input, true), expected)
        })

        return cost
    }

    /**
     * Predicts results based on inputs.
     * @param inputs array used to predict result.
     */
    public predict(inputs: linear.Matrix): linear.Matrix {
        this.validateInputs([inputs])
        return this.forwardPropagate(inputs, false)
    }

    /**
     * Checks if the right number of inputs has been provided.
     * @param inputs inputs to be validated.
     */
    private validateInputs(inputs: linear.Matrix[], expectations?: linear.Matrix[], callback?: ((expected: linear.Matrix, input: linear.Matrix) => void)) {
        if (expectations && inputs.length != expectations.length)
            throw new NetworkTrainingException(`received ${inputs.length} inputs and ${expectations.length} expectations`)
        
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.toArray()[0].length != this.inputs)
                throw new NetworkInputException(`Expected to get ${this.inputs} but received ${input.toArray()[0].length}`)

            if (expectations) {
                var expectation = expectations[i];
                
                if (expectation.toArray()[0].length != this.outputs)
                    throw new NetworkOutputException(`Expected to get ${this.outputs} but received ${expectation.toArray()[0].length}`)
                
                if (callback) callback(expectation, input)
            }
        }
    }

    /**
     * Performs the forward propagation.
     * @param inputs inputs used to predict outputs.
     * @param training boolean used to enable training mode.
     */
    private forwardPropagate(inputs: linear.Matrix, training: boolean): linear.Matrix {
        for (let i = 0; i < this.layers.length; i++) {
            inputs = this.layers[i].forward(inputs, training)
        }

        return inputs
    }

    private backwardPropagate(result: linear.Matrix) {
        let nextLayer = this.layers[this.layers.length - 1]
        console.dir(`error: ${result.toArray()}`)

        let nextDelta = nextLayer.hypothesis.subtract(result)
            .product(nextLayer.signal.map(nextLayer.derivative))
        console.dir(`delta: ${nextDelta.toArray()}`)
        
        let nextChange = nextLayer.hypothesis.T.multiply(nextDelta)
        console.dir(`hyp: ${nextLayer.hypothesis.T}`)
        console.dir(`change: ${nextChange.toArray()}`)
        
        for (var i = this.layers.length - 2; i >= 0; i--) {
            let currentLayer = this.layers[i]

            // console.dir(nextDelta.multiply(nextLayer.weights.T).toArray())
            // console.dir(nextLayer.weights.multiply(nextDelta).toArray())
            // console.dir(currentLayer.received.map(currentLayer.derivative).toArray())

            let currentDelta = nextLayer.weights.T.multiply(nextDelta)
                .product(currentLayer.signal.map(currentLayer.derivative))
            let currentChange = currentLayer.signal.T.multiply(currentDelta)

            nextLayer.apply(nextChange, 0.01)

            nextLayer = currentLayer
            nextDelta = currentDelta
            nextChange = currentChange
        }

        nextLayer.apply(nextChange, 0.01)
        return result
    }
}