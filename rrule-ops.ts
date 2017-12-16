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

  function arrayIntersection(arr1: any, arr2: any): Array<any> | undefined {
    let retVal;
    if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length > 0 && arr2.length > 0) {
      retVal = arr1.reduce((r: any, a: any) => arr2.includes(a) && r.concat(a) || r, [])
    }
    return retVal;
  }

  function checkNoArrayIntersection(attribute: string): boolean {
    let intersection = arrayIntersection(rule1.options[attribute], rule2.options[attribute])
    return !!intersection && intersection.length === 0;
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
