<template>
  <div class="container">
    <div class="demo">
      <div
        v-for="n in 9"
        :key="n"
        class="cell"
      >
        {{ n }}
      </div>
      <div
        v-for="n in 5"
        :key="`line-${n}`"
        class="line"
        :class="`line-${n}`"
      >
        <div class="order">{{ n }}</div>
        <Arrow class="arrow" />
      </div>
    </div>
  </div>
</template>
<script>
import Arrow from './Arrow.vue'
export default {
  components: {
    Arrow,
  },
  data() {
    return {}
  },
}
</script>
<style
  lang="stylus"
  scoped
>
.container {
  display: flex;
  justify-content: center;
}
.demo {
  border: 1px solid var(--theme-accent-color);
  border-bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
}
.cell {
  &:nth-child(3n + 1),
  &:nth-child(3n + 2) {
    border-right: 1px solid var(--theme-accent-color);
  }
  border-bottom: 1px solid var(--theme-accent-color);;
  width: 100px;
  line-height: 100px;
  text-align: center;
  height: 100px;
  font-size: 56px;
}
.line {
  position: absolute;
  width: 4px;
  background-color: var(--theme-accent-color);
  transform-origin: top left;
  transform: rotate(-135deg);
  .order {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--theme-accent-color);
    color: #fff;
    line-height: 24px;
    text-align: center;
    left: 0;
    transform: translate(50%, -50%) rotate(135deg);
  }
  .arrow {
    color: var(--theme-accent-color);
    font-size: 56px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &-1,
  &-3,
  &-5 {
    .arrow {
      transform: translate(-50%, -50%) rotate(90deg);
    }
    .order {
      top: 0;
    }
  }
  &-2,
  &-4 {
    .arrow {
      transform: translate(-50%, -50%) rotate(-90deg);
    }
    .order {
      bottom: 0;
    }
  }
  &-1 {
    left: 0;
    top: 33.3333%;
    height: 142px;

  }
  &-2 {
    left: 0;
    top: 66.666%;
    height: 284px;
  }
  &-3 {
    left: 0;
    top: 100%;
    height: 426px;
  }
  &-4 {
    left: 33.3333%;
    top: 100%;
    height: 284px;
  }
  &-5 {
    left: 66.6666%;
    top: 100%;
    height: 142px;
  }
}
</style>
