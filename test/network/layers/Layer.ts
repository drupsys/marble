// Reference mocha-typescript's global definitions:
/// <reference path="../../../defs.d.ts" />

import { Unit, expect } from "../../Unit"
import * as layers from '../../../lib/network/layers'
import { TestNeuron, Neuron } from '../../../lib/network/neurons'
import * as linear from "vectorious"

@suite("network/layers/Layer")
class Layer extends Unit {
    private layer: layers.Layer

    before() {
        this.layer = new layers.Layer(2, 3, Neuron)
    }

    @test "should have the right number of nodes" () {
        expect(this.layer.length).to.be.eq(3)
    }

    @test "should be a results layer by default" () {
        expect(this.layer.output).to.be.true
    }

    @test "should not be an output layer after it is made hidden" () {
        this.layer.makeHidden()
        expect(this.layer.output).to.be.false
    }

    @test "should produce the right results" () {
        this.layer = new layers.TestLayer([
            new TestNeuron([1, 2, 5]),
            new TestNeuron([1, 3, 1]),
        ])
        
        let results = this.layer.forward(new linear.Vector([1, 2, 2]))
        expect(results.get(0)).to.be.eq(15)
        expect(results.get(1)).to.be.eq(9)
    }
}