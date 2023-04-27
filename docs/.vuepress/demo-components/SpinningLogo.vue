<template>
  <div class="wrapper">
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <circle cx="300" cy="300" r="250" fill="none" stroke="#DAAFAF" />
      <image class="item" href="/logos/vue-logo.png" height="100" width="100">
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path="M 300,50
            A 250 250 0 0 1 300 550
            A 250 250 0 0 1 300 50"
        />
      </image>  
      
      <image class="item" href="/logos/svelte.svg" height="100" width="100">
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path="M 84,425
            A 250 250 0 0 1 300,50
            A 250 250 0 0 1 300,550
            A 250 250 0 0 1 84,425"
        />
      </image> 
      
      <image class="item" href="/logos/react.svg" height="100" width="100">
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path="M 516,425
            A 250 250 0 0 1 300 550
            A 250 250 0 0 1 300 50
            A 250 250 0 0 1 516,425"
        />
      </image> 
      <image class="siyuan"
             x="180"
             y="180"
             width="240"
             href="/logos/siyuan-logo.png"></image>
    </svg>
  </div>
</template>
<style scoped>
  @keyframes gelatine {
    from, to { transform: scale(1, 1); }
    25% { transform: scale(0.9, 1.1); }
    50% { transform: scale(1.1, 0.9); }
    75% { transform: scale(0.95, 1.05); }
  }
  .wrapper {
    display: flex;
  }
  svg {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
  }
  .item {
    transform-origin: center;
    transform: translate(-50px, -50px);
  }
  .siyuan {
    transform-origin: center;
    position: absolute;
    top: 50%;
    animation: gelatine .5s infinite;
  }
</style>