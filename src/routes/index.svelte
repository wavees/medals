<script>
  // Importing modules and components...
  import { goto } from "@sapper/app";
  import { onMount } from "svelte"

  import { fade } from "svelte/transition";

  import { _ } from "svelte-i18n";

  import { user } from "../config/stores/user";
  import { general } from "../config/stores/global";

  // Cookies manager
  import Cookie from "cookie-universal";
  const cookies = Cookie();

  import {
    Avatar,

    colors
  } from "darkmode-components/src/index"

  // Importing components.
  import Heading from "../components/Typo/Heading.svelte"
  import Caption from "../components/Typo/Caption.svelte"

  import Button from "../components/Buttons/Button.svelte";

  import CardWrapper from "../components/Cards/Wrapper.svelte";

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
    // Browse cards
    {
      hide: false,
      title: "header.browseCards",
      default: "Browse Cards",

      url: '/browse'
    },
    // Create card
    {
      hide: true,
      title: "header.createCard",
      default: "Create my Card",

      url: "/browse/create"
    }
  ];

  // Small transition animation
  // (I'll change it later)
  let pageLoaded = false;

  onMount(() => {
    setTimeout(() => {
      pageLoaded = true;
    }, 50);
  });
</script>

<!-- 
  Page head
 -->
<svelte:head>
  <title>Wavees Medals</title>
</svelte:head>

<!-- 
  Main Layout
 -->
<main style="background-image: url('background.svg'); background-size: cover; background-position: center center; min-height: 100vh;" class="py-8 lg:py-0 relative w-full h-full flex justify-center items-center">
  <!-- Small page transition effect (I'll change it later, probably) -->
  {#if !pageLoaded}
    <div out:fade class="absolute w-full h-full bg-white" style="z-index: 999;"></div>
  {/if}

  <!-- Header -->
  <div class="absolute inset-x-0 top-0 w-full flex justify-between items-center px-6 md:px-8 lg:px-16 py-4 text-white">
    <!-- Logotype -->
		<h1 style="font-family: Junegull; cursor: pointer;" class="text-xl text-bold">{$_("global.logotype", { default: "medals" })}</h1>

    <!-- Header items -->
    <div class="flex text-sm md:text-xs">
      {#each headerItems as item}
        <p on:click={(e) => {
          if (item.url != null) {
            goto(item.url);
          };
        }} style="cursor: pointer;" class="mx-6 { item.hide ? "hidden md:block" : ""}">{$_(item.title, { default: item.default })}</p>
      {/each}

      { #if $user.tokens.length >= 1 }
        <p class="mx-6 hidden md:block">{$_("global.account", { default: "Account" })}</p>
      { :else }
        <p on:click={(e) => window.location.href = `https://account.${$general.globalURL}/authorize/medals@wavees` } style="cursor: pointer;" class="mx-6 hidden md:block">{$_("global.login", { default: "Log in" })}</p>
      { /if }
    </div>
  </div>
  
  <!-- Main content -->
  <div class="w-full items-center flex flex-col md:flex-row pt-24 md:pt-8 lg:pt-0">
    <!-- Text -->
    <div class="w-full px-4 md:px-8 lg:pl-16">
      <!-- 
        And now let's look if our
        user is logged in or no.
       -->
      { #if $user.tokens.length >= 1 }
        <Heading size="36px">{$_("hero.logged.title", { default: "Hello, {name}" }).replace("{name}", $user.current.username)}</Heading>
        <Caption size="22px">{$_("hero.logged.subtitle", { default: "Have fun collecting cards and medals!" })}</Caption>
        
        <div class="mt-6">
          <!-- User profile -->
          <div class="mb-6 float-center md:float-left flex flex-col md:flex-row justify-center items-center">
            <div class="flex items-center">
              <Avatar spinnerColor="#fff" type="image" avatar={$user.current.avatar} size={4.5} />
            
              <div class="mx-6 text-left items-center">
                <Heading size="20px">{$user.current.username}</Heading>
                <Caption size="15px">{$user.current.email}</Caption>
              </div>
            </div>

            <!-- Logout button -->
            <div class="px-8 md:px-0 md:flex md:mt-0 w-full mt-4 justify-center">
              <Button fullWidth={true} on:click={(e) => {
                cookies.remove('_account_token');
                user.clearStore();
              }}>{$_("global.logout", { default: "Log out" })}</Button>
            </div>
          </div>
        </div>
      { :else }
        <Heading size="36px">{$_("hero.guest.title", { default: "Become card master!" })}</Heading>
        <Caption size="18px">{$_("hero.guest.subtitle", { default: "It's very simple - collect a medal/card - and become its master! And other players will help you to achieve the title written on this card." })}</Caption>
        
        <div class="mt-6">
          <Button roundedCorners="tl,bl,br" on:click={(e) => {
            window.location.href = `https://account.${$general.globalURL}/authorize/medals@wavees`;
          }}>
            {@html $_("hero.guest.loginButton", { default: "Log in with {logo}" }).replace("{logo}", '<h1 style="font-family: Junegull;" class="text-bold inline">wavees</h1>')} 
          </Button>
        </div>
      { /if }
    </div>

    <!-- Card examples -->
    <div class="mt-16 lg:mt-0 w-full items-center justify-center">    
      { #if $user.tokens.length >= 1 }
        <!-- Some user cards -->
        <div class="flex flex-col lg:flex-row justify-center items-center">
          <CardWrapper cardsNumber={3} />
        </div>

        <!-- Some buttons... -->
        <div class="mt-16 md:mt-8 flex flex-col md:flex-row w-full justify-center items-center">
          <Button on:click={(e) => goto('/browse/create')} margin="mx-4 my-4 md:my-0" type="ghost">{$_("cards.create", { default: "Create new Card" })}</Button>
          <Button on:click={(e) => goto('/browse')} margin="mx-4 my-4 md:my-0" type="full">{$_("cards.browse", { default: "Browse all Cards" })}</Button>
        </div>
      { :else }
        <div class="flex flex-col lg:flex-row justify-center items-center">
          <!-- 
            @card Funniest person
            Smol card
          -->
          <div style="background: linear-gradient(to right, #fd746c, #ff9068); width: 16rem; height: 20rem;" class="rounded-lg mx-4 mt-6 lg:mt-6 flex justify-center items-center shadow-2xl text-white relative">
            
            <!-- Heading and icon -->
            <div class="px-6">
              <Heading>{@html $_("hero.cards.funniest.title", { default: "{name} is the funniest person" }).replace("{name}", '<p class="inline text-red-200">zakufa</p>')}</Heading>
              <Caption>{$_("hero.cards.funniest.subtitle", { default: "And here we go again - garbage humour, not funny jokes and so on" })}</Caption>
            </div>

            <!-- People agreed and assigment -->
            <div class="absolute inset-x-0 bottom-0 w-full flex justify-between items-center px-6 py-4">
              <p class="text-xs">{$_("hero.cards.funniest.agreed", { default: "1 agreed" })}</p>

              <div class="flex items-center">
                <p class="text-xs mx-2">zakufa</p>
                <Avatar type="image" avatar="https://media.discordapp.net/attachments/670942269796515853/732651801710428210/b1f0a6e7-f160-49ad-9f9d-dc2cae5598bc_w1200_r1_fpx55.11_fpy50.jpg?width=458&height=458" size={1.8} />
              </div>
            </div>
          </div>

          <!-- 
            @card Shitiest card 
            Just a piece of shit, yeah
          -->
          <div style="background: linear-gradient(to right, #0f2027, #203a43, #2c5364); width: 16rem; height: 20rem;" class="rounded-lg mx-4 mt-6 lg:mt-6 flex justify-center items-center shadow-2xl text-white relative">
            
            <!-- Heading and icon -->
            <div class="px-6">
              <Heading>{@html $_("hero.cards.shitiest.title", { default: "{name} are the shitiest person" }).replace("{name}", `<p class="inline text-green-300">${$_("hero.cards.shitiest.username", { default: "You" })}</p>`)}</Heading>
              <Caption>{$_("hero.cards.shitiest.subtitle", { default: "Become the shitiset person in the world! (It's a joke)" })}</Caption>
            </div>

            <!-- People agreed and assigment -->
            <div class="absolute inset-x-0 bottom-0 w-full flex justify-between items-center px-6 py-4">
              <p class="text-xs">{$_("hero.cards.shitiest.agreed", { default: "1245 agreed" })}</p>

              <div class="flex items-center">
                <p class="text-xs mx-2">{$_("hero.cards.shitiest.username", { default: "You" })}</p>
                <Avatar type="word" word="U" size={1.8} />
              </div>
            </div>
          </div>
        </div>
      { /if }
    </div>
  </div>
</main>