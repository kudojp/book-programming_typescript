"use strict";
// // Chapter 5. Advanced Object types
// const r1: Record<string, string> = {};
// const r2: Record<"john" | "paul", string> = {
//   // この場合は、keyのexhaustivenessが強制される
//   john: "john",
//   paul: "paul",
// };
// const m1: { [K in "john" | "paul"]: string } = {
//   // exhaustiveness checkあり
//   john: "john",
//   paul: "paul",
// };
// type oType = { [K in string]: number };
// const o: oType = {
//   john: 12,
//   paul: 12,
// };
// let n = "test";
// let y = n as "x";
// console.log(typeof y);
// console.log(y);
// type a = number | null;
// let nu: a = 23;
// let y1 = nu!;
// console.log(typeof y1);
// // (1)
// // 1. For each of the following pairs of types, decide if the first type is assignable to the second type, and why or why not.
// // Think about these in terms of subtyping and variance, and refer to the rules at the start of the chapter if you’re unsure
// // (if you’re still unsure, just type it into your code editor to check!):
// // a. 1 -> number
// // assignable
// // b. number and 1
// // un-assignable
// // c. string -> number | string
// // assignable
// const c = "string";
// const xxxx: number | string = c;
// // d. boolean and number
// // un-assignable
// // e. number[] and (number | string)[]
// // assignable!
// const e: number[] = [1, 2, 3];
// const eee: (number | string)[] = e;
// // f. (number | string)[] and number[]
// // un-assignable
// // g. {a: true} and {a: boolean}
// // assignable!
// const g: { a: true } = { a: true };
// const ggg: { a: boolean } = g;
// // h. {a: {b: [string]}} and {a: {b: [number | string]}}
// // assignable.
// const h: { a: { b: [string] } } = { a: { b: ["xxx", "yyy"] } };
// const hhhh: { a: { b: [number | string] } } = h;
// // un-assignable
// // i. (a: number) => string and (b: number) => string
// // assignable
// // j. (a: number) => string and (a: string) => string
// // un-assignable
// // k. (a: number | string) => string and (a: string) => string
// // assignable!!!!!!!!!!
// // For the argument of the function, contravariant one is assignable.
// type g = (a: string) => string;
// const f: g = (a) => a.toString();
// // l. E.X (defined in an enum enum E {X = 'X'}) and F.X (defined in an enum enum F {X = 'X'})
// // un-assignable.
// // const enum E {
// //   X = "X",
// // }
// // const enum F {
// //   X = "X",
// // }
// // const a: F.X = E.X; // -> Type 'E' is not assignable to type 'F'.ts(2322)
// // a;
// // 2. If you have an object type type O = {a: {b: {c: string}}},
// // what’s the type of keyof O? What about O['a']['b'] ?
// type O = { a: { b: { c: string } } };
// type OO = keyof O; // "a"
// type OOO = O["a"]["b"]; // { c: string }
// // 3. Write an Exclusive<T, U> type that computes the types that are in either T or U, but not both.
// // For example, Exclusive < 1 | 2 | 3, 2 | 3 | 4 > should resolve to 1 | 4.
// // Write out step by step how the typechecker evaluates Exclusive<1 | 2, 2 | 4>.
// type Eliminated<T, U> = T extends U ? never : T;
// type Exclusive<T, U> = Eliminated<T | U, T & U>;
// // n.g.
// // type Exclusive<T, U> = T | U extends T & U ? never : T | U;
// // below are tests.
// const aaa: Exclusive<1 | 2, 2 | 4> = 1; // okay
// aaa;
// // const bbb: Exclusive<1 | 2, 2 | 4> = 2; // ng
// // bbb;
// // const cccc: Exclusive<1 | 2, 2 | 4> = 3; // ng
// // cccc;
// const ddd: Exclusive<1 | 2, 2 | 4> = 4; // okay
// ddd;
// const eeee: Exclusive<1 | 2 | 3, 2 | 3 | 4> = 1; // ok
// eeee;
// // const fff: Exclusive<1 | 2 | 3, 2 | 3 | 4> = 2; // ng
// // fff;
// // const gggg: Exclusive<1 | 2 | 3, 2 | 3 | 4> = 3; // ng
// // gggg;
// const hhh: Exclusive<1 | 2 | 3, 2 | 3 | 4> = 4; // ok
// hhh;
// // 4. Rewrite the example (from “Definite Assignment Assertions” on page 151) to avoid the definite assignment assertion.
// let userId: string | undefined;
// userId = fetchUser();
// userId.toUpperCase(); // OK
// function fetchUser() {
//   return "xxxxxx";
// }
//# sourceMappingURL=chapter6.js.map