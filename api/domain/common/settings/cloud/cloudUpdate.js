class CloudUpdate {
    constructor(enabled) {
        this.enabled = enabled;
    }

    static enabled() {
        return new CloudUpdate(true);
    }

    static disabled() {
        return new CloudUpdate(false);
    }

    /**
     * Cloud enabled flag.
     *
     * @returns cloud enabled
     */
    get enabled() {
        return this.enabled;
    }

}

export default CloudUpdate;