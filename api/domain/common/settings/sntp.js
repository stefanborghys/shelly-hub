class Sntp {

    constructor(enabled, server) {
        this.enabled = enabled;
        this.server = server;
    }

    get enabled() {
        return this.enabled;
    }

    get server() {
        return this.server;
    }

}

export default Sntp;