<template>
  <div class="code-tab q-mb-md">
    <q-expansion-item v-model="expanded">
      <template #header>
        <q-tabs
          v-model="codeType"
          active-color="primary"
          dense
          align="left"
          no-caps
          @click.stop="tabClick"
        >
          <q-tab
            v-for="(name) in codeTypes"
            :key="name"
            :name="name"
            :label="name"
          />
        </q-tabs>
      </template>
      <q-tab-panels v-model="codeType" animated>
        <q-tab-panel
          v-for="(name) in codeTypes"
          :key="name"
          :name="name"
        >
          <div ref="codeContent" class="code-content">
            <slot v-if="useVueSlot" :name="name" />
            <Content v-else :slot-key="`${keyPrefix ? `${keyPrefix}-` : ''}${name}`" />
          </div>
          <div v-if="!hideCopy" class="absolute-bottom-right copy-btn">
            <q-btn round icon="content_copy" color="primary" size="12px" @click="copyCode">
              <q-tooltip>
                点我复制
              </q-tooltip>
            </q-btn>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-expansion-item>
  </div>
</template>
<script>
import codeTabMixin from '@vp/mixin/codeTab'

export default {
  mixins: [codeTabMixin],
  props: {
    useVueSlot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: true
    }
  },
  methods: {
    tabClick() {
      if (!this.expanded) {
        this.expanded = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.code-tab {
  >>> .q-tab-panel {
    padding: 0;
  }
  >>> .q-expansion-item__container {
    .q-item {
      padding: 0;
      justify-content space-between;
    }
  }
  .copy-btn {
    right: 12px;
    bottom: 12px;
    z-index 3;
  }
}
</style>
