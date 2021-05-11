/**
 * Information about the device's current status.
 *
 * @class
 * @since 1.0.0
 */
class Status {
  /**
     * Create a new device status.
     *
     * @private
     * @param {!boolean} updatable - Determines if the device has a firmware update ready
     */
  constructor(updatable) {
    this._updatable = updatable;
  }

  /**
     * Creates a new device status representation.
     *
     * @param {!boolean} updatable - Determines if the device has a firmware update ready
     *
     * @returns {Status} A new device status representation
     * @since 1.0.0
     */
  static of(updatable) {
    return new Status(updatable);
  }

  /**
     * Returns if the device has a firmware update ready.
     *
     * @returns {boolean} true when the device can be updated
     * @since 1.0.0
     */
  get updatable() {
    return this._updatable;
  }

  /**
     * Returns the status string representation.
     *
     * @returns {string} The status string representation
     * @since 1.0.0
     */
  toString() {
    return `${this.updatable}`;
  }
}

/**
   * Exports the current status of a Shelly device.
   *
   * @module
   * @since 1.0.0
   */
module.exports = Status;
