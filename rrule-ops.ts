import * as RRule from 'rrule-alt';

/*
      Check for an intersection between two RRULEs.
      Returns:
      - the date of the first intersection if it exists
      - null if a shortcut was employed to do the test (useful for testing)
      - undefined
*/
export const intersection = function(rule1: RRule, rule2: RRule, daysToCheck=365): Date | null | undefined {
  let retVal: Date | undefined | null;

  function arrayIntersection(arr1: any, arr2: any): any[] | undefined {
    let retVal;
    let definitelyArr1: any[] = (!Array.isArray(arr1)) ? (arr1 ? [arr1] : []) : arr1;
    let definitelyArr2: any[] = (!Array.isArray(arr2)) ? (arr2 ? [arr2] : []) : arr2;
    if (definitelyArr1.length > 0 && definitelyArr2.length > 0) {
      retVal = definitelyArr1.reduce((r: any, a: any) => definitelyArr2.includes(a) && r.concat(a) || r, [])
    }
    return retVal;
  }

  function checkNoArrayIntersection(attribute: string): boolean {
    let r1Options: any = rule1.options;
    let r2Options: any = rule2.options;
    let intersection = arrayIntersection(r1Options[attribute], r2Options[attribute])
    return !!intersection && (intersection.length === 0);
  }

  if (
    checkNoArrayIntersection('byhour')     ||
    checkNoArrayIntersection('byweekday')  ||
    checkNoArrayIntersection('bymonth')    ||
    checkNoArrayIntersection('byminute')   ||
    checkNoArrayIntersection('bysecond')   ||
    checkNoArrayIntersection('bymonthday') ||
    checkNoArrayIntersection('byyearday')  ||
    checkNoArrayIntersection('byweekno')
  ) {
    retVal = null;
  } else {
    // TODO: Use .all() with an iterator here for a performance gain
    // OPTIMIZE
    // OPTIMISE
    let until = new Date(new Date().valueOf() + daysToCheck * 24 * 60 * 60 * 1000)
    let dates = arrayIntersection(rule1.between(new Date(), until).map(d => d.valueOf()), rule2.between(new Date(), until).map(d => d.valueOf()));
    if (dates && dates.length > 0) {
      retVal = new Date(dates[0]);
    }
  }
  return retVal;
}
