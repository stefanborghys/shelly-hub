/**
 * Provides Access Point (AP) configuration.
 */
class AccessPoint {
    constructor(enabled, ssid, password) {
        this.enabled = enabled;
        this.ssid = ssid;
        this.password = password;
    }

    /**
     * Whether AP mode is active.
     *
     * @returns active
     */
    get enabled() {
        return this.enabled;
    }

    /**
     * SSID created by the device's AP.
     *
     * @returns SSID
     */
    get ssid() {
        return this.ssid;
    }

    /**
     * WiFi password required for association with the device's AP.
     *
     * @returns WIFI password
     */
    get password() {
        return this.password;
    }

}

export default AccessPoint;