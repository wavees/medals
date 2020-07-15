<script>

  import { colors } from "darkmode-components/src/index";

  // Let's now export some variables...
  export let fullWidth = false;
  export let type = "full";
  export let margin;
</script>

<!-- Button layout -->
{ #if type == "full" }
  <button class="button_full {fullWidth ? "w-full" : ""} {margin == null ? "" : margin} shadow-2xl" style="padding: 15px 30px; border-radius: 35px; {colors.variables()}" on:click>
    <slot></slot>
  </button>
{ :else if type == "ghost" }
  <button class="button_ghost {fullWidth ? "w-full" : ""} {margin == null ? "" : margin}" style="padding: 15px 30px; border-radius: 35px; {colors.variables()}" on:click>
    <slot></slot>
  </button>
{ /if }

<style>
  /* Ghost button */
  .button_ghost {
    outline: none;

    border: 2px solid var(--light-3);
    color: var(--light-3)
  }

  .button_ghost:hover {
    background-color: var(--light-4);
    color: var(--dark-2)
  }

  .button_ghost:active {
    border: 2px solid var(--light-1);

    background-color: var(--light-1);
    color: var(--dark-1);
  }

  /* Full button */
  .button_full {
    outline: none;

    background-color: #fff;
    color: var(--dark-1);
  }

  .button_full:hover {
    color: var(--dark-1);
    background-color: var(--light-1);
  }

  .button_full:active {
    background-color: #fff;
    color: var(--dark-1);
  }
</style>