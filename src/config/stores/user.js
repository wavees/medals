// import
import { writable } from "svelte/store";
import axios from "axios";

import { url, version } from "../application/api";

// 
// func createUserStore()
// This function will create
// user store, that we'll use
// later in application.
// 
function createUserStore() {
  // Default object for the store
  let store = {
    loaded: false,
    error: null,

    current: {
      id: null,
      token: null,
      email: null,
      username: null,
      avatar: null,
      coins: 100
    },

    tokens: [],

    profiles: []
  };

  // Get some functions from writable store...
  const { subscribe, set, update } = writable(store);

  // Return subscribe function and some other
  // functions to manipulate this store.
  return {
    subscribe,

    // clearStore
    // Clears this store
    clearStore: () => {
      update((object) => {
        object.current = {
          token: null
        };

        object.tokens = [];
        object.profiles = [];
      
        return object;
      });
    },

    // setToken
    // Set session/user token (We'll get user information
    // and store it in current object)
    setToken: (token) => {
      // Let's get that user object..
      axios.get(`${url}/${version}/account/${token}`)
      .then((response) => {
        let data = response.data;

        // Let's determine what type of object
        // is it.
        if (data.type == "user") {
          // And now let's populate our store with new data
          update((object) => {
            object.loaded = true;

            object.current.id       = data.uid;
            object.current.token    = token;
            object.current.email    = data.email;
            object.current.username = data.username;
            object.current.avatar   = data.avatar;
            object.current.coins    = data.coins;

            object.tokens           = [token];
            
            return object;
          });
        } else if (data.type == "session") {
          // Let's update our store with
          // new data
          update((object) => {
            object.loaded = true;

            object.tokens = data.profiles;
            return object;
          });

          // And now let's get some data on current
          // user account and then let's populate
          // our store with new data.
          let currentToken = data.current.token == null ? data.profiles[0] : data.current.token;

          axios.get(`${url}/${version}/account/${currentToken}`)
          .then((response) => {
            let data = response.data;

            // And now let's populate our store with new data
            update((object) => {
              object.current.id       = data.uid;
              object.current.token    = currentToken;
              object.current.email    = data.email;
              object.current.username = data.username;
              object.current.avatar   = data.avatar;
              object.current.coins    = data.coins;

              return object;
            });
          });
        } else {
          update((object) => {
            object.loaded = true;
            object.error = null;

            return object;
          });
        };
      }).catch(() => {
        update((object) => {
          object.loaded = false;
          object.error = "NotFound";

          return object;
        });
      });
    },

    // setLoaded
    // Changes object.loaded state to { state }.
    setLoaded: (state) => {
      update((object) => {
        object.loaded = state;

        return object;
      });
    },

    // loadProfiles
    // Load profiles (their avatars, emails and so on) to
    // local storage.
    loadProfiles: (tokens) => {
      // Let's firstly clear profiles
      // array.
      update((object) => {
        object.profiles = [];
        return object;
      });

      // And now let's load a bunch
      // of new profiles.
      tokens.forEach((token) => {
        loadProfile(token);
      });
    },

    addProfile: (data) => {
      update((object) => {
        object.profiles.push(data);

        return object;
      });
    }

    // setCurrent
    // Set current token. This function will check
    // for token usability and then it'll set it
    // as current token.

    // Don't need it anymore.
  }
};

const user = createUserStore();

async function loadProfile(token) {
  axios.get(`${url}/${version}/account/${token}`)
  .then((response) => {
    let data = response.data;

    if (data.type == "user") {
      let profile = {
        id: data.uid,

        email: data.email,
        username: data.username,

        avatar: data.avatar,
        token: token,

        coins: data.coins
      };

      user.addProfile(profile);
    };
  }).catch((error) => {
    let data = {};
    if (error.response != null) {
      data = error.response.data;
    };

    if (data.error != "UserNotFound") {
      loadProfile(token);
    };
  });
};

export { user };

// 
// func createCurrentUserStore()
// This function will create
// store for currently viewed
// user. And this store, by the
// way, will store all needed information
// about this user.
function createCurrentUserStore() {
  // Main store structure
  let store = {
    username: null,

    email: null,
    avatar: null,
  
    uid: null,

    loaded: false
  };

  // Let's now get some 
  const { subscribe, set, update } = writable(store);

  return {
    subscribe,

    // loadProfile
    // This function will
    // load user profile
    // and store it in this
    // store.
    loadProfile: (uid) => {
      // And now let's try to fetch some information
      // about this account...
      axios.get(`${url}/${version}/user/${uid}`)
      .then((response) => {
        let data = response.data;

        update((object) => {
          object.username = data.username;
          object.email    = data.email;
          object.avatar   = data.avatar;
          object.id       = id;
          object.coins    = data.coins;

          object.loaded   = true;

          return object;
        });
      }).catch(() => {
        update((object) => {
          object.loaded = true;

          return object;
        })
      });
    }
  }
};

const current = createCurrentUserStore();

export { current };