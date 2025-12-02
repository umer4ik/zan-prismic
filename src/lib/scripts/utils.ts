import { lusolve } from "mathjs"

export const zanEasing = 'cubicBezier(0.547, 0, 0.158, 1)'
export const lerp = (progress: number, speedCoefficient = 4, bottomThreshold = 33.3333, total = 100) => {
  const p = total - (total - bottomThreshold) * (progress * speedCoefficient)
  return p < bottomThreshold ? bottomThreshold : p
}
export const extrapolate = (min: number, max: number, x: number, max2: number) => {
  const A = [[min, 1], [max, 1]]
  const b = [0, max2]
  const solution = lusolve(A, b);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return x * solution[0][0] + solution[1][0]
}

export const lerp2 = (x: number, y: number, a: number) => x * (1 - a) + y * a;
export const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
export const range = (x1: number, y1: number, x2: number, y2: number, a: number) => lerp2(x2, y2, invlerp(x1, y1, a));
