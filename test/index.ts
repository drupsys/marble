// Reference mocha-typescript's global definitions:
/// <reference path="../defs.d.ts" />

import { Unit, expect } from "./Unit"

@suite("index")
class index extends Unit {

    @test "universe should not be broken" () {
        expect(true).to.not.eq(false)
    }

}