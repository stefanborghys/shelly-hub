class CoIot {
  constructor(updatePeriod = 15) {
    this.updatePeriod = updatePeriod;
  }

  /**
     * Creates a new CoIoT.
     *
     * @param updatePeriod - update period of CoIoT messages 15 - 65535 seconds
     * @returns {CoIot}
     */
  static of(updatePeriod) {
    return new CoIot(updatePeriod);
  }

  /**
     * Update period of CoIoT messages, s.
     *
     * @returns update period in seconds
     */
  get updatePeriod() {
    return this.updatePeriod;
  }
}

export default CoIot;
