<!--
  Old components/Demo/NQueen/4.vue: the two solutions of the 4-queens
  problem, one board per tab.
-->
<script lang="ts">
  import Crown from './lib/Crown.svelte'

  const SOLUTIONS = [
    ['.Q..', '...Q', 'Q...', '..Q.'],
    ['..Q.', 'Q...', '...Q', '.Q..'],
  ]
  let solution = $state(0)
</script>

<div class="nqueen">
  <div class="tabs" role="tablist">
    {#each SOLUTIONS as _, i (i)}
      <button
        type="button"
        role="tab"
        class="tab"
        class:active={solution === i}
        aria-selected={solution === i}
        onclick={() => (solution = i)}>solution{i + 1}</button
      >
    {/each}
  </div>
  <div class="board">
    {#each SOLUTIONS[solution] as row, r (r)}
      {#each row as cell, c (c)}
        <div class="cell" class:dark={(r + c) % 2 === 0}>
          {#if cell === 'Q'}<Crown />{/if}
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .nqueen {
    font-family: var(--sp-font-sans);
  }
  .tabs {
    display: flex;
    gap: 2px;
  }
  .tab {
    appearance: none;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--sp-blog-muted);
    font: inherit;
    font-size: 0.85rem;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
  }
  .tab.active {
    color: var(--sp-blog-primary);
    border-bottom-color: var(--sp-blog-primary);
  }
  .board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: min(100%, 500px);
    background: #eee;
    border-radius: 6px;
    overflow: hidden;
  }
  .cell {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sp-blog-primary);
  }
  .cell.dark {
    background: #333;
  }
  .cell :global(svg) {
    width: 56%;
    height: 56%;
  }
</style>
