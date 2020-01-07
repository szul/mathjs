import { factory } from '../../../utils/factory'

const DEFAULT_NORMALIZATION = 'unbiased'

const name = 'pointBiserial'
const dependencies = ['typed', 'sqrt', 'std', 'mean']

export const createPointBiserial = /* #__PURE__ */ factory(name, dependencies, ({ typed, sqrt, std, mean }) => {
  /**
   * Compute the point biserial correlation coefficient where a binary variable
   * is compared to a continuous variable.
   *
   * Optionally, the type of normalization used for the standard deviation can be specified as
   * the final parameter. The parameter `normalization` can be one of the following values:
   *
   * - 'unbiased' (default) The sum of squared errors is divided by (n - 1)
   * - 'uncorrected'        The sum of squared errors is divided by n
   * - 'biased'             The sum of squared errors is divided by (n + 1)
   *
   *
   * Syntax:
   *
   *     math.pointBiserial([a, b, c], [x, y, z])
   *     math.pointBiserial([a, b, c], [x, y, z], normalization)
   *
   * Examples:
   *
   *     math.pointBiserial()                     // returns ?
   *
   * See also:
   *
   *    std, variance
   *
   * @param {Array} array1
   *                        A single array of values representing the x value (continuous value) where
   *                        the y value (binary value) is 1
   * @param {Array} array2
   *                        A single array of values representing the x value (continuous value) where
   *                        the y value (binary value) is 0
   * @param {string} [normalization='unbiased']
   *                        Determines how to normalize for the standard deviation.
   *                        Choose 'unbiased' (default), 'uncorrected', or 'biased'.
   * @return {*} The point biserial correlation
   */
  return typed(name, {
    // pointBiserial([a, b, c, d, ...], [x, y, z, ...])
    'Array, Array': function (array1, array2) {
        return _pointBiserial(array1, array2, DEFAULT_NORMALIZATION)
    },

    // pointBiserial([a, b, c, d, ...], [x, y, z, ...], normalization)
    'Array, Array, string': function (array1, array2, normalization) {
        return _pointBiserial(array1, array2, normalization)
    }

  })

  function _pointBiserial (array1, array2, normalization) {
    if (array1.length === 0 || array2.length === 0) {
        throw new SyntaxError('Function pointBiserial requires two arrays with one or more items.')
    }
    try {
        const step1 = ((array1.length > 0) ? mean.apply(null, [array1]) : 0)
        const step2 = ((array2.length > 0) ? mean.apply(null, [array2]) : 0)
        const step3 = step1 - step2
        const total = x.length + y.length
        const dataset = [...x, ...y]
        const step4 = step3 / std.apply(null, [dataset, normalization])
        const step5 = (x.length / total) * (y.length / total)
        return step4 * sqrt.apply(null, [step5])
    }
    catch(err) {
        return NaN;
    }
  }
})
