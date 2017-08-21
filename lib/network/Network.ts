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
        if (this.layers.length == 0) return 0;
        else return this.layers[this.layers.length - 1].length
    }

    public train(activations: linear.Matrix[], expectations: linear.Matrix[]) {
        // let cost = linear.Vector.zeros(this.outputs)
        this.validateInputs(activations, expectations, (activation, expectation) => {
            // let result = this.forwardPropagate(activation, true)
            // let error = expectation.subtract(result)
            // cost.add(error.map((e) => { return 0.5 * (e ^ 2) }))

            this.backwardPropagate(this.forwardPropagate(activation, true), expectation)
        })

    }

    /**
     * Predicts results based on inputs.
     * @param inputs array used to predict result.
     */
    public predict(inputs: linear.Matrix): linear.Matrix {
        this.validateInputs([inputs])
        return this.forwardPropagate(inputs)
    }

    /**
     * Checks if the right number of inputs has been provided.
     * @param inputs inputs to be validated.
     */
    private validateInputs(inputs: linear.Matrix[], expectations?: linear.Matrix[], callback?: ((activation: linear.Matrix, expectation: linear.Matrix) => void)) {
        if (expectations && inputs.length != expectations.length)
            throw new NetworkTrainingException(`received ${inputs.length} inputs and ${expectations.length} expectations`)
        
        for (var i = 0; i < inputs.length; i++) {
            var activation = inputs[i];
            if (activation.toArray().length != this.inputs)
                throw new NetworkInputException(`Expected to get ${this.inputs} but received ${activation.toArray().length}`)

            if (expectations) {
                var expectation = expectations[i];
                if (expectation.toArray().length != this.outputs)
                    throw new NetworkOutputException(`Expected to get ${this.outputs} but received ${expectation.toArray().length}`)
                
                if (callback) callback(activation, expectation)
            }
        }
    }

    /**
     * Performs the forward propagation.
     * @param inputs inputs used to predict outputs.
     * @param training boolean used to enable training mode.
     */
    private forwardPropagate(inputs: linear.Matrix, training = false): linear.Matrix {
        for (let i = 0; i < this.layers.length; i++) {
            inputs = this.layers[i].forward(inputs)
        }

        return inputs
    }

    private backwardPropagate(actual: linear.Matrix, expected: linear.Matrix) {
        for (var i = this.layers.length - 1; i > 0; i--) {
            this.layers[i].backward(actual, expected)
        }
    }
}