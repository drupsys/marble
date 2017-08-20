import * as linear from "vectorious"

import { Layer } from "./layers"
import { Neuron } from "./neurons"

export class NetworkInputException extends Error {}
export class NetworkOutputException extends Error {}

export class Network {
    private internal: Layer[] = []
    private results: Layer

    /**
     * Constructs an instance of an artificial neural network.
     * @param inputCount of the neural network.
     * @param outputCount of the neural network.
     */
    public constructor(private inputCount: number, private outputCount: number) {
        this.setResultLayer(inputCount)
    }

    /**
     * Adds a new hidden layer to the network.
     * @param neuron that either extends or is Neuron.
     * @param output The number of outputs this layer produces.
     */
    public addHiddenLayer(neuron: Function, output: number) {
        let inputs: number
        if (this.internal.length == 0) {
            inputs = this.inputCount
        } else {
            inputs = this.internal[this.internal.length - 1].length
        }

        this.internal.push(new Layer(inputs, output, neuron))
        this.setResultLayer(output)
    }

    public setLayers(internal: Layer[], results: Layer){
        this.internal = internal
        this.results = results
    }

    /**
     * Creates and sets the results layer.
     * @param inputs of the results layer.
     */
    private setResultLayer(inputs: number) {
        this.results = new Layer(inputs, this.outputCount, Neuron)
    }

    /** Gets the number of inputs the artificial neural network should receive. */
    public get inputs(): number {
        return this.inputCount;
    }

    /** Gets the number of outputs that the artificial neuroal network will produce. */
    public get outputs(): number {
        return this.outputCount
    }

    public train(inputs: linear.Vector, expected: linear.Vector) {
        if (inputs.toArray().length != this.inputs)
            throw new NetworkInputException(`Expected to get ${this.inputs} but received ${inputs.toArray().length}`)
        if (inputs.toArray().length != this.inputs) 
            throw new NetworkOutputException(`Expected to get ${this.outputs} but received ${inputs.toArray().length}`)

        let result = this.forwardPropagate(inputs, true)
    }

    /**
     * Predicts results based on inputs.
     * @param inputs array used to predict result.
     */
    public predict(inputs: linear.Vector): linear.Vector {
        if (inputs.toArray().length != this.inputs) 
            throw new NetworkInputException(`Expected to get ${this.inputs} but received ${inputs.toArray().length}`)
        
        return this.forwardPropagate(inputs)
    }

    private forwardPropagate(inputs: linear.Vector, training = false): linear.Vector {
        let activations = inputs
        for (let i = 0; i < this.internal.length; i++) {
            activations = this.internal[i].forward(activations)
        }

        return this.results.forward(activations)
    }

}