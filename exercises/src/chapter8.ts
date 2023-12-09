// Exercises:
// 1. Implement a general-purpose promisify function,
//    which takes any function that takes exactly one argument and a callback and wraps it in a function that returns a promise.

import { readFile } from "fs";
import { resolve } from "path";

function promisify<RawArgT, ResultT>(
  rawFn: (
    arg: RawArgT,
    callback: (err: any, data: ResultT) => void | any[]
  ) => void | any[]
): (argVal: any) => Promise<ResultT> {
  const fn = (argVal: any) => {
    return new Promise<ResultT>((resolveCb, rejectCb) => {
      try {
        rawFn(argVal, (err: any, data: ResultT) => {
          if (data) {
            resolveCb(data);
          } else {
            rejectCb(err.toString());
          }
        });
      } catch (err: any) {
        rejectCb(err.toString());
      }
    });
  };
  return fn;
}

let readFilePromise = promisify(readFile);
readFilePromise("./xxx.ts")
  .then((result) => console.log("success reading file", result.toString()))
  .catch((error) => console.error("error reading file", error));

readFilePromise("./tsconfig.json")
  .then((result) => console.log("success reading file", result.toString()))
  .catch((error) => console.error("error reading file", error));

// --- skipped (2), (3)

// 2. In the section on “Typesafe protocols” on page 194 we derived one half of a protocol for typesafe matrix math. Given this half of the protocol that runs in the main thread, implement the other half that runs in a Web Worker thread.
// 3. Use a mapped type (as in “In the Browser: With Web Workers” on page 187) to implement a typesafe message-passing protocol for NodeJS’s child_process.
//# sourceMappingURL=index.js.map

// Exercises:
// 1. Implement a general-purpose promisify function,
//    which takes any function that takes exactly one argument and a callback and wraps it in a function that returns a promise.
// const fs_1 = require("fs");
// function promisify(rawFn) {
//     const fn = (argVal) => {
//         return new Promise((resolveCb, rejectCb) => {
//             try {
//                 rawFn(argVal, (err, data) => {
//                     if (data) {
//                         resolveCb(data);
//                     }
//                     else {
//                         rejectCb(err.toString());
//                     }
//                 });
//             }
//             catch (err) {
//                 rejectCb(err.toString());
//             }
//         });
//     };
//     return fn;
// }
// let readFilePromise = promisify(fs_1.readFile);
// readFilePromise("./xxx.ts")
//     .then((result) => console.log("success reading file", result.toString()))
//     .catch((error) => console.error("error reading file", error));
// readFilePromise("./tsconfig.json")
//     .then((result) => console.log("success reading file", result.toString()))
//     .catch((error) => console.error("error reading file", error));
// // type Promisify = (
// //   arg: any,
// //   callback: () => void // TODO: change type
// // ) => Promise<any>
// // const promisify: Promisify = (arg: any, callback: () => void) => {
// //   callback()
// //   // executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void
// //   const resolveCb = (value: any) => { }
// //   const rejectCb = (reason?: any) => { }
// //   return new Promise((resolveCb, rejectCb) => {});
// // };
// // let readFilePromise = promisify(readFile)
// // readFilePromise('./myfile.ts')
// //   .then(result => console.log('success reading file', result.toString()))
// //   .catch(error => console.error('error reading file', error))
// // 2. In the section on “Typesafe protocols” on page 194 we derived one half of a protocol for typesafe matrix math. Given this half of the protocol that runs in the main thread, implement the other half that runs in a Web Worker thread.
// // 3. Use a mapped type (as in “In the Browser: With Web Workers” on page 187) to implement a typesafe message-passing protocol for NodeJS’s child_process.
// //# sourceMappingURL=index.js.map
