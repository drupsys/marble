import * as linear from "vectorious"
import { Neuron } from "../neurons"

export class Layer {
    protected neurons: Neuron[] = []
    private outputLayer = true;

    /**
     * Constructs the layer object.
     * @param inputs number.
     * @param outputs number.
     * @param neuron type to be used in this layer.
     */
    public constructor(inputs: number, outputs: number, neuron: Function) {
        for (var i = 0; i < outputs; i++) {
            this.neurons.push(
                Reflect.construct(neuron.prototype.constructor, [inputs]))
        }
    }

    /** Gets the number of neurons at this layer. */
    public get length(): number {
        return this.neurons.length
    }

    /** Gets the number of neurons at this layer. */
    public get output(): boolean {
        return this.outputLayer
    }

    /** Makes this layer hidden. */
    public makeHidden() {
        this.outputLayer = false
    }

    /**
     * Returns the result of a projection for this layer.
     * @param activations to be applied on the layer.
     */
    public forward(activations: linear.Vector, training = false): linear.Vector {
        let next_layer_activations = new linear.Vector(this.outputLayer ? [] : [1])
        for (var n = 0; n < this.neurons.length; n++) {
            next_layer_activations.push(this.neurons[n].project(activations))
        }

        return next_layer_activations
    }

}

export class TestLayer extends Layer {

    public constructor(neurons: Neuron[]) {
        super(0, 0, Neuron)
        this.neurons = neurons
    }

}