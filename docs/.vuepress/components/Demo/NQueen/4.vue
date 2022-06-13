<template>
  <CodeTab
    use-vue-slot
    hide-copy
    :code-types="['solution1', 'solution2']"
    defaultActiveCodeType="solution1"
  >
    <template #solution1>
      <div class="board">
        <div
          v-for="i in 4"
          :key="i"
          class="row"
        >
          <div
            v-for="j in 4"
            :key="j"
            class="cell"
          >
            <Crown v-if="solution1[i - 1][j - 1] === 'Q'" />
          </div>
        </div>
      </div>
    </template>
    <template #solution2>
      <div class="board">
        <div
          v-for="i in 4"
          :key="i"
          class="row"
        >
          <div
            v-for="j in 4"
            :key="j"
            class="cell"
          >
            <Crown v-if="solution2[i - 1][j - 1] === 'Q'" />
          </div>
        </div>
      </div>
    </template>
  </CodeTab>
</template>
<script>
// @ts-ignore
import CodeTab from '@vp/components/Util/CodeTab.vue'
// @ts-ignore
import Crown from '@vp/icons/Crown.vue'
export default {
  components: {
    CodeTab,
    Crown,
  },
  data() {
    return {
      solution1: ['.Q..', '...Q', 'Q...', '..Q.'],
      solution2: ['..Q.', 'Q...', '...Q', '.Q..'],
    }
  },
}
</script>
<style
  lang="stylus"
  scoped
>
.board {
  margin: 12px auto;
  .cell {
    height: 100px;
    width: 100px;
    color: var(--theme-accent-color);
    display: flex;
    font-size: 56px;
    align-items: center;
    justify-content: center;
  }
  .row {
    &:nth-child(odd) {
      .cell {
        &:nth-child(odd) {
          background-color: #333;
        }
        &:nth-child(even) {
          background-color: #eee;
        }
      }
    }
    &:nth-child(even) {
      .cell {
        &:nth-child(odd) {
          background-color: #eee;
        }
        &:nth-child(even) {
          background-color: #333;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
    .cell {
      width: 70px;
      height: 70px;
      font-size: 36px;
    }
  }
}
</style>
