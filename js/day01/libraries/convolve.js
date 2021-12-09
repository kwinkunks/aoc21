/**
 * Convolves two 1D signals.
 * 
 * Computes the discrete, linear convolution of two 1D arrays.
 * Works in the time domain on signals of any length. Mimics the API of numpy.convolve().
 * If v is longer than a, the arrays are swapped before computation.
 *
 * @param {Array} a - The first signal, a 1D array.
 * @param {Array} v - The second signal, a 1D array.
 * @param {String} mode - The mode of convolution, one of:
 *    full: Default. The convolution at each point of the overlap. There are boundary effects.
 *    same: Output the same size as the longer of the two signals. There are boundary effects.
 *    valid: The convolution only where the signals overlap completely. No edge effects.
 *
 * @return {Array} - The convolution of the two signals.
 * 
 * Example:
 * >> convolve([0, 0, 1, 0, 0, 2, 0, 0, 3], [1, 1, 2, 3, 0], mode='valid');
 * [0, 0, 1, 1, 2, 5, 2, 4, 9, 3, 6, 9, 0]
 * 
 * @author Matt Hall <matt@agilescientific.com>
 * @copyright 2021 Agile Scientific <http://agilescientific.com>
 * @license Apache License 2.0 <https://opensource.org/licenses/Apache-2.0>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function convolve(a, v, mode='full') {
  // If v is longer than a, swap them.
  if (v.length > a.length) {
    [a, v] = [v, a];
  }
  // Reverse the kernel array.
  v = v.slice().reverse()
  let al, pl, sl;
  // Compute the lengths of the output (al), padding (pl), and slice (sl).
  if (mode === 'same') {
    al = a.length;
    pl = Math.floor(v.length / 2);
    sl = 0;
  } else if (mode === 'valid') {
    al = a.length - v.length + 1;
    pl = 0;
    sl = 0;
  } else if (mode === 'full') {
    al = a.length + 2 * v.length;
    pl = v.length;
    sl = 1;
  }
  // Pad symmetrically with zeros.
  let arr = Array(pl).fill(0).concat(a).concat(Array(pl).fill(0));
  // Compute the convolution.
  let out = new Array(al).fill(0);
  for (var i = 0; i < al; i++) {
    for (var k = 0; k < v.length; k++) {
      out[i] += arr[i + k] * v[k];
    }
  }
  // Adjust the length of the output (only effective for 'full' mode).
  return out.slice(sl, al - v.length*sl);
}
/**
 * A small unit test.
 */
function _test_convolve() {
  const v = [0, 0, 1, 0, 0, 2, 0, 0, 3];
  const a = [1, 1, 2, 3, 0];
  const result = [0, 0, 1, 1, 2, 5, 2, 4, 9, 3, 6, 9, 0];
  let out;
  out = convolve(a, v, mode='valid');
  console.assert(out.every((x, i) => x === result[i+4]));
  out = convolve(a, v, mode='same');
  console.assert(out.every((x, i) => x === result[i+2]));
  out = convolve(a, v, mode='full');
  console.assert(out.every((x, i) => x === result[i]));
  return;
}
