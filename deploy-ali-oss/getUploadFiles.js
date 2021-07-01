const fs = require('fs')
const path = require('path')

const getUploadFiles = async() => {
  const files = []
  const readFiles = (basePath, prefix = '') => {
    const paths = fs.readdirSync(basePath)
    const uploadPrefix = prefix === '' ? '' : `${prefix}/`
    paths.forEach(path => {
      const stat = fs.statSync(`${basePath}\\${path}`)
      if (stat.isDirectory()) {
        readFiles(`${basePath}\\${path}`, `${uploadPrefix}${path}`)
        return
      }
      files.push([`${basePath}\\${path}`, `${uploadPrefix}${path}`])
    })
  }
  readFiles(path.resolve(__dirname, '../output'))
  return new Promise(resolve => {
    resolve(files)
  })
}

module.exports = getUploadFiles

