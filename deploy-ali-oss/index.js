const deploy = require('ali-oss-static-web-deploy')

deploy({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIw3zvXKJhMlZ7',
  accessKeySecret: 'eUKPy2NsCB4KUgafGQSeMIoyWbiRhU',
  bucket: 'donsen-blog',
  staticWebAppPath: require('path').resolve(process.cwd(), 'output')
})
