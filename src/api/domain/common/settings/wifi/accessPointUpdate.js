/**
 * Updates Access Point (AP) configuration.
 */
class AccessPointUpdate {
  constructor(enabled, password) {
    this.enabled = enabled;
    this.password = password;
  }

  /**
     * Access point enabled.
     *
     * @returns enabled
     */
  get enabled() {
    return this.enabled;
  }

  /**
     * WiFi password required for association with the device's AP.
     *
     * @returns password
     */
  get password() {
    return this.password;
  }
}

export default AccessPointUpdate;
