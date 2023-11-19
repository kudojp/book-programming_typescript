// Chapter 5 Exercises

// (2) private vs protected constructor
class Animal {
  protected constructor(public name: string) {}

  // static build(name: string) {
  //   return new Animal(name);
  // }
}

class Dog extends Animal {
  public constructor(public name: string) {
    super(name);
  }
}

const c = new Dog("john");
// const c = Animal.build("john");
console.log(c.name);

// -> Some, if the constructor is private: (That class is not instantiateable from outside, The super class cannot be created)
//          if it is protected:            (That class is not instantiateable from outside, The super class can be created, ⭐️ But the super class is not instantiateable from out side.)

// (3) Shoes.

type Shoe = { purpose: string };
class BalletFlat implements Shoe {
  purpose = "dancing";
}
class Boot implements Shoe {
  purpose = "woodcutting";
}
class Sneaker implements Shoe {
  purpose = "walking";
}

// ------------ bad -------------

type CreateBalletFlatType = (type: "balletFlat") => BalletFlat;
type CreateBootType = (type: "boot") => Boot;
type CreateSneakerType = (type: "sneaker") => Sneaker;
type merged = CreateBalletFlatType | CreateBootType | CreateSneakerType;

const x = (type: "balletFlat" | "boot" | "sneaker") => {
  switch (type) {
    case "balletFlat":
      return new BalletFlat();
    case "boot":
      return new Boot();
    case "sneaker":
      return new Sneaker();
  }
};

// const sx = x("balletFlat");
// ^ Argument of type 'string' is not assignable to parameter of type 'never'.ts(2345)

// 関数の型同士をまーじしても、(まーじされた引数) => まーじされた返り値 にはならない。

// ------------ good ------------

// 一方で、objectのfieldのmethod同士をまーじすると、(まーじされた引数) => まーじされた返り値 を実装すれば良い。
// 呼び出し側では、methodのどれに当たるかを見て、型推論が働く。

// なお、下の実験の通り、呼び出し側は、unionではなく、それぞれのmethod型のどれかにマッチする必要がある。

// NOTE: this is an object type.
interface ShoeCreator {
  create(type: "balletFlat"): BalletFlat;
  create(type: "boot"): Boot;
  create(type: "sneaker"): Sneaker;
}

const shoe: ShoeCreator = {
  create: (type: "balletFlat" | "boot" | "sneaker") => {
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
const f = (number: 1 | 2) => {
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
