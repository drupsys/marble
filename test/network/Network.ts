// Reference mocha-typescript's global definitions:
/// <reference path="../../defs.d.ts" />

import { Unit, expect } from '../Unit'
import * as net from '../../lib/network'
import * as layers from '../../lib/network/layers'
import * as linear from 'vectorious'

@suite("network/Network")
class Network extends Unit {
    private network: net.Network
    // private ones = new linear.Vector([1, 1])
    
    // private internal = [new layers.TestLayer([
    //     new nodes.TestLinearNeuron([1, 0.2, 0.4]),
    //     new nodes.TestLinearNeuron([1, 0.9, 0.4]),
    //     new nodes.TestLinearNeuron([1, 0.5, 1])
    // ])]

    before() {
        // this.network = new net.Network(3, 1, layers.LOGISTIC, layers.DLOGISTIC)
        // this.network.addLayer(2, layers.LOGISTIC, layers.DLOGISTIC)
    }

    @test "something" () {
        let network = new net.Network(1, 1)
        let layer = new layers.Layer(1, 1, layers.BENT_IDENTITY, layers.BENT_IDENTITY_PRIME)
        layer = layers.create(layer, [[0.35]], [[-0.35]])
        network.setLayers([layer])

        let input = new linear.Matrix([[2]])
        let expected = new linear.Matrix([[-9.35]])
        
        let cost = network.cost([input], [expected])
        for (var i = 0; i <5; i++) {
            network.train([input], [expected])
        }

        console.log(cost)
        console.log(network.cost([input], [expected]))
        console.dir(network.predict(input).toArray())
        expect(network.cost([input], [expected])).to.be.lt(cost)
    }

    // @test "should throw error if incorrect number of inputs is provided to the predict function" () {
    //     expect(() => {
    //         this.network.predict(new linear.Vector([1]))
    //     }).to.throw(net.NetworkInputException)
    // }

    // @test "should not throw error if correct number of inputs is provided to the predict function" () {
    //     expect(() => {
    //         this.network.predict(this.ones)
    //     }).to.not.throw(net.NetworkInputException)
    // }

    // @test "should predict the right number of answers" () {
    //     expect(this.network.predict(this.ones).toArray().length).to.be.eq(1)
    // }

    // @test "should produce the right number of outputs after new layer is added" () {
    //     this.network = new net.Network(2)
    //     this.network.addLayer(nodes.LinearNeuron, 3)
    //     this.network.addLayer(nodes.LinearNeuron, 5)
    //     this.network.addLayer(nodes.LinearNeuron, 2)
    //     expect(this.network.predict(this.ones).toArray().length).to.be.eq(2)
    // }

    // @test "should produce correct predictions" () {
    //     this.network.setLayers(this.internal)

    //     let prediction = this.network.predict(new linear.Vector([0.75, 0.1])).get(0)
    //     expect(prediction).to.eq(1.19)
    // }

    // @test "should throw error if the number of expectations are not equal to inputs" () {
    //     expect(() => {
    //         this.network.train([new linear.Vector([0.75, 0.1])], [])
    //     }).to.throw(net.NetworkTrainingException)
    // }

    // @test "should not throw error if the number of expectations are equal to inputs" () {
    //     expect(() => {
    //         this.network.train([new linear.Vector([0.75, 0.1])], [new linear.Vector([0.75, 0.1])])
    //     }).to.not.throw(net.NetworkTrainingException)
    // }
}