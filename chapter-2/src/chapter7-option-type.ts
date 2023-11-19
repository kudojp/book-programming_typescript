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

type Executor = (resolve: Function, reject: Function) => void;

class MyPromise {
  constructor(f: Executor) {}
}
