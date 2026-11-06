<!--
  Old demo-components/Algorithm/DiagonalTraverse/Example.vue: a 3x3 matrix
  of 100px cells with the traversal drawn as five numbered arrows along the
  anti-diagonals x + y = 100 … 500. Odd segments run bottom-left → top-right,
  even ones top-right → bottom-left; the badge sits where each segment starts.
-->
<script lang="ts">
  const DIAGONALS = [
    { from: [0, 100], to: [100, 0] },
    { from: [200, 0], to: [0, 200] },
    { from: [0, 300], to: [300, 0] },
    { from: [300, 100], to: [100, 300] },
    { from: [200, 300], to: [300, 200] },
  ].map(({ from, to }) => ({
    from,
    to,
    mid: [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2],
    angle: to[1] < from[1] ? -45 : 135,
  }))
</script>

<svg
  viewBox="-14 -14 328 328"
  role="img"
  aria-label="对角线遍历顺序：1 → 2 → 4 → 7 → 5 → 3 → 6 → 8 → 9"
>
  <rect class="grid" x="0" y="0" width="300" height="300"></rect>
  <path class="grid" d="M100 0V300M200 0V300M0 100H300M0 200H300"></path>
  {#each Array(9) as _, n (n)}
    <text class="num" x={50 + (n % 3) * 100} y={50 + Math.floor(n / 3) * 100}>{n + 1}</text>
  {/each}
  {#each DIAGONALS as d, i (i)}
    <line class="line" x1={d.from[0]} y1={d.from[1]} x2={d.to[0]} y2={d.to[1]}></line>
    <!-- mdi arrow-right-bold, the icon the old Arrow.vue drew -->
    <path
      class="arrow"
      transform="translate({d.mid[0]} {d.mid[1]}) rotate({d.angle}) scale({56 / 24}) translate(-12 -12)"
      d="M4 15V9h8V4.16L19.84 12L12 19.84V15H4Z"
    ></path>
    <circle class="badge" cx={d.from[0]} cy={d.from[1]} r="12"></circle>
    <text class="order" x={d.from[0]} y={d.from[1]}>{i + 1}</text>
  {/each}
</svg>

<style>
  svg {
    display: block;
    width: min(100%, 328px);
    margin: 0 auto;
    font-family: var(--sp-font-sans);
  }
  .grid {
    fill: none;
    stroke: var(--sp-blog-primary);
    stroke-width: 1;
  }
  .num {
    fill: currentColor;
    font-size: 56px;
    text-anchor: middle;
    dominant-baseline: central;
  }
  .line {
    stroke: var(--sp-blog-primary);
    stroke-width: 4;
  }
  .arrow,
  .badge {
    fill: var(--sp-blog-primary);
  }
  .order {
    fill: #fff;
    font-size: 14px;
    text-anchor: middle;
    dominant-baseline: central;
  }
</style>
