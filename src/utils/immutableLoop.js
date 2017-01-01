/**
 * Provide looping(functional) that will does not use ++ to mutate
 * @param x
 */
export const times = x => f => {
  if (x > 0) {
    f()
    times(x - 1)(f)
  }
}

export const timesWithIterator = n => f => {
  let iter = i => {
    if (i === n) return
    f(i)
    iter(i + 1)
  }
  return iter(0)
}