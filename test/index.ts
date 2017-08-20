// Reference mocha-typescript's global definitions:
/// <reference path="../defs.d.ts" />

import { Unit } from "./Unit"
import * as $ from 'chai'
import * as sinon from 'sinon'

@suite("index")
class index extends Unit {

    @test "universe should not be broken" () {
        $.expect(true).to.not.eq(false)
    }

}