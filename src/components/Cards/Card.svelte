<script>
  // We need to import some modules
  // and user store.
  import { _ } from "svelte-i18n";

  import { user } from "../../config/stores/user";
  import { cards } from "../../config/stores/cards.js"

  import { onMount } from "svelte";

  // Importing components.
  import {
    Avatar,

    Spinner,
  } from "darkmode-components/src/index";

  import Heading from "../Typo/Heading.svelte"
  import Caption from "../Typo/Caption.svelte"

  // Let's firstly export some needed variables.
  export let size = "ordinary";
  export let id;

  // onMount event (Here
  // we'll gather information
  // about our card)
  onMount(() => {
    // And now let's promise
    // store named CARDS to gather
    // some information about this
    // card.
    cards.gatherInformation(id);
  });

  // And now we need to subscribe 
  // to cards store, and check whatever
  // card information changed or no.
  cards.subscribe((object) => {
    // Let's now update our card
    // information (if it changed)
    if (object[id] != null) {
      if (object[id].loaded == true) {
        // And now we need to update our
        // card information.
        card.loaded      = true;

        card.type        = object[id].type;

        card.title       = object[id].title;
        card.subtitle    = object[id].subtitle;
      };

      if (card.type == "secondary") {
        // And now we need to add some new
        // information about this card.
        card.agreed      = object[id].agreed;
        card.createTime  = object[id].createTime;

        card.user        = object[id].user;
        
        if (card.user == null) {
          card.user = {};
        };
      } else if (card.type == "primary") {
        // And here we go again: let's
        // add some information about this
        // card.
        card.creator     = object[id].creator;
        if (card.creator == null) {
          card.creator = {};
        };

        card.maximumUses = object[id].maximumUses;
      };
    };
  });

  // Card object.
  // We'll use it to store some
  // information about this card.
  let card = {
    loaded: false
  };
</script>

<!-- Card itself -->
<div style="background: linear-gradient(to right, #0f2027, #203a43, #2c5364); width: 16rem; height: 20rem;" class="rounded-lg mx-4 mt-6 lg:mt-6 flex justify-center items-center shadow-2xl text-white relative">
  
  <!-- Loading state -->
  { #if !card.loaded }
    <Spinner color="#fff" />
  { :else }
    <!-- Heading and icon -->
    <div class="px-6">
      <Heading>{@html card.title.slice(0, 45).replace("{name}", `<p class="inline text-red-200">${card.type == "primary" ? "You" : card.user.username == null ? "You" : card.user.username}</p>`)}{card.title.split('').length >= 45 ? "..." : ""}</Heading>
      <Caption>{card.subtitle.slice(0, 75)}{card.subtitle.split('').length >= 75 ? "..." : ""}</Caption>
    </div>

    <!-- People agreed and assigment/Creator of this card -->
    <div class="absolute inset-x-0 bottom-0 w-full flex { card.type == "secondary" ? "justify-between" : "justify-center" } items-center px-6 py-4">
      { #if card.type == "secondary" }
        <!-- 
          Let's show some information
          about master of this card.
         -->
        <p class="text-xs">{card.agreed.length} {card.agreed.length > 1 ? $_("cards.agreed.multi", { default: "agreed" }) : $_("cards.agreed.one", { default: "agreed" })}</p>

        <div class="flex items-center">
          <p class="text-xs mx-2">{card.user.username == null ? "Unknown" : card.user.username}</p>

          { #if card.user.avatar }
            <Avatar type="image" avatar="{card.user.avatar}" size={1.8} />
          { :else }
            <Avatar type="word" word="U" />
          { /if }
        </div>
      { :else if card.type == "primary" }
        <!-- 
          And here we are going to 
          show this card creator. -->
        {#if card.creator.avatar }
          <Avatar type="image" avatar={card.creator.avatar} size={1.8} />
        { :else }
          <Avatar type="word" word={card.creator.username} />
        {/if}
      { /if }
    </div>
  { /if }
</div>