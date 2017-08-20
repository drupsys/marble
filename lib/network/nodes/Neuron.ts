import * as linear from "vectorious"

export class NeuronInputException extends Error {}

export class Neuron {
    private w: linear.Vector

    /**
     * Constructs an instance of the neuron.
     * @param inputs count of the neuron.
     */
    public constructor(inputs: number) {
        let randomized = []
        for (var i = 0; i < inputs; i++) {
            randomized.push(Math.nextBoundFloat(-1, 1))
        }

        this.w = new linear.Vector(randomized)
    }

    /** Gets the input weights of the neuron. */
    public get weights(): linear.Vector {
        return this.w
    }

    /**
     * Applies activation with the weights and reurns the result of the operation.
     * @param activations inputs to be used in the projection. 
     */
    public project(activations: linear.Vector): number {
        return this.weights.dot(activations);
    }

}