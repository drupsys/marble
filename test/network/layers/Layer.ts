// Reference mocha-typescript's global definitions:
/// <reference path="../../../defs.d.ts" />

import { Unit, expect } from "../../Unit"
import * as layer from '../../../lib/network/layers'
import * as linear from "vectorious"
import * as sinon from "sinon"

@suite("network/layers/Layer")
class Layer extends Unit {
    private layer: layer.Layer

    before() {
        this.layer = new layer.Layer(2, 3)
    }

    @test "should throw an error if input shape doesn't match layer shape" () {
        let input = linear.Matrix.random(2, 1)
        expect(() => { this.layer.forward(input)}).to.throw(layer.LayerException)
    }

    @test "should not throw an error if input shape matches layer shape" () {
        let input = linear.Matrix.random(1, 2)
        expect(() => { this.layer.forward(input)}).to.not.throw(layer.LayerException)
    }

    @test "should produce the output of the right shape" () {
        let input = linear.Matrix.random(1, 2)
        expect(this.layer.forward(input).shape.toString()).to.be.eq([1, 3].toString())
    }

    @test "should produce the right result" () {
        let tmp = layer.create(new layer.Layer(2, 1), new linear.Matrix([[0.5, 0.125, 0.35]]))
        let input = new linear.Matrix([[5, 2]])
        expect(tmp.forward(input).get(0, 0)).to.be.eq(1.825)
    }

    @test "hypothesis function should to affect the output" () {
        let h: layer.Operator = (x) => { return 2 * x }

        let tmp = layer.create(new layer.Layer(2, 1, h), new linear.Matrix([[0.5, 0.125, 0.35]]))
        let input = new linear.Matrix([[5, 2]])
        expect(tmp.forward(input).get(0, 0)).to.be.eq(2 * 1.825)
    }
}