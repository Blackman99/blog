const counter = function(content) {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length
  const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length
  return [cn, en]
}
const calcReadingTime = function(content, { cn = 300, en = 160 } = {}) {
  const len = counter(content)
  const readingTime = len[0] / cn + len[1] / en
  return readingTime < 1 ? '1' : parseInt(readingTime, 10)
}
const wordcount = function(content) {
  const len = counter(content)
  const count = len[0] + len[1]
  if (count < 1000) {
    return count
  }
  return Math.round(count / 100) / 10 + 'k'
}

module.exports = (options = {}, context) => ({
  name: 'maker-theme-utils',
  extendPageData($page) {
    if ($page.path === '/archives/') {
      $page.pageType = 'archive'
      return
    }
    if ($page.path === '/categories/') {
      $page.pageType = 'category'
      return
    }
    if (/^\/categories\/\w/.test($page.path)) {
      $page.pageType = 'categoryItem'
      return
    }
    if ($page.path === '/tags/') {
      $page.pageType = 'tag'
      return
    }
    if (/^\/tags\/\w/.test($page.path)) {
      $page.pageType = 'tagItem'
      return
    }
    if ($page.path === '/' || $page.path.startsWith('/page/') || $page.path === '/projects/') {
      $page.pageType = 'home'
      return
    }
    if ($page.path === '/friend-links/') {
      $page.pageType = 'friendLink'
      return
    }
    if ($page.pid === 'post') {
      const { _strippedContent } = $page
      const content = _strippedContent.replace(/\s/g, '')
      $page.wordCount = wordcount(content)
      $page.readingTime = calcReadingTime(content, context.themeConfig.wordPerminute)
    }
  },
  additionalPages() {
    const pages = [{
      path: '/archives/',
      frontmatter: {
        title: 'Archive'
      }
    }]
    return pages
  }
})
