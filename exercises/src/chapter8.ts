// Exercises:
// 1. Implement a general-purpose promisify function,
//    which takes any function that takes exactly one argument and a callback and wraps it in a function that returns a promise.
const fs_1 = require("fs");
function promisify(rawFn) {
  const fn = (argVal) => {
    return new Promise((resolveCb, rejectCb) => {
      try {
        rawFn(argVal, (err, data) => {
          if (data) {
            resolveCb(data);
          } else {
            rejectCb(err.toString());
          }
        });
      } catch (err) {
        rejectCb(err.toString());
      }
    });
  };
  return fn;
}
let readFilePromise = promisify(fs_1.readFile);
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
