// Reference mocha-typescript's global definitions:
/// <reference path="../../../defs.d.ts" />

import { Unit } from "../../Unit"
import * as $ from 'chai'
import * as sinon from 'sinon'
import * as nodes from '../../../lib/network/nodes'
import * as linear from "vectorious"

@suite("network/nodes/Neuron")
class Neuron extends Unit {
    private neuron: nodes.Neuron

    before() {
        this.neuron = new nodes.Neuron(2)
    }

    @test "expect neuron to have default weights between -1 and 1" () {
        $.expect(this.neuron.weights.get(0)).to.be.gte(-1).lte(1)
        $.expect(this.neuron.weights.get(1)).to.be.gte(-1).lte(1)
    }

    @test "expect weights vector length to be equal to the number of inputs" () {
        $.expect(this.neuron.weights.toArray().length).to.eq(2)
    }

    @test "expect projection to procude a number" () {
        let m = new linear.Vector([1, 1])
        $.expect(this.neuron.project(m)).to.be.a("number")
    }

}