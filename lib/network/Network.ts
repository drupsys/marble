import * as linear from "vectorious"

import { Layer } from "./layers"
import { Neuron } from "./neurons"

export class NetworkInputException extends Error {}
export class NetworkOutputException extends Error {}

export class Network {
    private layers: Layer[] = []

    /**
     * Constructs an instance of an artificial neural network.
     * @param inputCount of the neural network.
     */
    public constructor(private inputCount: number) {

    }

    /**
     * Adds a new hidden layer to the network.
     * @param neuron that either extends or is Neuron.
     * @param output The number of outputs this layer produces.
     */
    public addLayer(neuron: Function, output: number) {
        let inputs: number
        if (this.layers.length == 0) {
            inputs = this.inputCount
        } else {
            let last = this.layers[this.layers.length - 1]
            last.makeHidden()
            inputs = last.length
        }

        this.layers.push(new Layer(inputs, output, neuron))
    }
    
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

    public train(inputs: linear.Vector, expected: linear.Vector) {
        this.validateInputs(inputs)
        if (expected.toArray().length != this.outputs)
            throw new NetworkOutputException(`Expected to get ${this.outputs} but received ${inputs.toArray().length}`)

        let result = this.forwardPropagate(inputs, true)
    }

    /**
     * Predicts results based on inputs.
     * @param inputs array used to predict result.
     */
    public predict(inputs: linear.Vector): linear.Vector {
        this.validateInputs(inputs)
        return this.forwardPropagate(inputs)
    }

    private validateInputs(inputs: linear.Vector) {
        if (inputs.toArray().length != this.inputs)
            throw new NetworkInputException(`Expected to get ${this.inputs} but received ${inputs.toArray().length}`)
    }

    private forwardPropagate(inputs: linear.Vector, training = false): linear.Vector {
        let activations = new linear.Vector([1].concat(inputs.toArray()))
        for (let i = 0; i < this.layers.length; i++) {
            activations = this.layers[i].forward(activations)
            i < this.layers.length - 1
        }

        return activations
    }

}