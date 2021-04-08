class SettingsUpdate {
  constructor(reset, mqtt, coIot, sntp, name, discoverable, timezoneInfo, location) {
    this.reset = reset;
    this.mqtt = mqtt;
    this.coIot = coIot;
    this.sntp = sntp;
    this.name = name;
    this.discoverable = discoverable;
    this.timezoneInfo = timezoneInfo;
    this.location = location;
  }

  /**
     * Will perform a factory reset of the device.
     *
     * @returns factory reset the device
     */
  get reset() {
    return this.reset;
  }

  get mqtt() {
    return this.mqtt;
  }

  get coIot() {
    return this.coIot;
  }

  get sntp() {
    return this.sntp;
  }

  /**
     * User-configurable device name.
     *
     * @returns unique name of the device
     */
  get name() {
    return this.name;
  }

  /**
     * Set whether device should be discoverable (i.e. visible).
     *
     * @returns device discoverable
     */
  get discoverable() {
    return this.discoverable;
  }

  get timezoneInfo() {
    return this.timezoneInfo;
  }

  get location() {
    return this.location;
  }
}

export default SettingsUpdate;
