<script>
  // Let's now import some modules...
  import {
    theme,
    colors
  } from "darkmode-components/src/index";

  export let size = "28px";
</script>

<h1 style="font-size: {size}; font-weight: bold; text-transform: uppercase; color: {$colors.light[3]}">
  <slot></slot>
</h1>