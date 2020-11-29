class Client {

    constructor(enabled, ssid, ipv4Method, ip, gatewayIp, netmask, dns) {
        this.enabled = enabled;
        this.ssid = ssid;
        this.ipv4Method = ipv4Method;
        this.ip = ip;
        this.gatewayIp = gatewayIp;
        this.netmask = netmask;
        this.dns = dns;
    }

    /**
     * Whether STA mode is active.
     *
     * @returns active
     */
    get enabled() {
        return this.enabled;
    }

    /**
     * SSID of STA the device will associate with.
     *
     * @returns SSID
     */
    get ssid() {
        return this.ssid;
    }

    /**
     * dhcp or static.
     *
     * @returns dhcp or static
     */
    get ipv4Method() {
        return this.ipv4Method;
    }

    /**
     * Local IP address if ipv4_method is static.
     *
     * @returns IP address
     */
    get ip() {
        return this.ip;
    }

    /**
     * Local gateway IP address if ipv4Method is static.
     *
     * @returns gateway IP
     */
    get gatewayIp() {
        return this.gatewayIp;
    }

    /**
     * Mask if ipv4_method is static.
     *
     * @returns IP mask
     */
    get netmask() {
        return this.netmask;
    }

    /**
     * DNS address if ipv4_method is static.
     *
     * @returns DNS
     */
    get dns() {
        return this.dns;
    }

}

export default Client;
