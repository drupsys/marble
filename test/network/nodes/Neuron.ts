// Reference mocha-typescript's global definitions:
/// <reference path="../../../defs.d.ts" />

import { Unit, expect } from "../../Unit"
import * as nodes from '../../../lib/network/nodes'
import * as linear from "vectorious"

@suite("network/nodes/Neuron")
class Neuron extends Unit {
    private neuron: nodes.Neuron

    before() {
        this.neuron = new nodes.Neuron(2)
    }

    @test "expect neuron to have default weights between -1 and 1" () {
        expect(this.neuron.weights[0]).to.be.gte(-1).lte(1)
        expect(this.neuron.weights[1]).to.be.gte(-1).lte(1)
    }

    @test "expect weights vector length to be equal to the number of inputs" () {
        expect(this.neuron.weights.length).to.eq(2)
    }

    @test "expect projection to procude a number" () {
        expect(this.neuron.project(new linear.Vector([1, 1]))).to.be.a("number")
    }

    @test "expect project function to produce correct results" () {
        let n = new nodes.NeuronTest([0.5, 0.25])
        expect(n.project(new linear.Vector([0.5, 2]))).to.be.eq(0.75)
    }

}