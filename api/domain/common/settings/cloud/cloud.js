class Cloud {
    constructor(enabled, connected) {
        this.enabled = enabled;
        this.connected = connected;
    }

    /**
     * Cloud enabled flag.
     *
     * @returns cloud enabled
     */
    get enabled() {
        return this.enabled;
    }

    /**
     * Cloud connected flag.
     *
     * @returns cloud connected
     */
    get connected() {
        return this.connected;
    }

}

export default Cloud;