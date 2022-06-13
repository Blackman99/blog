<template>
  <div
    :class="[
      'board',
      {
        'step-1': step > 0,
        'step-2': step > 1,
        'step-3': step > 2,
        'step-4': step > 3,
      },
    ]"
    ref="board"
  >
    <div
      v-for="n in 25"
      :key="n"
      class="cell"
    ></div>
    <template v-for="n in 5">
      <div
        v-if="step > n - 1"
        :key="`crown-${n}`"
        :class="['crown', `step-${n}`]"
      >
        <Crown />
      </div>
    </template>
  </div>
</template>
<script>
import Crown from '@vp/icons/Crown.vue'

export default {
  components: {
    Crown,
  },
  data() {
    return {
      height: 0,
      step: 0,
    }
  },
  mounted() {
    this.height = this.$refs.board.querySelector('.cell').clientWidth + 'px'
    this.startAnimation()
  },
  methods: {
    startAnimation() {
      const flag = setInterval(() => {
        if (this.step < 5) {
          this.step = this.step + 1
        } else {
          this.step = 0
        }
      }, 2000)
    },
  },
}
</script>
<style
  lang="stylus"
  scoped
>
@keyframes crown {
  0% {
    transform: translate(-10px, -10px) rotate(-45deg);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0);
  }
}
.crown {
  animation: crown 1s 1;
}
.board {
  position: relative;
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  background-color: #eee;
  .cell {
    width: 100px;
    height: 100px;
    line-height: 100px;
    transition: all 1s ease;
    &:nth-child(10n + 1),
    &:nth-child(10n + 3),
    &:nth-child(10n + 5),
    &:nth-child(10n + 7),
    &:nth-child(10n + 9) {
      background-color: #333;
    }
  }
  &.step-1 {
    .cell {
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(11),
      &:nth-child(16),
      &:nth-child(21),
      &:nth-child(7),
      &:nth-child(13),
      &:nth-child(19),
      &:nth-child(25),
       {
        background-color: var(--theme-accent-color);
      }
    }
  }
  &.step-2 {
    .cell {
      &:nth-child(9),
      &:nth-child(10),
      &:nth-child(18),
      &:nth-child(23),
      &:nth-child(12),
      &:nth-child(14),
      &:nth-child(20), {
        background-color: var(--theme-accent-color);
      }
    }
  }
  &.step-4 {
    .cell {
      &:nth-child(22) {
        background-color: var(--theme-accent-color);
      }
    }
  }
}
.crown {
  position: absolute;
  font-size: 56px;
  color: var(--theme-accent-color);
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.step-1 {
    top: 0;
    left: 0;
  }
  &.step-2 {
    left: 40%;
    top: 20%;
  }
  &.step-3 {
    top: 40%;
    left: 80%;
  }
  &.step-4 {
    left: 20%;
    top: 60%;
  }
  &.step-5 {
    left: 60%;
    top: 80%;
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
  .crown {
    width: 50px;
    height: 50px;
    font-size: 32px;
  }
}
</style>
