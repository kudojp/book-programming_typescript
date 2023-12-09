"use strict";
// // tsc && node dist/index.js
// // // let i: 3 = 3;
// // // i = 4;
// // // function f(n) {
// // //   // Error TS7006: Parameter 'n' implicitly has an 'any' type. console.log(n)
// // //   n;
// // // }
// // // type x = { a: number } | { b: string };
// // // const xx: x = { a: 12, b: '14' };
// // type Filter = {
// //   <T>(array: T[], f: (item: T) => boolean): T[];
// // };
// // const f: Filter = (a, f) => {
// //   const result = [];
// //   for (const item of a) {
// //     if (f(item)) {
// //       result.push(item);
// //     }
// //   }
// //   return result;
// // };
// // f([1, 2, 3], (_) => _ > 2);
// // f(["a", "b"], (_) => _ !== 12);
// // let names = [
// //   { firstName: "beth" },
// //   { firstName: "caitlyn" },
// //   { firstName: "xin" },
// // ];
// // type myMap<T> = (array: T[], f: (item: T) => T) => T[];
// // const map: myMap<T> = (array, f) => {
// //   let result = [];
// //   for (let i = 0; i < array.length; i++) {
// //     result[i] = f(array[i].toUpperCase());
// //   }
// //   return result;
// // };
// // console.log(map([1, 2, 3], (x: any) => x * 2));
// // type Filter = {
// //   <T>(array: T[], f: (item: T) => boolean): T[];
// // };
// // const f: Filter = (a, f) => {
// //   const result = [];
// //   for (const item of a) {
// //     if (f(item)) {
// //       result.push(item);
// //     }
// //   }
// //   return result;
// // };
// // const a: number = null;
// // let promise = new Promise<number>((resolve) => resolve(45));
// // promise.then(
// //   (
// //     result // Inferred as {}
// //   ) => result * 4 // Error TS2362: The left-hand side of an arithmetic operation must )
// // );
// type TreeNode = { value: string };
// type LeafNode = TreeNode & {
//   isLeaf: true;
// };
// type InnerNode = TreeNode & {
//   children: [TreeNode] | [TreeNode, TreeNode];
// };
// type MapNode = <NT extends TreeNode>(n: NT, f: (v: string) => string) => NT;
// const mapNode: MapNode = (n, f) => {
//   return {
//     ...n,
//     value: f(n.value),
//   };
// };
// let a: TreeNode = { value: "a" };
// let b: LeafNode = { value: "b", isLeaf: true };
// let c: InnerNode = { value: "c", children: [b] };
// a = mapNode<TreeNode>(a, (_) => _.toUpperCase()); //TreeNode
// b = mapNode<LeafNode>(b, (_) => _.toUpperCase()); // LeafNode
// c = mapNode<InnerNode>(c, (_) => _.toUpperCase()); // InnerNode
// console.log(a);
// // type MapNode = (n: TreeNode, f: (v: string) => string) => TreeNode;
// // const mapNode: MapNode = (n, f) => {
// //   return {
// //     ...n,
// //     value: f(n.value),
// //   };
// // };
// // let a: TreeNode = { value: "a" };
// // let b: LeafNode = { value: "b", isLeaf: true };
// // let c: InnerNode = { value: "c", children: [b] };
// // a = mapNode(a, (_) => _.toUpperCase()); //TreeNode
// // b = mapNode(b, (_) => _.toUpperCase()); // LeafNode
// // c = mapNode(c, (_) => _.toUpperCase()); // InnerNode
// // console.log(a1);
// // function fill(length: number, value: string): string[] {
// //   return Array.from({ length }, () => value);
// // }
// // function call<T extends unknown[], R>(f: (...args: T) => R, ...args: T): R {
// //   return f(...args);
// // }
// // let aa = call(fill, 10, "a");
// // ---------Chapter 4 exercises-----------------
// // (3)
// type Reservation = void;
// // {
// //   from: Date;
// //   to?: Date;
// //   destination: string;
// // };
// type Reserve = {
//   (from: Date, to: Date, destination: string): Reservation; // Book a round trip
//   (from: Date, destination: string): Reservation; // Book a one-way trip
//   (destination: string): Reservation; // Book a trip with no date
// };
// let reserve: Reserve = (
//   fromOrDestination: Date | string,
//   toOrDestination?: Date | string,
//   destination?: string
// ) => {
//   if (
//     typeof fromOrDestination === "string" &&
//     toOrDestination === undefined &&
//     destination === undefined
//   ) {
//     // Book a trip with no date
//     return;
//   }
//   if (
//     fromOrDestination instanceof Date &&
//     typeof toOrDestination === "string" &&
//     destination !== undefined
//   ) {
//     // Book a one-way trip
//     return;
//   }
//   if (
//     fromOrDestination instanceof Date &&
//     toOrDestination instanceof Date &&
//     typeof destination === "string"
//   ) {
//     // Book a round trip
//     return;
//   }
//   throw Error;
// };
// // (4)
// // function call<S, T extends unknown[], R>(
// //   f: (arg1: S, arg2: string, ...rest: T) => R,
// //   arg1: S,
// //   arg2: string,
// //   ...args: T
// // ): R {
// //   return f(arg1, arg2, ...args);
// // }
// function call<T extends [unknown, string, ...unknown[]], R>(
//   f: (...args: T) => R,
//   ...args: T
// ): R {
//   return f(...args);
// }
// function fill(length: number, value: string): string[] {
//   return Array.from({ length }, () => value);
// }
// function fill2(length: number, value: number): number[] {
//   return Array.from({ length }, () => value);
// }
// call(fill, 10, "a");
// // call(fill2, 22, 222);　// compile error
// // (5). Implement a small typesafe assertion library, is. Start by sketching out
// // your types. When you’re done, I should be able to use it like this:
// function is<T>(arg1: T, ...args: [T, ...T[]]): boolean {
//   if (!typeof Array) {
//     return args.every((arg) => arg === arg1);
//   }
//   return args.every((arg) => arg === arg1);
// }
// // function is<T>(arg1: T, ...args: [T, ...T[]]): boolean {
// //   return args.every((arg) => arg === arg1);
// // }
// // Compare a string and a string
// console.log(is("string", "string")); // should complain
// // Compare a boolean and a boolean
// console.log(is(true, false)); // false
// // Compare a number and a number
// // console.log(is(42)); // compile error
// console.log(is(42, 42)); // true
// console.log(is(42, 42, 42)); // true
// // Comparing two different types should give a compile-time error
// // console.log(is(10, "foo")); // Error TS2345: Argument of type '"foo"' is not assignable
// // to parameter of type 'number'.
// // [Hard] I should be able to pass any number of arguments
// console.log(is([1], [1])); // seems true, but okay is false. ref. https://github.com/bcherny/programming-typescript-answers/issues/6#issuecomment-623027916
// console.log(is([1], [1, 2], [1, 2, 3])); // false
// const ar: number[] = [1];
// console.log(is(ar, ar)); // true
// Chapter 5
// Represents a chess game
// class Game {
//   private pieces = Game.makePieces();
//   private static makePieces() {
//     return [
//       // Kings
//       new King("White", "E", 1),
//       new King("Black", "E", 8),
//       // Queens
//       new Queen("White", "D", 1),
//       new Queen("Black", "D", 8),
//       // Bishops
//       new Bishop("White", "C", 1),
//       new Bishop("White", "F", 1),
//       new Bishop("Black", "C", 8),
//       new Bishop("Black", "F", 8),
//     ];
//   }
// }
// // A set of coordinates for a piece
// class Position {
//   constructor(private file: File, private rank: Rank) {}
//   distanceFrom(position: Position) {
//     return {
//       rank: Math.abs(position.rank - this.rank),
//       file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
//     };
//   }
// }
// // A chess piece
// abstract class Piece {
//   protected position: Position;
//   constructor(private readonly color: Color, file: File, rank: Rank) {
//     this.position = new Position(file, rank);
//   }
//   moveTo(position: Position) {
//     this.position = position;
//   }
//   abstract canMoveTo(position: Position): boolean;
// }
// // There are six types of pieces:
// class King extends Piece {
//   canMoveTo(position: Position) {
//     let distance = this.position.distanceFrom(position);
//     return distance.rank < 2 && distance.file < 2;
//   }
// }
// class Queen extends Piece {}
// class Bishop extends Piece {}
// class Knight extends Piece {}
// class Rook extends Piece {}
// class Pawn extends Piece {}
// type Color = "Black" | "White";
// type File = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
// type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// const p = new Piece("Black", "A", 1);
// class Zebra {
//   trot() {
//     // ...
//   }
// }
// class Poodle {
//   trot() {
//     // ...
//   }
// }
// function ambleAround(animal: Zebra) {
//   animal.trot();
// }
// let zebra = new Zebra();
// let poodle = new Poodle();
// ambleAround(zebra); // OK
// ambleAround(poodle); // OK
//# sourceMappingURL=chapter1-4.js.map