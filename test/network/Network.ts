// Reference mocha-typescript's global definitions:
/// <reference path="../../defs.d.ts" />

import { Unit, expect } from "../Unit"
import * as net from '../../lib/network'
import * as nodes from '../../lib/network/nodes'
import * as linear from "vectorious"

@suite("network/Network")
class Network extends Unit {
    private network: net.Network
    private ones = new linear.Vector([1 , 1])
    private internal = [[
        new nodes.NeuronTest([0.2, 0.4]),
        new nodes.NeuronTest([0.9, 0.4])
    ]]
    private results = [
        new nodes.NeuronTest([0.5, 1])
    ]

    before() {
        this.network = new net.Network(2, 1)
    }

    @test "should throw error if incorrect number of inputs is provided to the predict function" () {
        expect(() => {
            this.network.predict(new linear.Vector([1]))
        }).to.throw(net.NetworkInputException)
    }

    @test "should not throw error if correct number of inputs is provided to the predict function" () {
        expect(() => {
            this.network.predict(this.ones)
        }).to.not.throw(net.NetworkInputException)
    }

    @test "should predict the right number of answers" () {
        expect(this.network.predict(this.ones).toArray().length).to.be.eq(1)
    }

    @test "should produce the right number of outputs after new layer is added" () {
        this.network.addHiddenLayer(nodes.Neuron, 3)
        expect(this.network.predict(this.ones).toArray().length).to.be.eq(1)
    }

    @test "should produce correct predictions" () {
        this.network.setLayers(this.internal, this.results)

        let prediction = this.network.predict(new linear.Vector([0.75, 0.1])).get(0)
        expect(prediction).to.eq(0.81)
    }

}