"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RRule = require("rrule-alt");
const chai = require("chai");
const rrule_ops_1 = require("../rrule-ops");
let assert = chai.assert;
describe('intersections', function () {
    it('handles non intersecting weekly', function () {
        assert.isNull(rrule_ops_1.intersection(RRule.fromString('FREQ=WEEKLY;WKST=MO;BYDAY=TU'), RRule.fromString('FREQ=WEEKLY;WKST=MO;BYDAY=WE')));
    });
    it('handles non intersecting daily byhour', function () {
        assert.isNull(rrule_ops_1.intersection(RRule.fromString('FREQ=DAILY;BYHOUR=7,17'), RRule.fromString('FREQ=DAILY;BYHOUR=12,22')));
    });
    it('returns a match', function () {
        let result = rrule_ops_1.intersection(RRule.fromString('FREQ=DAILY;BYHOUR=7,17'), RRule.fromString('FREQ=DAILY;BYHOUR=7,12,22'), 1);
        assert.typeOf(result, 'Date');
        assert.isAtLeast(result.valueOf(), new Date().valueOf());
    });
    it('returns undefined if no match within specified search time', function () {
        let result = rrule_ops_1.intersection(RRule.fromString('FREQ=DAILY;BYHOUR=7,17;BYMINUTE=0;BYSECOND=0'), RRule.fromString('FREQ=DAILY;DTSTART=40990102T000000Z;WKST=MO;BYHOUR=17,7;BYMINUTE=0;BYSECOND=0'), 1);
        assert.typeOf(result, 'undefined');
    });
    it('returns another match', function () {
        let result = rrule_ops_1.intersection(RRule.fromString('FREQ=DAILY;BYHOUR=7,12,17,22;DTSTART=20171216T125807Z;BYMINUTE=0;BYSECOND=0'), RRule.fromString('FREQ=DAILY;DTSTART=20150101T070000Z;BYHOUR=7,12,17,22'), 1);
        assert.typeOf(result, 'Date');
        assert.isAtLeast(result.valueOf(), new Date().valueOf());
    });
});
