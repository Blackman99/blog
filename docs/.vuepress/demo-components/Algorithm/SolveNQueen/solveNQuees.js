/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
  const res = []
  const dfs = (
    row = 0,
    paths = Array(n)
      .fill(0)
      .map(() => Array(n).fill('.').join('')),
    cols = {},
    slashes1 = {},
    slashes2 = {}
  ) => {
    if (row === n) {
      res.push(JSON.parse(JSON.stringify(paths)))
      return
    }
    for (let j = 0; j < n; j++) {
      if (cols[j] || slashes1[row - j] || slashes2[row + j]) continue
      cols[j] = true
      slashes1[row - j] = true
      slashes2[row + j] = true
      const arr = Array(n).fill('.')
      arr[j] = 'Q'
      paths[row] = arr.join('')
      dfs(row + 1, paths, cols, slashes1, slashes2)
      cols[j] = false
      slashes1[row - j] = false
      slashes2[row + j] = false
      paths[row] = Array(n).fill('.').join('')
    }
  }
  dfs()
  return res
}

export default solveNQueens
