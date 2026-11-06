<!-- Badge: the small inline label from the old theme's global Badge.vue.
     `type` picks the color (tip / green → accent, warning / warn / yellow,
     error; empty or unknown → accent), `vertical` is the vertical-align. -->
<script lang="ts">
  let {
    type = 'tip',
    text = '',
    vertical = 'top',
  }: { type?: string, text?: string, vertical?: string } = $props()
</script>

<span class="badge {type}" style:vertical-align={vertical}>{text}</span>

<style>
  .badge {
    display: inline-block;
    font-family: var(--sp-font-sans);
    font-size: 14px;
    height: 18px;
    line-height: 18px;
    border-radius: 3px;
    padding: 0 6px;
    color: white;
    background-color: var(--sp-blog-primary);
  }
  /* The old palette set $badgeTipColor to the accent color. */
  .badge.tip,
  .badge.green {
    background-color: var(--sp-blog-primary);
  }
  .badge.error {
    background-color: #da5961;
  }
  .badge.warning,
  .badge.warn,
  .badge.yellow {
    background-color: #e7c000;
  }
</style>
