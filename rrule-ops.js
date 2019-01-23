"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
      Check for an intersection between two RRULEs.
      Returns:
      - the date of the first intersection if it exists
      - null if a shortcut was employed to do the test (useful for testing)
      - undefined
*/
exports.intersection = function (rule1, rule2, daysToCheck = 365) {
    let retVal;
    function arrayIntersection(arr1, arr2) {
        let retVal;
        let definitelyArr1 = (!Array.isArray(arr1)) ? (arr1 ? [arr1] : []) : arr1;
        let definitelyArr2 = (!Array.isArray(arr2)) ? (arr2 ? [arr2] : []) : arr2;
        if (definitelyArr1.length > 0 && definitelyArr2.length > 0) {
            retVal = definitelyArr1.reduce((r, a) => definitelyArr2.includes(a) && r.concat(a) || r, []);
        }
        return retVal;
    }
    function checkNoArrayIntersection(attribute) {
        let r1Options = rule1.options;
        let r2Options = rule2.options;
        let intersection = arrayIntersection(r1Options[attribute], r2Options[attribute]);
        return !!intersection && (intersection.length === 0);
    }
    if (checkNoArrayIntersection('byhour') ||
        checkNoArrayIntersection('byweekday') ||
        checkNoArrayIntersection('bymonth') ||
        checkNoArrayIntersection('byminute') ||
        checkNoArrayIntersection('bysecond') ||
        checkNoArrayIntersection('bymonthday') ||
        checkNoArrayIntersection('byyearday') ||
        checkNoArrayIntersection('byweekno')) {
        retVal = null;
    }
    else {
        // TODO: Use .all() with an iterator here for a performance gain
        // OPTIMIZE
        // OPTIMISE
        let until = new Date(new Date().valueOf() + daysToCheck * 24 * 60 * 60 * 1000);
        let dates = arrayIntersection(rule1.between(new Date(), until).map(d => d.valueOf()), rule2.between(new Date(), until).map(d => d.valueOf()));
        if (dates && dates.length > 0) {
            retVal = new Date(dates[0]);
        }
    }
    return retVal;
};
