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
      title: "Test"
    },
    {
      id: 2,
      title: "Test 2"
    },
    {
      id: 3,
      title: "Test 3"
    },
    {
      id: 4,
      title: "Test 4"
    },
    {
      id: 5,
      title: "Test 5"
    },
    {
      id: 6,
      title: "Test 6"
    },
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
  <div class="flex flex-col pt-8 pb-8 md:pt-16 lg:pt-24">
    <!-- Cards categories and search bar -->
    <div class="w-full flex px-2 md:px-8">
      <!-- Categories -->
      <div class="w-full hidden md:flex justify-start items-center">
        {#each cardsCategories as category}
          <div style="border-radius: 1.5rem; cursor: pointer;" class="shadow-2xl mr-6 py-2 {currentCategory == category.id ? "bg-black text-white font-semibold px-8 py-3" : "text-gray-700 bg-white px-6"}">
            {category.title}
          </div> 
        {/each}

        <!-- "More" button -->
        <div style="cursor: pointer;" class="mx-3 py-2 px-2">
          <img src="./icons/more-horizontal.svg" alt="More Icon">
        </div>
      </div>

      <!-- Search bar -->
      <div class="w-full md:w-2/3 flex justify-center">
        <input style="border-radius: 1.5rem;" class="bg-white w-full text-black py-2 px-8" type="text" placeholder="Search cards">
        <!-- Icon -->
      </div>
    </div>

    <!-- Cards list -->
    <div class="w-full flex mt-4 md:mt-6 lg:mt-8">
      <!-- Sidebar -->
      <div class="w-1/5 bg-red-500 hidden md:block h-full px-2 py-6">
        Sidebar goes brr
      </div>
      
      <div class="w-full">
        <!-- Closed beta test & create new card promotions -->
        <div style="height: 45vh;" class="w-full flex">
          <!-- Closed beta -->
          <div style="border-radius: 2rem; background: linear-gradient(to right, #83a4d4, #b6fbff);" class="mx-4 flex h-full w-full relative">
            <!-- Some textes -->
            <div class="w-full h-full items-center px-4 md:px-6 md:pr-12">
              <h1 class="mt-6 md:mt-8 lg:mt-16 text-2xl font-bold text-white">Wavees Medals is currently in closed beta.</h1>
            
              <!-- Buttons -->
              <div class="mt-8 flex">
                <!-- Lear more -->
                <Button type="ghost" margin="mx-2">
                  Learn more
                </Button>

                <!-- Subscribe for updates -->
                <Button type="full" margin="mx-2">
                  Subscribe for updates
                </Button>
              </div>
            </div>

            <!-- Image -->
            <div class="w-2/3">
              <img style="height: 20rem; margin: -3.5rem 0;" class="absolute inset-y-0 right-0" src="./illustrations/1_en.svg" alt="Promotion">
            </div>
          </div>

          <!-- Create new Card -->
          <div style="border-radius: 2rem;" class="mx-4 h-full w-1/3 bg-red-500">
          
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
  </div>
</main>