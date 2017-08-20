import * as chai from 'chai'
import * as sinon from 'sinon'

export let expect = chai.expect
export let assert = chai.assert
export let $ = sinon

interface Math {
    nextFloat(): number
    nextBoundFloat(min: number, max: number): number
}

export class Unit {

    static before() {
        Math.nextFloat = function() {
            return Math.nextBoundFloat(0, 1);
        }
        
        Math.nextBoundFloat = function(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }
    }

}