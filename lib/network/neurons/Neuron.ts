import * as linear from "vectorious"

export class NeuronInputException extends Error {}
export abstract class Neuron {
    protected w: linear.Vector

    /**
     * Constructs an instance of the neuron.
     * @param inputs count of the neuron.
     */
    public constructor(inputs: number) {
        // Note: Arguments array is used because variable name is not found when
        // creating Neurons with with reflections.
        this.w = linear.Vector.random(arguments[0] + 1)
    }

    /** Gets the input weights of the neuron. */
    public get weights(): number[] {
        return this.w.toArray();
    }

    /**
     * Defines the type of activation function used.
     * @param projection number produced by the projection.
     */
    public abstract hypothesis(projection: number): number;

    public abstract derivative(error: number): number;

    /**
     * Applies activation with the weights and reurns the result of the operation.
     * @param activations inputs to be used in the projection. 
     */
    public project(activations: linear.Vector): number {
        // console.log(`${activations.toString()} . ${this.w.toString()}`) 
        let projection = activations.dot(this.w)
        return this.hypothesis(projection)
    }

}