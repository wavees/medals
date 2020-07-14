<script>

  import { colors } from "darkmode-components/src/index";

  // Let's now export some variables...
  export let type = "full";
</script>

<!-- Button layout -->
{ #if type == "full" }
  <button class="button_full shadow-2xl" style="padding: 15px 30px; border-radius: 35px; {colors.variables()}" on:click>
    <slot></slot>
  </button>
{ /if }

<style>
  .button_full {
    outline: none;

    background-color: #fff;
    color: var(--dark-1);
  }

  .button_full {
    color: var(--dark-2);
    background-color: var(--light-1);
  }

  .button_full {
    background-color: #fff;
    color: var(--dark-1);
  }
</style>