<!-- Chip: the Quasar q-chip the old posts used inline, e.g.
     `<Chip color="purple" text="紫色" />`. `color` is a Quasar palette name
     or any CSS color; the text is white, like the old `text-color="white"`. -->
<script lang="ts">
  let { color = 'primary', text = '' }: { color?: string, text?: string } = $props()

  // Quasar's palette for the names the posts use.
  const PALETTE: Record<string, string> = {
    primary: 'var(--sp-blog-primary)',
    purple: '#9c27b0',
    pink: '#e91e63',
    cyan: '#00bcd4',
    red: '#f44336',
    green: '#4caf50',
    orange: '#ff9800',
  }
</script>

<span class="chip" style:background-color={PALETTE[color] ?? color}>{text}</span>

<style>
  .chip {
    display: inline-flex;
    align-items: center;
    height: 2em;
    padding: 0 0.9em;
    margin: 4px;
    border-radius: 16px;
    font-family: var(--sp-font-sans);
    font-size: 12px;
    line-height: 1;
    color: #fff;
    vertical-align: middle;
  }
</style>
