/**
 * takes ms and returns human readable time string
 * @method ms
 * @memberof lib/util
 * @param  {Number} ms    - time in milleseconds
 * @return {String}       - human readable string
 */
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = w * 52;

export function ms(ms) {
  if (ms >= y) {
    return `${Math.floor(ms / y)}y`;
  }
  if (ms >= w) {
    return `${Math.floor(ms / w)}w`;
  }
  if (ms >= d) {
    return `${Math.floor(ms / d)}d`;
  }
  if (ms >= h) {
    return `${Math.floor(ms / h)}h`;
  }
  if (ms >= m) {
    return `${Math.floor(ms / m)}m`;
  }
  if (ms >= s) {
    return `${Math.floor(ms / s)}s`;
  }
  return ms.toFixed(4).replace(/\.0000$/, "") + "ms";
}
