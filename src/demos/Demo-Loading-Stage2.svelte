<!-- Demo-Loading-Stage2: stage 2 of the CSS loading spinner (old Demo/Loading/Stage2.vue). -->
<div class="example-box">
  <div class="loading-box">
    <div class="bar-box">
      {#each [1, 2, 3, 4, 5, 6, 7, 8] as n (n)}
        <div class="bar" style="transform: rotate({(n * 360) / 8}deg)"></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .example-box {
    width: 200px;
    height: 200px;
    background-color: blue;
    position: relative;
    font-family: var(--sp-font-sans);
  }
  .loading-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .bar-box {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 4px;
    width: 20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    transform-origin: left;
    background-color: rgba(255, 255, 255, 1);
  }
</style>
