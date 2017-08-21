import * as linear from "vectorious"
import { Neuron } from "./Neuron"

export class LogisticNeuron extends Neuron {
    
    /**
     * Return logistic hypothesys, 
     * f(x) = 1 / (1 + e^(-x))
     * @param projection number
     */
    public hypothesis(projection: number): number {
        return 1.0 / (1 + Math.exp(-projection));
    }

    /**
     * Return logistic derivative, 
     * f(x) = h(x) * (1 - h(x))
     * h(x) = 1 / (1 + e^(-x))
     * @param projection number
     */
    public derivative(projection: number): number {
        let x = this.hypothesis(projection)
        return x * (1 - x)
    }
    
}

export class TestLogisticNeuron extends LogisticNeuron {
    
    public constructor(weights: number[]) {
        super(0);
        this.w = new linear.Vector(weights);
    }

}