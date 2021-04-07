class Device {

    constructor(type, mac, hostname) {
        this.type = type;
        this.mac = mac;
        this.hostname = hostname;
    }

    /**
     * Device model identifier.
     *
     * @returns model identifier
     */
    get type() {
        return this.type;
    }

    /**
     * MAC address of the device in hexadecimal.
     *
     * @returns MAC address
     */
    get mac() {
        return this.mac;
    }

    /**
     * Device hostname.
     *
     * @returns hostname
     */
    get hostname() {
        return this.hostname;
    }

}

export default Device;