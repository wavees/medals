<script>
  // Let's now import some modules
  // and svelte stores.
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";

  import axios from "axios";

  import { _ } from "svelte-i18n";

  import { api } from "../../config//stores/global";
  import { user, current } from "../../config/stores/user";
  import { cards } from "../../config/stores/cards";

  // Importing components
  import Card from "../../components/Cards/Card.svelte";
  import Button from "../../components/Buttons/Button.svelte";

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
    setTimeout(() => {
      pageLoaded = true;
    }, 50);

    // Let's firstly clear our cards
    // store.
    cards.clearStore()

    // And now let's get recent cards...
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

  // Cards categories...
  let currentCategory = 1;
  let cardsCategories = [
    {
      id: 1,
      title: "browser.sort.recent.short",
      default: "Recent Cards"
    },
    {
      id: 2,
      title: "browser.sort.popular.short",
      default: "Popular Cards"
    }
  ];

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

  // Sidebar items.
  let sidebar = [
    {
      id: 1,
      title: "Gaming",
      subtitle: "More games, more fun!"
    },
    {
      id: 2,
      title: "Art",
      subtitle: "Meh, just drawing d*cks"
    },
    {
      id: 3,
      title: "Writings",
      subtitle: "Writing fanfictions is fun!"
    },
    {
      id: 4,
      title: "Music",
      subtitle: "Music goes brr and brr"
    },
    {
      id: 5,
      title: "Memes",
      subtitle: "e"
    },
    {
      id: 6,
      title: "Other",
      subtitle: "Other shit is located right here!"
    }
  ];

  // Small page loading transtion
  // (I'll change it later)
  let pageLoaded = false;
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
<main style="min-height: 100vh;" class="w-full relative bg-gray-200">
  <!-- Small page transition effect (I'll change it later, probably) -->
  {#if !pageLoaded}
    <div out:fade class="absolute w-full h-full bg-white" style="z-index: 999;"></div>
  {/if}
  
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
  <div class="flex flex-col pt-16 pb-8 lg:pt-24">
    <!-- Cards categories and search bar -->
    <div class="w-full flex px-2 md:px-8">
      <!-- Categories -->
      <div class="w-full hidden md:flex justify-start items-center">
        {#each cardsCategories as category}
          <div style="border-radius: 1.5rem; cursor: pointer;" class="shadow-2xl mr-6 py-2 {currentCategory == category.id ? "bg-black text-white font-semibold px-8 py-3" : "text-gray-700 bg-white px-6"}">
            {$_(category.title, { default: category.default })}
          </div> 
        {/each}

        <!-- "More" button -->
        <div style="cursor: pointer;" class="mx-3 py-2 px-2">
          <img src="./icons/more-horizontal.svg" alt="More Icon">
        </div>
      </div>

      <!-- Search bar -->
      <div class="w-full md:w-2/3 flex justify-center">
        <input style="border-radius: 1.5rem;" class="bg-white w-full text-black py-2 px-8" type="text" placeholder="{$_("global.search.cards", { default: "Search Cards" })}">
        <!-- Icon -->
      </div>
    </div>

    <!-- Cards list -->
    <div class="w-full flex mt-4 md:mt-6 lg:mt-8">
      <!-- Sidebar -->
      <div class="w-1/5 hidden md:block h-full px-2">
        <div class="px-4">
          <Heading>{$_("browser.sidebar.title", { default: "Categories" })}</Heading>
          <Caption>{$_("browser.sidebar.subtitle", { default: "Categorized cards, yeah!" })}</Caption>
        </div>

        <div class="mt-8">
          <!-- Sidebar items -->
          {#each sidebar as item}
            <div style="border-radius: 2rem;" class="bg-white shadow-2xl px-6 py-4 mb-8">
              <h1 class="text-gray-800">{item.title}</h1>
              <p class="text-gray-600 text-sm">{item.subtitle}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="w-full">
        <!-- Closed beta test & create new card promotions -->
        <div class="w-full flex flex-col lg:flex-row px-4 lg:px-0 relative">
          <!-- Closed beta -->
          <div style="border-radius: 2rem; background: linear-gradient(to right, #ffafbd, #ffc3a0);" class="lg:mx-4 my-4 lg:my-0 py-6 lg:py-8 flex h-full w-full relative">
            <!-- Some textes -->
            <div class="w-full h-full items-center px-6 md:pr-12">
              <h1 class="mt-6 md:mt-8 lg:mt-12 text-xl md:text-2xl font-bold text-white">{$_("browser.promotion.big.title", { default: "Wavees Medals is currently in closed beta." })}</h1>
            
              <!-- Buttons -->
              <div class="mt-8 flex">
                <!-- Lear more -->
                <Button type="ghost" margin="mx-2 hidden md:block">
                  {$_("browser.promotion.big.button.learnMore", { default: "Learn more" })}
                </Button>

                <!-- Subscribe for updates -->
                <Button type="full" fullWidth={true} margin="mx-2">
                  {$_("browser.promotion.big.button.subscribe", { default: "Subscribe for updates" })}
                </Button>
              </div>
            </div>

            <!-- Image -->
            <div class="hidden md:block w-2/3">
              <img style="height: 25rem; margin: -4rem -1.5rem;" class="hidden md:block absolute inset-y-0 right-0" src="./illustrations/1_en.svg" alt="Promotion">
            </div>
          </div>

          <!-- Learn more -->
          <div style="border-radius: 2rem; height: auto; background: linear-gradient(to right, #36d1dc, #5b86e5);" class="px-6 md:hidden lg:block w-full md:w-1/3 lg:mx-4 my-4 lg:my-0 py-6 lg:py-0">
            <div class="text-white mt-6 md:mt-8">
              <h1 class="text-xl md:text-2xl font-bold">{$_("browser.promotion.small.title", { default: "Learn more about Medals" })}</h1>
              <p class="text-sm">{$_("browser.promotion.small.subtitle", { default: "Let's learn together! Learn something new about this service and how it works." })}</p>
            </div>

            <div class="mt-6 px-6 md:px-0">
              <Button fullWidth={true} type="full">
                {$_("browser.promotion.small.button", { default: "Learn More" })}
              </Button>
            </div>
          </div>
        </div>

        <!-- And all cards, that exists at the moment -->
        <div class="mt-12">
          <!-- Some interesting text -->
          <div class="w-full text-center">
            <Heading>{$_("browser.sort.recent.title", { default: "Recent cards" })}</Heading>
            <Caption>{$_("browser.sort.recent.subtitle", { default: "Here you'll find the most recent cards!" })}</Caption>
          </div>

          <!-- Cards themselves -->
          <div class="mt-8 w-full justify-center md:justify-start flex flex-wrap px-4">
            {#each cardsIds as cardId}
              <Card margin="md:mr-2 lg:mr-4 mt-6" id={cardId}></Card>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</main>