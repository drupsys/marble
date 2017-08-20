import * as linear from "vectorious"

export class NeuronInputException extends Error {}
export class Neuron {
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
     * Applies activation with the weights and reurns the result of the operation.
     * @param activations inputs to be used in the projection. 
     */
    public project(activations: linear.Vector): number {
        // console.log(`${activations.toString()} . ${this.w.toString()}`) 
        return activations.dot(this.w)
    }

}

export class TestNeuron extends Neuron {
    
    public constructor(weights: number[]) {
        super(0);
        this.w = new linear.Vector(weights);
    }

}