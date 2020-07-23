<script>
  // Let's now import some important
  // modules and stores.
  import { goto } from "@sapper/app";
  import { user } from "../../config/stores/user";

  import { _ } from "svelte-i18n";

  // Importing components.
  import {
    Avatar,

    Spinner,
  } from "darkmode-components/src/index";

  import Heading from "../../components/Typo/Heading.svelte"
  import Caption from "../../components/Typo/Caption.svelte"

  // Different backgrounds.
  let backgrounds = [

  ];

  // Should we show some advanced settings
  // to user or no?
  let advancedMenu = true;

  // Some information about our card.
  let card = {
    title: "is the coolest!",
    subtitle: "Become the coolest person in the world! You are cooler than Cool Cat itself!",

    color: "",
    agreed: 1
  }
</script>

<!-- Main content -->
<main style="" class="w-full h-full relative">
  <!-- Some kind of a header -->
  <div class="absolute w-full flex justify-center inset-x-0 top-0 px-6 md:px-8 lg:px-16 py-4">
    <!-- Back button -->
    <div on:click={(e) => goto('/')} class="flex items-center">
      <img src="./icons/chevron-left.svg" alt="Chevron Left">
      <h1 style="font-family: Junegull; cursor: pointer;" class="text-xl mx-2 text-semibold">{$_("global.logotype", { default: "medals" })}</h1>
    </div>
  </div>

  <!-- Main content -->
  <div style="min-height: 100vh;" class="w-full flex justify-center items-center">
    <!-- Card itself -->
    <div class="w-1/3 flex justify-center bg-green-500">
      <div style="background: linear-gradient(to right, #0f2027, #203a43, #2c5364); width: 16rem; height: 20rem;" class="rounded-lg flex justify-center items-center shadow-2xl text-white relative">
        <!-- Heading and icon -->
        <div class="px-6">
          <Heading>{@html card.title.slice(0, 45).replace("{name}", `<p class="inline text-red-200">${$user.current.username == null ? "You" : $user.current.username}</p>`)}{card.title.split('').length >= 45 ? "..." : ""}</Heading>
          <Caption>{card.subtitle.slice(0, 75)}{card.subtitle.split('').length >= 75 ? "..." : ""}</Caption>
        </div>

        <!-- People agreed and assigment/Creator of this card -->
        <div class="absolute inset-x-0 bottom-0 w-full flex { card.type == "secondary" ? "justify-between" : "justify-center" } items-center px-6 py-4">
          <!-- 
            Let's show some information
            about master of this card.
          -->
          <p class="text-xs">{card.agreed.length} {card.agreed.length > 1 ? $_("cards.agreed.multi", { default: "agreed" }) : $_("cards.agreed.one", { default: "agreed" })}</p>

          <div class="flex items-center">
            <p class="text-xs mx-2">{$user.current.username == null ? "Unknown" : $user.current.username}</p>

            { #if $user.current.avatar }
              <Avatar type="image" avatar="{$user.current.avatar}" size={1.8} />
            { :else }
              <Avatar type="word" word="U" />
            { /if }
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced settings -->
    {#if advancedMenu}
      <div class="w-2/3 bg-red-500 h-full">
        Hello there
      </div>
    {/if}
  </div>
</main>