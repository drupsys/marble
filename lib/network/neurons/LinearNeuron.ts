import * as linear from "vectorious"
import { Neuron } from "./Neuron"

export class LinearNeuron extends Neuron {

    public hypothesis(projection: number): number {
        return projection;
    }

    public derivative(error: number): number {
        return error
    }

}

export class TestLinearNeuron extends LinearNeuron {
    
    public constructor(weights: number[]) {
        super(0);
        this.w = new linear.Vector(weights);
    }

}