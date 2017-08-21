import * as linear from "vectorious"
import { Neuron } from "./Neuron"

export class LinearNeuron extends Neuron {

    /**
     * Return linear hypothesys, f(x) = x
     * @param projection number
     */
    public hypothesis(projection: number): number {
        return projection;
    }

    /**
     * Return linear derivative, f(x) = 1
     * @param projection number
     */
    public derivative(projection: number): number {
        return 1
    }

}

export class TestLinearNeuron extends LinearNeuron {
    
    public constructor(weights: number[]) {
        super(0);
        this.w = new linear.Vector(weights);
    }

}