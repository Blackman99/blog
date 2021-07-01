const OSS = require('ali-oss')
const path = require('path')
const getUploadFiles = require('./getUploadFiles')

const aliOssClient = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIw3zvXKJhMlZ7',
  accessKeySecret: 'eUKPy2NsCB4KUgafGQSeMIoyWbiRhU',
  bucket: 'donsen-blog'
})

const getAllBucketFiles = async() => {
  const allFiles = []
  let marker = null
  do {
    const res = await aliOssClient.list({
      marker
    })
    marker = res.nextMarker
    if (res.objects) {
      allFiles.push(...res.objects)
    }
  } while (marker)
  return new Promise(resolve => {
    resolve(allFiles)
  })
}

const deleteThenUpload = async() => {
  const oldFiles = await getAllBucketFiles()
  if (oldFiles && oldFiles.length > 0) {
    await aliOssClient.deleteMulti(oldFiles.map(({ name }) => name), { quiet: true })
  }
  // 上传所有打包结果文件
  const newFiles = await getUploadFiles()
  newFiles.forEach(async([localPath, remotePath]) => {
    await aliOssClient.put(remotePath, path.normalize(localPath))
  })
}

deleteThenUpload()
