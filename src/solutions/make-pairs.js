export const makePairs = (items, start = 0) => {
  if (start > items.length - 1) {
    return []
  }
  const left = items[start]
  const pairs = []
  for (let i = start + 1; i < items.length; i++) {
    if (i === start) continue
    const right = items[i]
    const remaining = items.concat()
    remaining.splice(i, 1)
    remaining.splice(start, 1)
    pairs.push({
      left,
      right,
      remaining
    })
  }
  return [
    ...pairs,
    ...makePairs(items, start + 1)
  ]
}
