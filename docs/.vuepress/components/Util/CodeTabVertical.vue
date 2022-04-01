<template>
  <q-carousel
    v-model="codeType"
    vertical
    transition-prev="slide-down"
    transition-next="slide-up"
    animated
    control-color="primary"
    class="bg-grey-3 shadow-1 rounded-borders code-tab-vertical"
    :height="height"
  >
    <template #control>
      <q-carousel-control
        position="top-right"
        :offset="[18, 18]"
        style="background: rgba(0, 0, 0, .3);"
      >
        <q-btn-toggle
          v-model="codeType"
          toggle-color="primary"
          :options="codeOptions"
          unelevated
        />
      </q-carousel-control>
    </template>
    <q-carousel-slide
      v-for="(name, i) in codeTypes"
      :key="i"
      :name="name"
    >
      <div ref="codeContent" class="code-content">
        <Content :slot-key="`${keyPrefix ? `${keyPrefix}-` : ''}${name}`" />
      </div>
      <div class="absolute-bottom-right copy-btn">
        <q-btn round icon="content_copy" color="primary" @click="copyCode">
          <q-tooltip>
            点我复制
          </q-tooltip>
        </q-btn>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import codeTabMixin from '@vp/mixin/codeTab'

export default {
  mixins: [codeTabMixin],
  data() {
    return {
      height: '400px'
    }
  },
  computed: {
    codeOptions() {
      return this.codeTypes.map(label => ({
        label,
        value: label
      }))
    }
  },
  watch: {
    codeType() {
      this.$nextTick(() => {
        this.setHeight()
      })
    }
  },
  mounted() {
    this.setHeight()
  },
  methods: {
    setHeight() {
      const codeContents = this.$refs.codeContent
      if (codeContents && codeContents.length > 0) {
        const codeContentHeight = this.$refs.codeContent[0].clientHeight
        this.height = `${codeContentHeight}px`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.copy-btn  {
  z-index 10;
}
.copy-btn {
  right: 12px;
  bottom: 12px;
}
.code-tab-vertical {
  >>> .q-carousel__slide {
    padding: 0;
  }
  >>> .q-carousel__control {
    z-index: 3;
  }
}
</style>
