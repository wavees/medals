<script>
  // Let's now import some modules
  // and svelte stores.
  import { goto } from "@sapper/app";

  import { onMount } from "svelte";

  import axios from "axios";

  import { _ } from "svelte-i18n";

  import { api } from "../../config//stores/global";
  import { user, current } from "../../config/stores/user";
  import { cards } from "../../config/stores/cards";

  // Importing components
  import Card from "../../components/Cards/Card.svelte";

  import {
    Avatar,
    Heading,

    Spinner,

    Caption
  } from "darkmode-components/src/index";

  let cardsIds = [];

  // onMount event
  // Here we'll get recent
  // cards from server.
  onMount(() => {
    axios.get(`${$api.url}/${$api.version}/medals/recent/primary`)
    .then((response) => {
      let data = response.data;

      if (data.length >= 1) {
        cardsIds = data;

        // And now we need to gather
        // some information about this cards.
        cardsIds.forEach((cardId) => {
          cards.gatherInformation(cardId);
        });
      };
    }).catch((error) => {
      // Nice cock (nice error handling, yeah.)
      console.log(error);
    });
  });

  // Header items...
  let headerItems = [
    // About page
    {
      // Do we need to hide
      // this in mobile version?
      hide: true,
      title: "header.aboutUs",
      default: "About",

      url: null
    },
    // Create card
    {
      hide: true,
      title: "header.createCard",
      default: "Create my Card",

      url: "/browse/create"
    }
  ];
</script>

<!-- 
  Svelte Head
 -->
<svelte:head>
  <title>Browse Medals</title>
</svelte:head>

<!-- 
  Main body.
 -->
<main style="min-height: 100vh;" class="w-full relative">
  <!-- Header -->
  <div class="absolute inset-x-0 top-0 w-full flex justify-between items-center px-6 md:px-8 lg:px-16 py-4 text-black">
    <!-- Logotype -->
		<h1 on:click={(e) => goto('/')} style="font-family: Junegull; cursor: pointer;" class="text-xl text-bold">{$_("global.logotype", { default: "medals" })}</h1>

    <!-- Header items -->
    <div class="flex text-sm md:text-xs items-center">
      {#each headerItems as item}
        <p on:click={(e) => {
          if (item.url != null) {
            goto(item.url);
          };
        }} style="cursor: pointer;" class="mx-6 { item.hide ? "hidden md:block" : ""}">{$_(item.title, { default: item.default })}</p>
      {/each}

      { #if $user.tokens.length >= 1 }
        <!-- Brief user account information -->
        <div style="cursor: pointer;" class="hidden md:flex mx-6 items-center">
          <Avatar type="image" avatar={$user.current.avatar} />

          <p class="mx-2 text-sm">{$user.current.username}</p>
        </div>
      { :else }
        <p on:click={(e) => window.location.href = "https://account.wavees.co.vu/authorize/medals@wavees" } style="cursor: pointer;" class="mx-6 hidden md:block">{$_("global.login", { default: "Log in" })}</p>
      { /if }
    </div>
  </div>

  <!-- Main content -->
  <div class="flex flex-col md:flex-row pt-8 md:py-16 lg:pt-24">
    <!-- Sidebar -->
    <!-- <div class="w-full md:w-1/3 h-full bg-gray-200 rounded-lg">

    </div> -->

    <!-- Cards list -->
    <div class="w-full px-2 md:px-8 lg:px-12">
      <!-- Create new card promotion -->
      <div style="height: 40vh;" class="w-full flex px-4 md:px-24">
        <!-- Firsty button -->
        <div class="mx-2 md:mx-4 hidden md:flex w-1/3">
        
        </div>

        <!-- Post itself -->
        <div class="w-full h-full rounded-lg bg-blue-300 shadow-2xl">
      
        </div>

        <!-- Second Button -->
        <div class="mx-2 md:mx-4 hidden md:flex w-1/3">
        
        </div>
      </div>

      <!-- And all cards, that exists at the moment -->
      <div class="mt-12">
        <!-- Some interesting text -->
        <div class="w-full text-center">
          <Heading>Recent cards</Heading>
          <Caption>Here you'll find the most recent cards!</Caption>
        </div>

        <!-- Cards themselves -->
        <div class="mt-8 flex flex-wrap">
          {#each cardsIds as cardId}
            <Card id={cardId}></Card>
          {/each}
        </div>
      </div>
    </div>
  </div>
</main>