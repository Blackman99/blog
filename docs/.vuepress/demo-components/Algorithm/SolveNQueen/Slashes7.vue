<template>
  <div
    class="board"
    ref="board"
  >
    <div
      v-for="n in 25"
      :key="n"
      class="cell"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 0,
    }
  },
  mounted() {
    this.height = this.$refs.board.querySelector('.cell').clientWidth + 'px'
  },
}
</script>
<style
  lang="stylus"
  scoped
>
.board {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  background-color: #eee;
  .cell {
    width: 100px;
    height: 100px;
    line-height: 100px;
    &:nth-child(10n + 1),
    &:nth-child(10n + 3),
    &:nth-child(10n + 5),
    &:nth-child(10n + 7),
    &:nth-child(10n + 9) {
      background-color: #333;
    }
    &:nth-child(6n):not(:nth-child(42)):not(:nth-child(48)) {
      position: relative;
      &::after {
        text-align: center;
        color: #fff;
        content: 'i - j = 1';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--theme-accent-color);
        opacity .5;
      }
    }
    &:nth-child(3),
    &:nth-child(7),
    &:nth-child(11) {
      position: relative;
      &::after {
        text-align: center;
        color: #fff;
        content: 'i + j = 2';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--theme-accent-color);
        opacity .8;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .board {
    width: 250px;
    .cell {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 12px;
    }
  }
}
</style>
