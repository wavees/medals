<script>
  // Let's now import some modules
  // and svelte stores.
  import axios from "axios";
  import { user, current } from "../../config/stores/user";

  import Card from "../../components/Cards/Card.svelte";

  import { _ } from "svelte-i18n";

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
  <div class="absolute inset-x-0 top-0 w-full flex justify-between">
  
  </div>

  <!-- Main content -->
  <div>
    <!-- Sidebar -->
    <div>
    
    </div>

    <!-- Cards list -->
    <div>
      <!-- Create new card promotion -->
      <div>
      
      </div>

      <!-- And all cards, that exists at the moment -->
      <div>
        <Card id="NlCcNpeI6X1HPVkn"></Card>
      </div>
    </div>
  </div>
</main>