
class Telemetry {
  constructor() {
    this.called = {};
    this.set = {};
  }

  recordCall(property, args) {
    (property in this.called)
      ? this.called[property].push(args)
      : this.called[property] = [args];
  }

  recordSet(property, value) {
    (property in this.set)
      ? this.set[property].push(value)
      : this.set[property] = [value];
  }
}

/* eslint-disable no-shadow */
export default function Substitue(target, substites = {}) {
  const telemtry = new Telemetry();
  let currentProperty = null;

  const handler = {
    apply(target, thisArg, args) {
      telemtry.recordCall(currentProperty, args);
      return target.apply(thisArg, args);
    },

    get(target, property) {
      if (property === '$called') { return telemtry.called; }

      if (property === '$set') {
        return telemtry.set;
      }

      if (property in target) {
        if (typeof target[property] === 'function') {
          currentProperty = property;
          if (property in substites) return new Proxy(substites[property], this);
          return new Proxy((() => { }), this);
        }
        if (property in substites) return substites[property];
        return null;
      }
    },

    set(target, property, value) {
      if (property in target) {
        telemtry.recordSet(property, value);
        return true;
      }
    },
  };

  return new Proxy(target, handler);
}
