"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RRule = require("rrule-alt");
const chai = require("chai");
const index_1 = require("../index");
let assert = chai.assert;
describe('intersections', function () {
    it('handles non intersecting weekly', function () {
        assert.isNull(index_1.intersection(RRule.fromString('FREQ=WEEKLY;WKST=MO;BYDAY=TU'), RRule.fromString('FREQ=WEEKLY;WKST=MO;BYDAY=WE')));
    });
    it('handles non intersecting daily byhour', function () {
        assert.isNull(index_1.intersection(RRule.fromString('FREQ=DAILY;BYHOUR=7,17'), RRule.fromString('FREQ=DAILY;BYHOUR=12,22')));
    });
    it('returns a match', function () {
        let result = index_1.intersection(RRule.fromString('FREQ=DAILY;BYHOUR=7,17'), RRule.fromString('FREQ=DAILY;BYHOUR=7,12,22'), 1);
        assert.typeOf(result, 'Date');
        assert.isAtLeast(result.valueOf(), new Date().valueOf());
    });
    it('returns undefined if no match within specified search time', function () {
        let result = index_1.intersection(RRule.fromString('FREQ=DAILY;BYHOUR=7,17;BYMINUTE=0;BYSECOND=0'), RRule.fromString('FREQ=DAILY;DTSTART=40990102T000000Z;WKST=MO;BYHOUR=17,7;BYMINUTE=0;BYSECOND=0'), 1);
        assert.typeOf(result, 'undefined');
    });
});
