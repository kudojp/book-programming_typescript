"use strict";
// Chapter 5 Exercises
// (2) private vs protected constructor
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
        this.name = name;
    }
}
const c = new Dog("john");
// const c = Animal.build("john");
console.log(c.name);
class BalletFlat {
    constructor() {
        this.purpose = "dancing";
    }
}
class Boot {
    constructor() {
        this.purpose = "woodcutting";
    }
}
class Sneaker {
    constructor() {
        this.purpose = "walking";
    }
}
const x = (type) => {
    switch (type) {
        case "balletFlat":
            return new BalletFlat();
        case "boot":
            return new Boot();
        case "sneaker":
            return new Sneaker();
    }
};
const shoe = {
    create: (type) => {
        switch (type) {
            case "balletFlat":
                return new BalletFlat();
            case "boot":
                return new Boot();
            case "sneaker":
                return new Sneaker();
        }
    },
};
const result = shoe.create("boot");
// ------------------- 実験 -----------------------
const f = (number) => {
    switch (number) {
        case 1:
            return "boot";
        case 2:
            return "sneaker";
    }
};
const t = f(1);
// const s = shoe.create(t)
// ^
// No overload matches this call.
//   Overload 1 of 3, '(type: "balletFlat"): BalletFlat', gave the following error.
//     Argument of type '"boot" | "sneaker"' is not assignable to parameter of type '"balletFlat"'.
//       Type '"boot"' is not assignable to type '"balletFlat"'.
//   Overload 2 of 3, '(type: "boot"): Boot', gave the following error.
//     Argument of type '"boot" | "sneaker"' is not assignable to parameter of type '"boot"'.
//       Type '"sneaker"' is not assignable to type '"boot"'.
//   Overload 3 of 3, '(type: "sneaker"): Sneaker', gave the following error.
//     Argument of type '"boot" | "sneaker"' is not assignable to parameter of type '"sneaker"'.
//       Type '"boot"' is not assignable to type '"sneaker"'.ts(2769)
// -----------------------------------------------------------
// Skipped
// (3)  [Hard] As an exercise, think about how you might design a typesafe builder pattern.
// Extend the Builder pattern “Builder Pattern” on page 109 to:
// a. Guarantee at compile time that someone can’t call .send before setting at least a URL and a method.
//    Would it be easier to make this guarantee if you also force the user to call methods in a specific order ?
//    (Hint: what can you return instead of this ?)
// b. [Harder] How would you change your design if you wanted to make this guarantee, but still let people call methods in any order?
//    (Hint: what TypeScript feature can you use to make each method’s return type “add” to the this type after each method call ?)
// abstract class RequestBuilderBase {
//   private method: "get" | "post" | null = null;
//   private data: object | null = null;
//   private url: string | null = null;
//   setMethod: (method: "get" | "post") => RequestBuilderWithData;
//   // setData(data: object): this {
//   //   this.data = data;
//   //   return this;
//   // }
//   // setURL(url: string): this {
//   //   this.url = url;
//   //   return this;
//   // }
//   // send() {
//   //   console.log("sent");
//   // }
// }
// class RequestBuilder {
//   private method: "get" | "post" | null = null;
//   // private data: object | null = null;
//   // private url: string | null = null;
//   setMethod(method: "get" | "post"): RequestBuilderWithData {
//     this.method = method;
//     return this;
//   }
//   // setData(data: object): this {
//   //   this.data = data;
//   //   return this;
//   // }
//   // setURL(url: string): this {
//   //   this.url = url;
//   //   return this;
//   // }
//   // send() {
//   //   console.log("sent");
//   // }
// }
// // class RequestBuilderWithMethod extends RequestBuilder {
// //   private method: "get" | "post" | null = null;
// //   setMethod(method: "get" | "post" | null) {
// //     this.method = method;
// //     return this;
// //   }
// // }
// class RequestBuilderWithData extends RequestBuilder {
//   // private data: object | null = null;
//   setData(data: object): RequestBuilderWithUrl {
//     this.data = data;
//     return this;
//   }
// }
// class RequestBuilderWithUrl extends RequestBuilder {
//   private url: string | null = null;
//   setUrl(url: string): RequestBuilderWithUrl {
//     this.url = url;
//     return this;
//   }
// }
// class RequestBuilderSendable extends RequestBuilder {
//   send() {
//     console.log("data sent");
//   }
// }
// new RequestBuilder()
//   .setMethod("get")
//   .setURL("/users")
//   .setData({ firstName: "Anna" })
//   .send();
//# sourceMappingURL=chapter5.js.map