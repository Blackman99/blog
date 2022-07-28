/**
 * @param {string[]} ideas
 * @return {number}
 */
const distinctNames = function (ideas) {
  const groups = Array(26)
    .fill(0)
    .map(() => new Set())
  for (let i = 0; i < ideas.length; i++) {
    const s = ideas[i]
    const idx = s.charCodeAt(0) - 'a'.charCodeAt(0)
    groups[idx].add(s.slice(1))
  }
  let ans = 0
  for (let i = 1; i < 26; i++) {
    for (let j = 0; j < i; j++) {
      let m = 0
      groups[i].forEach(s => {
        if (groups[j].has(s)) {
          m++
        }
      })
      ans += (groups[i].size - m) * (groups[j].size - m)
    }
  }
  return ans * 2
}

console.log(distinctNames(['coffee', 'cat', 'donuts', 'time', 'toffee']))
