interface Spec {
  [key: number]: number
}

export const weightedRand = (spec: Spec) => {
  let i: any
  const table: number[] = []
  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (let j = 0; j < spec[i] * 10; j++)
      table.push(i)
  }
  return () => table[Math.floor(Math.random() * table.length)]
}
// var rand012 = weightedRand({0:0.8, 1:0.1, 2:0.1});
// rand012(); // random in distribution...

export const weightedRand2 = (spec: Spec) => {
  let i
  let sum = 0
  const r = Math.random()
  for (i in spec) {
    sum += spec[i]
    if (r <= sum) return i
  }
}
weightedRand2({ 0: 0.8, 1: 0.1, 2: 0.1 }) // random in distribution...

function weightedRandom(min, max) {
  return Math.round(max / (Math.random() * max + min))
}

function randomSimple() {
  return [0, 0, 0, 0, 0, 0, 0, 0, 1, 2][Math.floor(Math.random() * 10)]
}

function randomCase() {
  const n = Math.floor(Math.random() * 100)
  switch (n) {
    case n < 80:
      return 0
    case n < 90:
      return 1
    case n < 100:
      return 2
  }
}

function randomLoop(weight, num) {
  const n = Math.floor(Math.random() * 100); const amt = 0
  for (let i = 0; i < weight.length; i++) {
    // amt+=weight[i]; *alternative method
    // if(n<amt){
    if (n < weight[i])
      return num[i]
  }
}

weight = [80, 90, 100]
// weight=[80,10,10]; *alternative method
num = [0, 1, 2]
