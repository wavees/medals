<script>
  // Let's now import some stores.
  import axios from "axios";
  import { api } from "../../config/stores/global"

  import { user } from "../../config/stores/user";
  import { cards } from "../../config/stores/cards";

  import { onMount } from "svelte";

  // Importing components.
  import Card from "./Card.svelte";

  let cardNumber = 0;
  let cardsIds = [];

  // onMount event
  onMount(() => {
    // Let's firstly clear our
    // cards store.
    cards.clearStore();

    // And now let's get medals list...
    const uid   = $user.current.id;

    // And now let's get our cards..
    axios.get(`${$api.url}/${$api.version}/account/${uid}/medals/list`)
    .then((response) => {
      let data = response.data;

      // And now let's process our
      // cards.
      if (data.length >= 1) {
        // Let's now update our cards ids..
        cardsIds = data.map(card => card.mid).slice(0, cardsNumber == 0 ? data.length : cardsNumber)

        // And let's ask CARDS store
        // to gather information about
        // every card.
        cardsIds.forEach((cardId) => {
          cards.gatherInformation(cardId);
        });
      };
    });
  });

  // Let's now export some config
  // variables...
  export let cardsNumber = 2;
</script>

{ #each cardsIds as cardId }
  <Card margin="mx-4 lg:mt-6" id={cardId} />
{ /each }