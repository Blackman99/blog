import { blogTheme } from '@sveltepress/theme-blog'
import { sveltepress } from '@sveltepress/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: blogTheme({
        title: 'Dongsheng 的个人博客',
        description: '丈夫·父亲·咖啡·健身·偶尔会有一些新奇的想法',
        base: 'https://dongsheng-blog.netlify.app',
        author: {
          name: 'Dongsheng Zhao',
          avatar: '/avatar.jpg',
          bio: '丈夫·父亲·咖啡·健身·偶尔会有一些新奇的想法',
          socials: {
            github: 'Blackman99',
            email: '1197160272@qq.com',
            rss: '/rss.xml',
          },
        },
        navbar: [
          { title: '博客', to: '/' },
          { title: '我的开源', to: '/categories/project/' },
          { title: '健身随记', to: '/categories/fitness/' },
          { title: '听听歌吧', to: '/listen/' },
          { title: '友情链接', to: '/friend-links/' },
          { title: '时间线', to: '/timeline/' },
          { title: '标签', to: '/tags/' },
        ],
        rss: {
          enabled: true,
          copyright: `© ${new Date().getFullYear()} Dongsheng Zhao`,
        },
        liveCode: {
          sourceLabel: '查看代码',
        },
        themeColor: {
          primary: '#673ab7',
          secondary: '#3f51b5',
          bg: '#16141f',
          surface: '#221f2e',
        },
      }),
      siteConfig: {
        title: 'Dongsheng 的个人博客',
        description: '丈夫·父亲·咖啡·健身·偶尔会有一些新奇的想法',
        lang: 'zh-CN',
      },
    }),
  ],
  server: {
    port: 23456,
    host: true,
  },
  ssr: {
    noExternal: ['@fontsource-variable/fraunces', '@fontsource/inter'],
  },
})

export default config
