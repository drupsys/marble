import * as linear from "vectorious"

import { Neuron } from "./nodes"

type Layer = Neuron[]

export class NetworkInputException extends Error {}
export class NetworkOutputException extends Error {}

export class Network {
    private internal: Layer[] = []
    private results: Layer = []

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

        let neurons: Neuron[] = []
        for (var i = 0; i < output; i++) {
            neurons.push(Reflect.construct(neuron.prototype.constructor, [inputs]))
        }

        this.internal.push(neurons)
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
        let neurons: Neuron[] = []
        for (var i = 0; i < this.outputCount; i++) {
            neurons.push(new Neuron(inputs))
        }

        this.results = neurons
    }

    /** Gets the number of inputs the artificial neural network should receive. */
    public get inputs(): number {
        return this.inputCount;
    }

    /** Gets the number of outputs that the artificial neuroal network will produce. */
    public get outputs(): number {
        return this.outputCount
    }

    public train(inputs: number[], expected: number[]) {
        if (inputs.length != this.inputs)
            throw new NetworkInputException(`Expected to get ${this.inputs} but received ${inputs.length}`)
        if (inputs.length != this.inputs) 
            throw new NetworkOutputException(`Expected to get ${this.outputs} but received ${inputs.length}`)


    }

    /**
     * Predicts results based on inputs.
     * @param inputs array used to predict result.
     */
    public predict(inputs: linear.Vector): linear.Vector {
        if (inputs.toArray().length != this.inputs) 
            throw new NetworkInputException(`Expected to get ${this.inputs} but received ${inputs.toArray().length}`)
        
        let activations = inputs
        for (let i = 0; i < this.internal.length; i++) {
            activations = this.forward(this.internal[i], activations)
        }

        return this.forward(this.results, activations);
    }

    /**
     * Returns the result of a projection.
     * @param layer to be projected.
     * @param activations to be applied on the layer.
     */
    private forward(layer: Layer, activations: linear.Vector): linear.Vector {
        let next_layer_activations = linear.Vector.zeros(0)
        for (var n = 0; n < layer.length; n++) {
            next_layer_activations.push(layer[n].project(activations))
        }

        return next_layer_activations
    }
}