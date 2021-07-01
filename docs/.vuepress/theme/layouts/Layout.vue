<template>
  <ClientOnly>
    <div
      class="theme-container"
      :class="pageClasses"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <SideBar />
      <div class="theme-main">
        <slot name="main">
          <component :is="pageName" />
        </slot>
      </div>
      <SvgSprite />
      <Search />
      <FloatMenu />
    </div>
  </ClientOnly>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Archive from '@theme/components/Archive.vue'
import Category from '@theme/components/Category.vue'
import Tag from '@theme/components/Tag.vue'
import CategoryItem from '@theme/components/CategoryItem.vue'
import TagItem from '@theme/components/TagItem.vue'
import Post from '@theme/components/Post.vue'
import FriendLink from '@theme/components/FriendLink.vue'
import SideBar from '@theme/components/SideBar.vue'
import SvgSprite from '@theme/components/SvgSprite.vue'
import { resolveSidebarItems } from '../util'
export default {
  name: 'Layout',
  components: {
    Home,
    Archive,
    Category,
    Tag,
    CategoryItem,
    TagItem,
    Post,
    SideBar,
    FriendLink,
    SvgSprite
  },
  data() {
    return {
      isSidebarOpen: false
    }
  },
  computed: {
    pageName() {
      const typeMap = new Map([
        ['home', 'Home'],
        ['archive', 'Archive'],
        ['categoryItem', 'CategoryItem'],
        ['category', 'Category'],
        ['tag', 'Tag'],
        ['tagItem', 'TagItem'],
        ['friendLink', 'FriendLink']
      ])
      return typeMap.get(this.$page.pageType) || 'Post'
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen
        },
        userPageClass
      ]
    }
  },
  mounted() {
    this.$eventBus.$on('EV_TOGGLE_SIDE_BAR', () => {
      this.isSidebarOpen = !this.isSidebarOpen
    })
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
      this.$eventBus.$emit('EV_TOGGLE_SEARCH', false)
    })

    const { mobile, desktop, ios, andriod } = this.$q.platform.is
    document.body.className = `
          ${desktop ? 'desktop no-touch' : ''} 
          ${mobile ? 'mobile touch' : ''} 
          ${(ios || andriod) ? `platform-${ios ? 'ios' : 'andriod'}` : ''}
          body--light
          `
    if (desktop) {
      return
    }
    if (mobile) {
      document.body.className = 'mobile touch platform-ios body--light'
    }
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>
<style lang="stylus">
@require '../styles/mobile'
@require '../styles/color_scheme'
</style>
