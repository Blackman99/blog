<!--
  Old demo-components/Algorithm/SolveNQueen/Slashes7.vue: on a 5x5 board,
  marks the i - j = 1 diagonal (top-left to bottom-right) and the i + j = 4
  diagonal (top-right to bottom-left).
-->
<script lang="ts">
  function slash(n: number): string {
    const i = Math.floor(n / 5)
    const j = n % 5
    if (i - j === 1) return 'i − j = 1'
    if (i + j === 4) return 'i + j = 4'
    return ''
  }
</script>

<div class="board">
  {#each Array(25) as _, n (n)}
    <div class="cell" class:dark={(Math.floor(n / 5) + (n % 5)) % 2 === 1}>
      {#if slash(n)}<span>{slash(n)}</span>{/if}
    </div>
  {/each}
</div>

<style>
  .board {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: min(100%, 500px);
    background: #eee;
    border-radius: 6px;
    overflow: hidden;
    font-family: var(--sp-font-sans);
  }
  .cell {
    position: relative;
    aspect-ratio: 1;
  }
  .cell.dark {
    background: #333;
  }
  span {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--sp-blog-primary) 55%, transparent);
    color: #fff;
    font-size: 0.7rem;
    text-align: center;
  }
</style>
