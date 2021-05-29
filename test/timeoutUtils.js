/**
 * Defines timeout utils.
 *
 * @class
 * @since 1.0.0
 */
class TimeoutUtils {
  /**
   * Resolves a Promise after the specified number of milliseconds.
   *
   * @param {!number} milliseconds - The number of milliseconds to timeout
   * @returns {Promise} returns a promise which will be resolved after given number of milliseconds
   * @since 1.0.0
   */
  static resolveAfterNumberOfMilliseconds(milliseconds) {
    return new Promise((resolve) => setTimeout(() => resolve(true), milliseconds));
  }

  /**
   * Rejects a Promise after the specified number of milliseconds with given error.
   *
   * @param {!number} milliseconds - The number of milliseconds to timeout
   * @param {Error} error - The error to reject with
   * @returns {Promise} returns a promise which will be rejected after given number of milliseconds
   * @since 1.0.0
   */
  static rejectAfterNumberOfMilliseconds(milliseconds, error) {
    return new Promise((resolve, reject) => setTimeout(() => reject(error), milliseconds));
  }
}

/**
 * Exports timeout utils.
 * Mainly used for test purposes.
 *
 * @module
 * @since 1.0.0
 */
module.exports = TimeoutUtils;
