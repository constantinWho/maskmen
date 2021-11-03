const strengthData = {};

const StrengthLogic = function () {
  const COLORS = {
    purple: true,
    green: true,
    blue: true,
    yellow: true,
    black: true,
    pink: true,
  };

  // iterate through an object and run a callback function for each
  const iterate = (obj, cb) => {
    if (Array.isArray(obj)) {
      obj.forEach(cb);
    } else {
      for (let x in obj) {
        cb(x, obj[x]);
      }
    }
  };

  // find and return array of weakest colors
  const findWeakest = (_) => {
    let weakest = {};

    // iterate through all defined colors
    iterate(strengthData, (color, data) => {
      // find the weakest colors
      iterate(data.weaker, (weaker) => {
        if (typeof weakest[weaker] === "undefined") {
          weakest[weaker] = true;
        }
      });
      // find clearly not weakest colors, set/override to `false`
      iterate(data.stronger, (stronger) => {
        weakest[stronger] = false;
      });
    });

    // filter only weakest = `true`
    let returnObj = {};
    iterate(weakest, (color, isWeakest) => {
      if (isWeakest) {
        returnObj[color] = true;
      }
    });

    return returnObj;
  };

  const getImmediateStrongerThan = (color) => strengthData[color].stronger;
  const getImmediateWeakerThan = (color) => strengthData[color].weaker;

  // get all colors which are stronger than the given
  const getWeakerOrStrongerThan = (color, weakerOrStronger) => {
    if (!~["weaker", "stronger"].indexOf(weakerOrStronger)) {
      throw new Error(`weakerOrStronger has to be 'weaker' or 'stronger'`);
    }
    let askedColors = {};
    iterate(strengthData[color][weakerOrStronger], (askedColor) => {
      askedColors = {
        ...askedColors,
        [askedColor]: true,
        ...getWeakerOrStrongerThan(askedColor, weakerOrStronger),
      };
    });
    return askedColors;
  };
  // public shorthand functions
  const getStrongerThan = (color) => getWeakerOrStrongerThan(color, "stronger");
  const getWeakerThan = (color) => getWeakerOrStrongerThan(color, "weaker");

  // returns -1 if a is stronger, 1 if b is stronger, 0 if unknown
  const compare = (a, b) => {
    const weakerThanA = getWeakerThan(a);
    if (weakerThanA[b]) {
      return -1;
    } else {
      const strongerThanA = getStrongerThan(a);
      if (strongerThanA[b]) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  // cleanup redundancy, if one color is at least even two levels stronger then remove this trace
  const cleanupStrengthData = (_) => {
    iterate(strengthData, (color, data) => {
      iterate(data.stronger, (strongerColor) => {
        iterate(getStrongerThan(strongerColor), (twoLevelStrongerColor) => {
          delete data.stronger[twoLevelStrongerColor];
          delete strengthData[twoLevelStrongerColor].weaker[color];
        });
      });
    });
  };

  const getNextInHierarchy = (color, hierarchy) => {
    let nextColor,
      parentColor = color;
    nextColor = color ? getImmediateStrongerThan(color) : findWeakest();
    iterate(nextColor, (color) => {
      if (typeof hierarchy[color] === "undefined") {
        hierarchy[color] = {
          id: color,
          data: {
            label: color,
          },
          parents: parentColor ? [parentColor] : [],
          children: [],
          animated: true,
        };
      } else {
        hierarchy[parentColor].children.push(color);
        hierarchy[color].parents.push(parentColor);
      }
      getNextInHierarchy(color, hierarchy);
    });
  };

  // cleanup redundancy, if one color is at least even two levels stronger then remove this trace
  const getHierarchy = (_) => {
    let hierarchy = {};
    getNextInHierarchy(false, hierarchy);
    return Object.values(hierarchy);
  };

  // define a color stronger than another
  const defineStronger = (strongerColor, weakerColor) => {
    if (COLORS[strongerColor]) {
      if (COLORS[weakerColor]) {
        const comparison = compare(weakerColor, strongerColor);
        if (!comparison) {
          // no definition yet, setting is fine
          strengthData[weakerColor].stronger[strongerColor] = true;
          strengthData[strongerColor].weaker[weakerColor] = true;
          cleanupStrengthData();
        } else if (comparison === -1) {
          // it's not only already set but even set wrong
          throw new Error(
            `${strongerColor} is already set as being weaker than ${weakerColor}`
          );
        } // ekse if comparison = 1 then ignore, it's already set
        // return the current state
        return strengthData;
      } else {
        throw new Error(`Invalid 'weakerColor': ${weakerColor}`);
      }
    } else {
      throw new Error(`Invalid 'strongerColor': ${strongerColor}`);
    }
  };
  const defineWeaker = (weakerColor, strongerColor) =>
    defineStronger(strongerColor, weakerColor);

  // initialize
  iterate(COLORS, (color) => {
    strengthData[color] = {
      weaker: {},
      stronger: {},
    };
  });

  // public functions
  return {
    findWeakest,
    getImmediateStrongerThan,
    getImmediateWeakerThan,
    getStrongerThan,
    getWeakerThan,
    compare,
    getHierarchy,
    defineStronger,
    defineWeaker,
  };
};

export default StrengthLogic();
