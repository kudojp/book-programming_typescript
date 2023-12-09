"use strict";
// Chapter 7.
class Some {
    constructor(value) {
        this.value = value;
    }
    // implementation
    flatMap(f) {
        return f(this.value);
    }
    // flatMap<U>(f: (value: T) => None): None | (f: (value: T) => Option<U> | Option<U> } } {
    //   return a;
    //   (a: any) => {
    //     return a;
    //   };
    // }
    getOrElse(defaultValue) {
        return this.value;
    }
}
class None {
    flatMap(e) {
        return new None();
    }
    getOrElse(defaultValue) {
        return defaultValue;
    }
}
// implementation signature
function OptionX(value) {
    if (value == null) {
        return new None();
    }
    return new Some(value);
}
let o1 = OptionX(6)
    .flatMap((n) => OptionX(2 * n))
    .flatMap((n) => OptionX(n + 1));
// console.log(o1.getOrElse(10000));
let o2 = OptionX(6)
    .flatMap((n) => new Some(null))
    .flatMap((n) => OptionX(n + 1));
class API {
    getLoggedInUserID() {
        const error = false;
        if (error) {
            return new None();
        }
        else {
            return new Some(12);
        }
    }
    getFriendIDs(userID) {
        // if (userID instanceof None) {
        //   return new None();
        // }
        const error = true;
        if (error) {
            return new None();
        }
        else {
            return new Some([1, 2, 3]);
        }
    }
    getUserName(userID) {
        const error = false;
        if (error) {
            return new None();
        }
        else {
            return new Some(userID.toString());
        }
    }
    getUserNames(userIDs) {
        // if (userID instanceof None) {
        //   return new None();
        // }
        const error = false;
        if (error) {
            return new None();
        }
        else {
            return new Some(userIDs.map((userID) => userID.toString()));
        }
    }
}
// warm up
const api = new API();
const friendNames = api
    .getLoggedInUserID()
    .flatMap((userID) => api.getFriendIDs(userID))
    .flatMap((userIDs) => api.getUserNames(userIDs))
    .getOrElse(["Fetching List Failed"]);
// console.log(friendNames);
// use getUserName, not getUserNames
const friendNames2 = api
    .getLoggedInUserID()
    .flatMap((userID) => api.getFriendIDs(userID))
    .flatMap((userIDs) => {
    const friendNames = userIDs.map((userID) => api.getUserName(userID).getOrElse("FriendName Fetch failed"));
    return new Some(friendNames);
})
    .getOrElse(["Fetching List Failed"]);
// console.log(friendNames2);
//# sourceMappingURL=chapter7-option-type.js.map