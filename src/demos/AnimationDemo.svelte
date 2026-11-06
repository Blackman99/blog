<!--
  Old demo-components/Algorithm/SolveNQueen/AnimationDemo.vue: one 5x5
  solution, placing a queen every 2s and painting the cells it attacks.
-->
<script lang="ts">
  import { onMount } from 'svelte'
  import Crown from './lib/Crown.svelte'

  const STEPS = [
    { row: 0, col: 0 },
    { row: 1, col: 2 },
    { row: 2, col: 4 },
    { row: 3, col: 1 },
    { row: 4, col: 3 },
  ]

  // Cell indexes copied from the old component's styles: each step paints
  // exactly the cells that component painted, not a recomputed set.
  const STEP_CELLS = [
    [2, 3, 4, 5, 6, 11, 16, 21, 7, 13, 19, 25],
    [9, 10, 18, 23, 12, 14, 20],
    [],
    [22],
    [],
  ]
  function attacked(step: number): boolean[] {
    const cells = Array(25).fill(false)
    for (let s = 0; s < step && s < STEP_CELLS.length; s++)
      for (const n of STEP_CELLS[s]) cells[n - 1] = true
    return cells
  }

  let step = $state(0)
  onMount(() => {
    const timer = setInterval(() => {
      step = step < 5 ? step + 1 : 0
    }, 2000)
    return () => clearInterval(timer)
  })
</script>

<div class="board">
  {#each attacked(step) as hit, n (n)}
    <div
      class="cell"
      class:dark={(Math.floor(n / 5) + (n % 5)) % 2 === 1}
      class:hit
    ></div>
  {/each}
  {#each STEPS.slice(0, step) as queen, i (i)}
    <div class="queen" style="top: {queen.row * 20}%; left: {queen.col * 20}%">
      <Crown />
    </div>
  {/each}
</div>

<style>
  .board {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: min(100%, 500px);
    background: #eee;
    border-radius: 6px;
    overflow: hidden;
  }
  .cell {
    aspect-ratio: 1;
    transition: background-color 1s ease;
  }
  .cell.dark {
    background: #333;
  }
  .cell.hit {
    background: var(--sp-blog-primary);
  }
  .queen {
    position: absolute;
    width: 20%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sp-blog-primary);
    animation: crown 1s 1;
  }
  .queen :global(svg) {
    width: 56px;
    height: 56px;
    max-width: 70%;
    max-height: 70%;
  }
  @keyframes crown {
    0% {
      transform: translate(-10px, -10px) rotate(-45deg);
    }
    100% {
      transform: none;
    }
  }
</style>
