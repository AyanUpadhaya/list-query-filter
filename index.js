// index.js

const CONDITIONS = {
  equals: "equals",
  notEquals: "notEquals",
  greaterThan: "greaterThan",
  lessThan: "lessThan",
  greaterOrEqual: "greaterOrEqual",
  lessOrEqual: "lessOrEqual",
  includes: "includes",
  startsWith: "startsWith",
  endsWith: "endsWith",
};

const query = (items = []) => {
  let data = [...items];

  const evaluateCondition = (value, conditionObj) => {
    const { condition, value: filterValue } = conditionObj;

    if (typeof condition === "function") return condition(value, filterValue);

    switch (condition) {
      case CONDITIONS.equals:
        return value == filterValue;
      case CONDITIONS.notEquals:
        return value != filterValue;
      case CONDITIONS.greaterThan:
        return value > filterValue;
      case CONDITIONS.lessThan:
        return value < filterValue;
      case CONDITIONS.greaterOrEqual:
        return value >= filterValue;
      case CONDITIONS.lessOrEqual:
        return value <= filterValue;
      case CONDITIONS.includes:
        if (Array.isArray(value)) return value.includes(filterValue);
        return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
      case CONDITIONS.startsWith:
        return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
      case CONDITIONS.endsWith:
        return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
      default:
        return false;
    }
  };

  const evaluateFilter = (item, filterObj) => {
    return Object.entries(filterObj).every(([key, conditionObj]) => {
      if (key === "AND") return conditionObj.every((sub) => evaluateFilter(item, sub));
      if (key === "OR") return conditionObj.some((sub) => evaluateFilter(item, sub));
      return evaluateCondition(item[key], conditionObj);
    });
  };

  const api = {
    filter(filters = {}) {
      data = data.filter((item) => evaluateFilter(item, filters));
      return api;
    },

    sort(key, order = "asc") {
      const dir = order === "desc" ? -1 : 1;
      data = data.sort((a, b) => {
        if (a[key] < b[key]) return -1 * dir;
        if (a[key] > b[key]) return 1 * dir;
        return 0;
      });
      return api;
    },

    limit(n) {
      data = data.slice(0, n);
      return api;
    },

    skip(n) {
      data = data.slice(n);
      return api;
    },

    select(fields = []) {
      if (!fields.length) return api;
      data = data.map((item) => {
        const selected = {};
        fields.forEach((f) => (selected[f] = item[f]));
        return selected;
      });
      return api;
    },

    get() {
      return data;
    },
  };

  return api;
};

module.exports = { query, CONDITIONS };
