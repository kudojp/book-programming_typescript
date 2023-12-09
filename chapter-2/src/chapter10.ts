// Chapter10. Exercise
// 1. Play around with declaration merging, to:
//   a. Reimplement companion objects (from “Companion Object Pattern” on page 140) using namespaces and interfaces, instead of values and types.
//   b. Add static methods to an enum.

type Currency1 = {
  unit: "EUR" | "GBP" | "JPY" | "USD";
  value: number;
};
let Currency1: any = {
  DEFAULT: "USD",
  from(value: number, unit = Currency1.DEFAULT): Currency1 {
    return { unit, value };
  },
};

// import {Currency} from './Currency'
let amountDue: Currency1 = {
  unit: "JPY",
  value: 83733.1,
};
let otherAmountDue = Currency.from(330, Currency1.EUR);

// -------------------------->

const enum unit {
  EUR,
  GBP,
  JPY,
  USD,
}

// interface name = namespace name = Currency
export interface Currency {
  unit: unit;
  value: number;
}

namespace Currency {
  const defaultCurrency = unit.USD;
  export function from(value: number, unit: unit = defaultCurrency): Currency {
    return { unit, value };
  }
}

let amountDue2: Currency = {
  unit: unit.JPY,
  value: 83733.1,
};
let otherAmountDue2 = Currency.from(330, unit.EUR);

// 1b. Add static methods to an enum.

// const enum Gender { だとだめ。namespaceとのマージもできなくなるみたい。
enum Gender {
  male,
  female,
}

namespace Gender {
  export function toString(g: Gender): string {
    switch (g) {
      case Gender.male:
        return "male";
      case Gender.female:
        return "female";
    }
  }
}

const strGender = Gender.toString(Gender.male);
