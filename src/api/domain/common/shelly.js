/**
 * Provides basic information about the device.
 */
class Shelly {

    /**
     * Provides basic information about the device.
     *
     * @param type - shelly model
     * @param mac - MAC address
     * @param requireAuthentication - require's authentication
     * @param firmwareVersion - firmware version
     * @param longid - long id
     */
    constructor(type, mac, requireAuthentication, firmwareVersion, longid) {
        this.type = type;
        this.mac = mac;
        this.requireAuthentication = requireAuthentication;
        this.firmwareVersion = firmwareVersion;
        this.longid = longid;
    }

    /**
     * Shelly model identifier.
     *
     * @returns Shelly model
     */
    get type() {
        return this.type;
    }

    /**
     * MAC address of the device.
     *
     * @returns MAC address
     */
    get mac() {
        return this.mac;
    }

    /**
     * Whether HTTP requests require authentication.
     *
     * @returns authentication required
     */
    get requireAuthentication() {
        return this.requireAuthentication;
    }

    /**
     * Current firmware version.
     *
     * @returns firmware version
     */
    get firmwareVersion() {
        return this.firmwareVersion;
    }

    /**
     * 1 if the device identifies itself with its full MAC address;
     * 0 if only the last 3 bytes are used
     *
     * @returns 0 or 1
     */
    get longId() {
        return this.longid;
    }

}

export default Shelly;
