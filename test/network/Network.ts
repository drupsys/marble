// Reference mocha-typescript's global definitions:
/// <reference path="../../defs.d.ts" />

import { Unit } from "../Unit"
import * as $ from 'chai'
import * as sinon from 'sinon'
import * as net from '../../lib/network'
import * as linear from "vectorious"

@suite("network/Network")
class Network extends Unit {
    private network: net.Network

    before() {
        this.network = new net.Network(2, 1)
    }

    @test "should throw error if incorrect number of inputs is provided to the predict function" () {
        $.expect(() => {
            this.network.predict([1])
        }).to.throw(net.NetworkInputException)
    }

    @test "should not throw error if correct number of inputs is provided to the predict function" () {
        $.expect(() => {
            this.network.predict([1, 1])
        }).to.not.throw(net.NetworkInputException)
    }

    @test "should predict the right number of answers" () {
        $.expect(this.network.predict([1, 1]).length).to.be.eq(1)
    }
    
}