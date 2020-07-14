<script>
  // Importing modules and components...
  import { user } from "../config/stores/user";

  import {
    Avatar,

    Heading,
    Caption, 

    Button,
    
    colors
  } from "darkmode-components/src/index"
</script>

<!-- 
  Main Layout
 -->
<main style="min-height: 100vh;" class="bg-gray-100 w-full h-full flex justify-center items-center">
  <div class="rounded-lg bg-white shadow-2xl flex flex-col justify-center items-center py-6 px-6 md:px-16">
    <!-- 
      Let's now check if we
      have logged in user or no. 
    -->
    { #if $user.tokens.length >= 1 }
      <!-- User profile -->
      <div class="mb-6 flex flex-col justify-center items-center">
        <Avatar type="image" avatar={$user.current.avatar} size={6.5} />
      
        <div class="text-center">
          <Heading>{$user.current.username}</Heading>
          <Caption>{$user.current.email}</Caption>  
        </div>
      </div>

      <!-- Log out buttons -->
      <div class="flex">
        <Button type="ghost">Settings</Button>
        <Button fullWidth={true}>Log out</Button>
      </div>
    { :else }
      <div class="mb-6">
        <Heading>Log in to continue</Heading>
        <Caption>yeah, you need to login buddy.</Caption>
      </div>

      <Button fullWidth={true} roundedCorners="tl,bl,br" on:click={(e) => {
        window.location.href = "https://account.wavees.co.vu/authorize/medals@wavees";
      }}>
        <p>Log in with</p>
        <h1 style="font-family: Junegull; color: {$colors.light[3]}" class="text-bold">wavees</h1> 
      </Button>
    { /if }
  </div>
</main>