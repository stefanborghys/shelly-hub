class Cloud {
    constructor(enabled = false, connected = undefined) {
        this.enabled = enabled;
        this.connected = connected;
    }

    /**
     * Enable Shelly Cloud.
     *
     * @returns {Cloud}
     */
    static enable() {
        return new Cloud(true, undefined);
    }

    /**
     * Disable Shelly Cloud.
     *
     * @returns {Cloud}
     */
    static disable() {
        return new Cloud(false, undefined);
    }

    /**
     * Creates a new Cloud.
     *
     * @param enabled - Shelly Cloud enabled [boolean]
     * @param connected - Shelly Cloud connected [boolean]
     * @returns {Cloud}
     */
    static of(enabled, connected) {
        return new Cloud(enabled, connected);
    }

    /**
     * Cloud enabled flag.
     *
     * @returns Shelly cloud enabled? [boolean]
     */
    get enabled() {
        return this.enabled;
    }

    /**
     * Cloud connected flag.
     *
     * @returns Shelly cloud connected? [boolean]
     */
    get connected() {
        return this.connected;
    }

}

export default Cloud;