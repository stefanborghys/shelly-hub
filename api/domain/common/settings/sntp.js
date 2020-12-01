class Sntp {

    constructor(enabled, server) {
        this.enabled = enabled;
        this.server = server;
    }

    /**
     * Creates a new Sntp configuration.
     *
     * @param enabled - enabled? [boolean]
     * @param server - sntp server host
     * @returns {*}
     */
    static of(enabled, server) {
        return new Sntp(enabled, server);
    }

    /**
     * Custom SNTP server.
     *
     * @param server - server host e.g. "time.google.com"
     * @returns {Sntp}
     */
    static enable(server) {
        return new Sntp(true, server);
    }

    /**
     * Default "time.google.com" SNTP server configuration.
     *
     * @returns {Sntp}
     */
    static default() {
        return new Sntp(true, "time.google.com");
    }

    /**
     * Disable SNTP.
     *
     * @returns {Sntp}
     */
    static disable() {
        // An empty server host value disables timekeeping and requires reboot to apply.
        return new Sntp(false, "");
    }

    get enabled() {
        return this.enabled;
    }

    /**
     * Time server host to be used.
     *
     * @returns time server host
     */
    get server() {
        return this.server;
    }

}

export default Sntp;