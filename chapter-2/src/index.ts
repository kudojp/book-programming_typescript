// Chapter 5 Exercises

// (2) private vs protected constructor
class Animal {
  protected constructor(public name: string) {}

  // static build(name: string) {
  //   return new Animal(name);
  // }
}

class Dog extends Animal{
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
  create(type: "balletFlat"): BalletFlat
  create(type: "boot"): Boot
  create(type: "sneaker"): Sneaker
}

const shoe: ShoeCreator = {
  create: (type: 'balletFlat' | 'boot' | 'sneaker') => {
    switch (type) {
      case "balletFlat":
        return new BalletFlat();
      case "boot":
        return new Boot();
      case "sneaker":
        return new Sneaker();
    }
  }
}

const result = shoe.create("boot")

// ------------------- 実験 -----------------------
const f = (number: 1 | 2) {
  switch (number) {
    case 1: return "boot"
    case 2: return "sneaker"
  }
}

const t = f(1)
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





// Chapter 7.

// Option type
interface Option<T> {
  flatMap<U>(f: (value: T) => None): None;
  // flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  getOrElse(defaultValue: T): T;
}

class Some<T> implements Option<T> {
  constructor(private value: T) {}

  // interfaces
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  // implementation
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  // flatMap<U>(f: (value: T) => None): None | (f: (value: T) => Option<U> | Option<U> } } {
  //   return a;

  //   (a: any) => {
  //     return a;
  //   };
  // }
  getOrElse(defaultValue: T): T {
    return this.value;
  }
}

class None implements Option<never> {
  flatMap(e: any): None {
    return new None();
  }
  getOrElse<U>(defaultValue: U): U {
    return defaultValue;
  }
}

// interfaces
function OptionX<T>(value: null | undefined): None;
function OptionX<T>(value: T): Some<T>;
// implementation signature
function OptionX<T>(value: T): Option<T> {
  if (value == null) {
    return new None();
  }
  return new Some(value);
}

let o1 = OptionX(6)
  .flatMap((n: number) => OptionX(2 * n))
  .flatMap((n: number) => OptionX(n + 1));

// console.log(o1.getOrElse(10000));

let o2 = OptionX(6)
  .flatMap((n: number) => new Some(null))
  .flatMap((n: any) => OptionX(n + 1));

// console.log(o2.getOrElse(200000));

// Chapter7. Exercise

type UserID = number;

class API {
  getLoggedInUserID(): Option<UserID> {
    const error = false;
    if (error) {
      return new None();
    } else {
      return new Some(12);
    }
  }
  getFriendIDs(userID: UserID): Option<UserID[]> {
    // if (userID instanceof None) {
    //   return new None();
    // }

    const error = true;
    if (error) {
      return new None();
    } else {
      return new Some([1, 2, 3]);
    }
  }

  getUserName(userID: UserID): Option<string> {
    const error = false;
    if (error) {
      return new None();
    } else {
      return new Some(userID.toString());
    }
  }

  getUserNames(userIDs: UserID[]): Option<string[]> {
    // if (userID instanceof None) {
    //   return new None();
    // }

    const error = false;
    if (error) {
      return new None();
    } else {
      return new Some(userIDs.map((userID: UserID) => userID.toString()));
    }
  }
}

// warm up
const api = new API();
const friendNames = api
  .getLoggedInUserID()
  .flatMap((userID: UserID) => api.getFriendIDs(userID))
  .flatMap((userIDs: UserID[]) => api.getUserNames(userIDs))
  .getOrElse(["Fetching List Failed"]);

// console.log(friendNames);

// use getUserName, not getUserNames
const friendNames2 = api
  .getLoggedInUserID()
  .flatMap((userID: UserID) => api.getFriendIDs(userID))
  .flatMap((userIDs: UserID[]) => {
    const friendNames = userIDs.map((userID: UserID) =>
      api.getUserName(userID).getOrElse("FriendName Fetch failed")
    );
    return new Some(friendNames);
  })
  .getOrElse(["Fetching List Failed"]);

// console.log(friendNames2);


// Chapter9. Asynchronous programming


type Executor = (
  resolve: Function,
  reject: Function,
) => void

class MyPromise {
  constructor(f: Executor) { }  
}
