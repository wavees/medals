// Importing modules and cofnigs..
import axios from "axios"
import { url, version } from "../application/api";

import { readable, writable } from 'svelte/store';

// Function, that'll
// create our cards store.
function createCardsStore() {
  // Let's prepare store's initial
  // object.
  let store = [];
  let cardsIds = [];

  // Now we need to get some methods
  // from svelte writable store.
  const { subscribe, set, update } = writable(store);

  // And now let's make our new store
  // and return it.
  return {
    subscribe,

    // Method, that'll gather
    // information about cards.
    gatherInformation: (id) => {
      // Firstly, let's add this id to cardsIds,
      // so we'll be able to gather updated info
      // for this card.
      if (!cardsIds.includes(id)) {
        cardsIds.push(id);
      };

      // And now let's just gather information
      // about this card and let's update
      // out store.
      axios.get(`${url}/${version}/medal/${id}`)
      .then((response) => {
        let data = response.data;
        
        if (data.error == null) {
          // And now let's check all
          // information about this card.
          let card = {
            loaded: true,

            title: data.title,
            subtitle: data.subtitle,

            createTime: data.createTime
          };

          // And now we need to add special
          // information about this card.
          if (data.type == "secondary") {
            // It's a secondary card! Let's get
            // and then add some information about
            // it's owner.
            let uid = data.uid;

            card.type   = "secondary";
            card.agreed = data.agreed;

            axios.get(`${url}/${version}/user/${uid}`)
            .then((response) => {
              let data = response.data;

              if (data.type == "user") {
                // Let's now update this card's information...
                card.user   = {
                  email: data.email,
                  username: data.username,
                  avatar: data.avatar
                };

                // And now let's update our store.
                update((object) => {
                  object[id] = card;

                  return object;
                });
              };
            }).catch((error) => {
              console.log(error);
            });
          } else if (data.type == "primary") {
            // It's a primary card, so we need to get
            // some information about it's creator.
            let uid = data.creatorId;
            card.type = "primary";

            axios.get(`${url}/${version}/user/${uid}`)
            .then((response) => {
              let data = response.data;

              if (data.type == "user") {
                // Let's now update this card's information...
                card.creator   = {
                  email: data.email,
                  username: data.username,
                  avatar: data.avatar
                };

                // And now let's update our store.
                update((object) => {
                  object[id] = card;

                  return object;
                });
              };
            }).catch((error) => {
              console.log(error);
            });
          };
        };
      }).catch((error) => {
        // Nice error handler :thumbsup:
        console.log(error);
      });
    }
  }
};

// And now let's just export this store.
const cards = createCardsStore();

export { cards };