<script>
  // import
  import {
    theme,
    colors
  } from "darkmode-components/src/index";

  export let size = "14px";
</script>

<p style="font-size: {size}; color: {$colors.light[2]}">
  <slot></slot>
</p>