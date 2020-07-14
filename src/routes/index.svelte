<script>
  // Importing modules and components...
  import { user } from "../config/stores/user";

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
</script>

<!-- 
  Main Layout
 -->
<main style="background-image: url('background.svg'); background-size: cover; background-position: center center; min-height: 100vh;" class="py-8 lg:py-0 relative w-full h-full flex justify-center items-center">
  <!-- Header -->
  <div class="absolute inset-x-0 top-0 w-full flex md:justify-between px-6 md:px-8 lg:px-16 py-4 text-white">
    <!-- Logotype -->
		<h1 style="font-family: Junegull;" class="text-sm text-bold">medals</h1>

    <!-- Header items -->
    <div class="hidden md:flex text-xs">
      <p class="mx-6">About</p>
      <p class="mx-6">Browse Cards</p>
      <p class="mx-6">Create my Card</p>

      { #if $user.tokens.length >= 1 }
        <p class="mx-6">Account</p>
      { :else }
        <p class="mx-6">Log in</p>
      { /if }
    </div>
  </div>
  
  <!-- Main content -->
  <div class="w-full items-center md:flex pt-16 md:pt-8 lg:pt-0">
    <!-- Text -->
    <div class="w-full px-4 md:px-8 lg:pl-16">
      <!-- 
        And now let's look if our
        user is logged in or no.
       -->
      { #if $user.tokens.length >= 1 }
        <Heading size="36px">Hello, {$user.current.username}</Heading>
        <Caption size="22px">Have fun collecting cards and medals.</Caption>
        
        <div class="mt-6">
          <!-- User profile -->
          <div class="mb-6 float-left flex justify-center items-center">
            <Avatar type="image" avatar={$user.current.avatar} size={4.5} />
          
            <div class="mx-6 text-left">
              <Heading size="20px">{$user.current.username}</Heading>
              <Caption size="15px">{$user.current.email}</Caption>  
            </div>

            <!-- Logout button -->
            <div class="flex">
              <Button type="ghost">Settings</Button>
              <Button fullWidth={true} on:click={(e) => {
                cookies.remove('_account_token');
                user.clearStore();
              }}>Log out</Button>
            </div>
          </div>
        </div>
      { :else }
        <Heading size="36px">Become Card Master!</Heading>
        <Caption size="18px">It's very simple - collect a medal / card - and become its master! And other players will help you to achieve the title written on this card.</Caption>
        
        <div class="mt-6">
          <Button fullWidth={true} roundedCorners="tl,bl,br" on:click={(e) => {
            window.location.href = "https://account.wavees.co.vu/authorize/medals@wavees";
          }}>
            Log in with
            <h1 style="font-family: Junegull;" class="text-bold inline">wavees</h1> 
          </Button>
        </div>
      { /if }
    </div>

    <!-- Card examples -->
    <div class="mt-16 lg:mt-0 w-full flex flex-col lg:flex-row justify-center items-center">
      <!-- 
        @card Funniest person
        Smol card
      -->
      <div style="background: linear-gradient(to right, #fd746c, #ff9068); width: 16rem; height: 20rem;" class="rounded-lg mx-4 mt-6 lg:mt-6 flex justify-center items-center shadow-2xl text-white relative">
        
        <!-- Heading and icon -->
        <div class="px-6">
          <Heading><p class="inline text-red-200">zakufa</p> is the funniest person</Heading>
          <Caption>And here we go again - garbage humour, not funny jokes and so on</Caption>
        </div>

        <!-- People agreed and assigment -->
        <div class="absolute inset-x-0 bottom-0 w-full flex justify-between items-center px-6 py-4">
          <p class="text-xs">Nobody f*cking agreed</p>

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
          <Heading><p class="inline text-green-300">You</p> are the shitiest person</Heading>
          <Caption>Become the shitiset person in the world!</Caption>
        </div>

        <!-- People agreed and assigment -->
        <div class="absolute inset-x-0 bottom-0 w-full flex justify-between items-center px-6 py-4">
          <p class="text-xs">1245 agreed</p>

          <div class="flex items-center">
            <p class="text-xs mx-2">You</p>
            <Avatar type="word" word="U" size={1.8} />
          </div>
        </div>
      </div>
    </div>
  </div>
</main>