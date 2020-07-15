<script>
  // Let's now import some modules.
  import axios from "axios";
  import { onMount } from "svelte";

  import { user } from "../../config/stores/user";
  import { api } from "../../config/stores/global";

  import { _ } from "svelte-i18n";

  // Importing components.
  import {
    Avatar,

    colors
  } from "darkmode-components/src/index"

  import Heading from "../Typo/Heading.svelte"
  import Caption from "../Typo/Caption.svelte"

  let cardNumber = 0;
  let cards = [];

  // onMount event
  onMount(() => {
    const token = $user.current.token;
    const uid   = $user.current.id;

    // And now let's get our cards..
    axios.get(`${$api.url}/${$api.version}/account/${uid}/medals/list`)
    .then((response) => {
      let data = response.data;

      // And now let's process our
      // cards.
      if (data.length >= 1) {
        data.forEach((object) => {
          // And now let's load
          // every card.
          if (object.mid) {
            loadCard(object.mid);
          };
        });
      };
    });
  });

  // Function, that'll load some information about
  // specific card.
  function loadCard(id) {
    // Let's now get information about this card..
    axios.get(`${$api.url}/${$api.version}/medal/${id}`)
    .then((response) => {
      let data = response.data;

      // And now let's add this new card
      // to our array.
      let medal = {};
      if (data.type == "secondary") {
        medal.title = data.title;
        medal.subtitle = data.subtitle;

        medal.parent = data.pid;
        medal.agreed = data.agreed;

        medal.gradient = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
      };

      let newCards = cards;
      newCards.push(medal);

      // Let's now update our cards
      // array.
      if (newCards.length <= cardsNumber) {
        cards = newCards;
      };
    });
  };

  // Let's now export some config
  // variables...
  export let cardsNumber = 2;
</script>

{#each cards as card}
  <!-- 
    @card Shitiest card 
    Just a piece of shit, yeah
  -->
  <div style="background: linear-gradient(to right, #0f2027, #203a43, #2c5364); width: 16rem; height: 20rem;" class="rounded-lg mx-4 mt-6 lg:mt-6 flex justify-center items-center shadow-2xl text-white relative">
    
    <!-- Heading and icon -->
    <div class="px-6">
      <Heading>{@html card.title.replace("{name}", `<p class="inline text-green-300">${$user.current.username}</p>`)}</Heading>
      <Caption>{card.subtitle}</Caption>
    </div>

    <!-- People agreed and assigment -->
    <div class="absolute inset-x-0 bottom-0 w-full flex justify-between items-center px-6 py-4">
      <p class="text-xs">{card.agreed.length} {card.agreed.length > 1 ? $_("cards.agreed.multi", { default: "agreed" }) : $_("cards.agreed.one", { default: "agreed" })}</p>

      <div class="flex items-center">
        <p class="text-xs mx-2">{$user.current.username}</p>
        <Avatar type="image" avatar={$user.current.avatar} size={1.8} />
      </div>
    </div>
  </div>
{/each}