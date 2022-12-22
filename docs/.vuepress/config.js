const { resolve } = require('path')

const themeColors = [
  ['#673ab7', '103,58,183'],
  ['#3f51b5', '63,81,181'],
  ['#2196f3', '33,150,243'],
  ['#009688', '0,150,136'],
  ['#4caf50', '76,175,80'],
  ['#ff9800', '255,152,0'],
  ['#ff5722', '255,87,34'],
  ['#795548', '121,85,72'],
  ['#607D8B', '96,125,139'],
  ['#2a2b33', '42,43,51'],
]

const colors = themeColors.map(([hex, rgb]) => ({
  btnColor: hex,
  paletteVars: {
    dark: `--theme-accent-color: ${hex};
          --theme-foreground-color: #d8d8d8;
          --theme-border-color: #444;
          --theme-background: #202020;
          --theme-sidebar-background: ${hex};
          --theme-card-background: #252525;
          --theme-card-color: #252525;
          --theme-bg-tertiary-color: #161b22;
          --theme-accent-color-005: rgba(${rgb},0.05);
          --theme-accent-color-01: rgba(${rgb},0.1);
          --theme-accent-color-02: rgba(${rgb},0.2);
          --theme-accent-color-04: rgba(${rgb},0.4);
          --theme-accent-color-08: rgba(${rgb},0.8);`,
    light: `--theme-accent-color: ${hex};
          --theme-foreground-color: #363636;
          --theme-border-color: #e0e0e0;
          --theme-sidebar-background: ${hex} linear-gradient(to bottom, ${hex} 0%, ${hex} 100%);
          --theme-card-background: #fff;
          --theme-bg-tertiary-color: #f6f8fa;
          --theme-accent-color-005: rgba(${rgb},0.05);
          --theme-accent-color-01: rgba(${rgb},0.1);
          --theme-accent-color-02: rgba(${rgb},0.2);
          --theme-accent-color-04: rgba(${rgb},0.4);
          --theme-accent-color-08: rgba(${rgb},0.8);`,
  },
}))

module.exports = {
  port: 23456,
  title: 'Dongsheng 的个人博客',
  description: '偶尔会有一些新奇的想法',
  dest: './output',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Dongsheng 的个人博客',
      description: 'Vue-powered Static Site Generator',
    },
  },
  head: [['link', { rel: 'icon', href: '/avatar.jpg' }]],
  themeConfig: {
    copy: true,
    copyright: `© ${new Date().getFullYear()} ❤️ <a target="_blank" rel="external nofollow noopener" href="https://blog.donsen.site/">Zion Dotson</a>`,
    reward: {
      text: '给我买杯咖啡 ☕.',
      enable: false,
      ways: [
        {
          name: 'wechat',
          icon: 'wechat',
          qrcode: '/images/my-wechat-qrcode.jpg',
          text: '微信支付',
          color: 'rgb(9, 187, 7)',
        },
        {
          name: 'alipay',
          symbol: 'alipay',
          qrcode: '/images/my-alipay-qrcode.jpg',
          text: '支付宝支付',
          color: '#1296db',
        },
      ],
    },
    palette: {
      colors,
    },
    hostname: 'https://blog.donsen.site',
    searchPlaceholder: '搜索',
    searchMaxSuggestions: 10,
    globalPagination: {
      prevText: '上一页',
      nextText: '下一页',
      lengthPerPage: '6',
    },
    paginationComponent: 'CustomPagination',
    dateFormat: 'YYYY-MM-DD',
    smoothScroll: true,
    logo: '/avatar.jpg',
    nav: [
      { text: '博客', link: '/' },
      {
        text: '听听歌吧',
        link: '/listen/',
      },
      { text: '友情链接', link: '/friend-links/' },
    ],
    social: [
      {
        type: 'email',
        link: '1197160272@qq.com',
      },
      {
        type: 'github',
        link: 'Blackman99',
      },
    ],
    blog: {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          title: '博客',
          pagination: {
            lengthPerPage: 7,
            prevText: '',
            nextText: ''
          }
        },
      ],
      frontmatters: [
        {
          id: 'tag',
          keys: ['tag', 'tags'],
          path: '/tags/',
          frontmatter: { title: '标签' },
          pagination: {
            lengthPerPage: 10,
          },
        },
        {
          id: 'category',
          keys: ['category', 'categories'],
          path: '/categories/',
          frontmatter: { title: '目录' },
          pagination: {
            lengthPerPage: 10,
          },
        },
      ],
      comment: {
        service: 'valine',
        appId: '9KduIFr1tWHr5dgODcRkhh4J-gzGzoHsz',
        appKey: 'bR1t4d1c4CDKp71JMjwqbm0C',
      },
    },
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-katex'))
    },
    extractHeaders: ['h2', 'h3', 'h4', 'h5'],
    lineNumbers: true,
  },
  plugins: [
    'vuepress-plugin-smooth-scroll',
    '@vuepress/last-updated',
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-168133590-1',
      },
    ],
  ],
  alias: {
    '@src': resolve(process.cwd()),
    '@vp': resolve(process.cwd(), 'docs/.vuepress'),
  },
}
