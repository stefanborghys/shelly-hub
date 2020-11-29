/**
 * Provides MQTT-related settings.
 */
class Mqtt {

    constructor(enable, server, user, id, reconnectTimeoutMax, reconnectTimeoutMin, cleanSession, keepAlive, maxQos, retain, updatePeriod) {
        this.enable = enable;
        this.server = server;
        this.user = user;
        this.id = id;
        this.reconnectTimeoutMax = reconnectTimeoutMax;
        this.reconnectTimeoutMin = reconnectTimeoutMin;
        this.cleanSession = cleanSession;
        this.keepAlive = keepAlive;
        this.maxQos = maxQos;
        this.retain = retain;
        this.updatePeriod = updatePeriod;
    }

    get enable() {
        return this.enable;
    }

    get server() {
        return this.server;
    }

    get user() {
        return this.user;
    }

    get id() {
        return this.id;
    }

    get reconnectTimeoutMax() {
        return this.reconnectTimeoutMax;
    }

    get reconnectTimeoutMin() {
        return this.reconnectTimeoutMin;
    }

    get cleanSession() {
        return this.cleanSession;
    }

    get keepAlive() {
        return this.keepAlive;
    }

    get maxQos() {
        return this.maxQos;
    }

    get retain() {
        return this.retain;
    }

    get updatePeriod() {
        return this.updatePeriod;
    }

}

export default Mqtt;