class Settings {

    constructor(device, accessPoint, client, fallbackClient, mqtt, coiot, sntp, login, pinCode, name, firmwareVersion, discoverable, buildInfo, cloud, location, timeInfo) {
        this.device = device;
        this.accessPoint = accessPoint;
        this.client = client;
        this.fallbackClient = fallbackClient;
        this.mqtt = mqtt;
        this.coiot = coiot;
        this.sntp = sntp;
        this.login = login;
        this.pinCode = pinCode;
        this.name = name;
        this.firmwareVersion = firmwareVersion;
        this.discoverable = discoverable;
        this.buildInfo = buildInfo;
        this.cloud = cloud;
        this.location = location;
        this.timeInfo = timeInfo;
    }

    get device() {
        return this.device;
    }

    /**
     * WiFi access point configuration.
     *
     * @returns {*}
     */
    get accessPoint() {
        return this.accessPoint;
    }

    /**
     * WiFi client configuration.
     *
     * @returns {*}
     */
    get client() {
        return this.client;
    }

    /**
     * Alternative WiFi client configuration.
     *
     * @returns {*}
     */
    get fallbackClient() {
        return this.fallbackClient;
    }

    /**
     * Contains MQTT-related settings.
     *
     * @returns MQTT settings
     */
    get mqtt() {
        return this.mqtt;
    }

    /**
     * Contains CoIoT-related settings.
     *
     * @returns CoIoT settings
     */
    get coiot() {
        return this.coiot;
    }

    get sntp() {
        return this.sntp;
    }

    get login() {
        return this.login;
    }

    /**
     * Current generated PIN code.
     *
     * @returns PIN code
     */
    get pinCode() {
        return this.pinCode;
    }

    /**
     * Unique name of the device.
     *
     * @returns unique name of the device
     */
    get name() {
        return this.name;
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
     * Device discoverable (i.e. visible) flag.
     *
     * @returns device discoverable
     */
    get discoverable() {
        return this.discoverable;
    }

    get buildInfo() {
        return this.buildInfo;
    }

    get cloud() {
        return this.cloud;
    }

    get location() {
        return this.location;
    }

    get timeInfo() {
        return this.timeInfo;
    }

}

export default Settings;