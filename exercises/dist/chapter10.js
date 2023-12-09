"use strict";
// Chapter10. Exercise
// 1. Play around with declaration merging, to:
//   a. Reimplement companion objects (from “Companion Object Pattern” on page 140) using namespaces and interfaces, instead of values and types.
//   b. Add static methods to an enum.
Object.defineProperty(exports, "__esModule", { value: true });
let Currency1 = {
    DEFAULT: "USD",
    from(value, unit = Currency1.DEFAULT) {
        return { unit, value };
    },
};
// import {Currency} from './Currency'
let amountDue = {
    unit: "JPY",
    value: 83733.1,
};
let otherAmountDue = Currency.from(330, Currency1.EUR);
var Currency;
(function (Currency) {
    const defaultCurrency = 3 /* unit.USD */;
    function from(value, unit = defaultCurrency) {
        return { unit, value };
    }
    Currency.from = from;
})(Currency || (Currency = {}));
let amountDue2 = {
    unit: 2 /* unit.JPY */,
    value: 83733.1,
};
let otherAmountDue2 = Currency.from(330, 0 /* unit.EUR */);
// 1b. Add static methods to an enum.
// const enum Gender { だとだめ。namespaceとのマージもできなくなるみたい。
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (Gender = {}));
(function (Gender) {
    function toString(g) {
        switch (g) {
            case Gender.male:
                return "male";
            case Gender.female:
                return "female";
        }
    }
    Gender.toString = toString;
})(Gender || (Gender = {}));
const strGender = Gender.toString(Gender.male);
//# sourceMappingURL=chapter10.js.map