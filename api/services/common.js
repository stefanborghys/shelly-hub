import Shelly from "../domain/common/shelly";
import Device from "../domain/common/settings/device";
import AccessPoint from "../domain/common/settings/wifi/accessPoint";
import Client from "../domain/common/settings/wifi/client";
import Coiot from "../domain/common/settings/coiot";
import Sntp from "../domain/common/settings/sntp";
import BuildInfo from "../domain/common/settings/buildInfo";
import Cloud from "../domain/common/settings/cloud";
import TimeInfo from "../domain/common/settings/timeInfo";
import TimezoneInfo from "../domain/common/settings/timezoneInfo";
import Settings from "../domain/common/settings/settings";

class Common {

    /**
     * Provides basic information about the device.
     * It does not require HTTP authentication, even if authentication is enabled globally.
     *
     * This endpoint can be used in conjunction with mDNS for device discovery and identification.
     *
     * @see https://shelly-api-docs.shelly.cloud/#shelly
     * @returns {Shelly}
     */
    getShelly = () => {
        // /shelly
        return new Shelly("SHSW-21", "5ECF7F1632E8", true, "20161223-111304/master@2bc16496", 1);
    };

    /**
     * Represents device configuration.
     *
     * @see https://shelly-api-docs.shelly.cloud/#settings
     * @returns {Settings}
     */
    getSettings = (basicAuthentication = undefined) => {
        // /settings
        const device = new Device("SHSW-21", "16324CAABBCC", "shelly1-B929CC");
        const accessPoint = new AccessPoint(false, "shellyswitch-163248", "secret-password-1234");
        const client = new Client(true, "Castle", "dhcp", null, null, null, null);
        const fallbackClient = new Client(true, "Castle", "dhcp", null, null, null, null);
        const mqtt = new Mqtt(false, "192.168.33.3:1883", "", "shelly1-B929CC", 60, 2, true, 60, 0, false, 30);
        const coiot = new Coiot(15);
        const sntp = new Sntp(true, "time.google.com");
        const login = new Login(false, false, "admin");
        const buildInfo = new BuildInfo("20191112-140800", "2019-11-12T14:08:00Z", "1.0");
        const cloud = new Cloud(true, true);

        const location = new Location(42.1234, 24.5678);

        const timezoneInfo = new TimezoneInfo("Europe/Sofia", true, 0, false, true);
        const timeInfo = new TimeInfo("16:40", 0, timezoneInfo);
        return new Settings(device, accessPoint, client, fallbackClient, mqtt, coiot, sntp, login, "123456", "shellyMODEL-16324CAABBCC", "20170427-114337/master@79dbb397", true, buildInfo, cloud, location, timeInfo);
    }

    /**
     * Provides information about the current WiFi AP configuration and allows changes.
     *
     * @see https://shelly-api-docs.shelly.cloud/#settings-ap
     * @param basicAuthentication
     * @param accessPointUpdate
     * @returns {AccessPoint}
     */
    updateAccessPoint = (basicAuthentication = undefined, accessPointUpdate) => {
        // Parameters:
        const enable = accessPointUpdate.enabled === true ? 1 : 0;
        const password = accessPointUpdate.password;
        // /settings/ap
        return new AccessPoint(false, "shellyswitch-163248", "secret-password-1234");
    }

    /**
     *
     * @see https://shelly-api-docs.shelly.cloud/#settings-ap
     * @param basicAuthentication
     * @param clientUpdate
     * @returns {CLient}
     */
    updateClient = (basicAuthentication = undefined, clientUpdate) => {
        // Parameters:
        const enabled = clientUpdate.enabled === true ? 1 : 0;
        const ssid = clientUpdate.ssid;
        const key = clientUpdate.password;
        const ipv4_method = clientUpdate.ipv4Method;
        const ip = clientUpdate.ip;
        const netmask = clientUpdate.netmask;
        const gateway = clientUpdate.gatewayIp;
        const dns = clientUpdate.dns;
        // /settings/sta
        return new Client(true, "Castle", "dhcp", null, null, null, null);
    }

    /**
     *
     * @see https://shelly-api-docs.shelly.cloud/#settings-ap
     * @param basicAuthentication
     * @param clientUpdate
     * @returns {CLient}
     */
    updateFallbackClient = (basicAuthentication = undefined, clientUpdate) => {
        // Parameters:
        const enabled = clientUpdate.enabled === true ? 1 : 0;
        const ssid = clientUpdate.ssid;
        const key = clientUpdate.password;
        const ipv4_method = clientUpdate.ipv4Method;
        const ip = clientUpdate.ip;
        const netmask = clientUpdate.netmask;
        const gateway = clientUpdate.gatewayIp;
        const dns = clientUpdate.dns;
        // /settings/sta1
        return new Client(true, "Castle", "dhcp", null, null, null, null);
    }

    /**
     * @see https://shelly-api-docs.shelly.cloud/#settings-login
     * @param basicAuthentication
     * @param loginUpdate
     * @returns {Login}
     */
    updateLogin = (basicAuthentication = undefined, loginUpdate) => {
        // Parameters:
        const enabled = loginUpdate.enabled === true ? 1 : 0;
        const unprotected = loginUpdate.unprotected;
        const username = loginUpdate.username;
        const password = loginUpdate.password;
        // /settings/login
        return new Login(false, false, "admin");
    }

    updateCloud = (basicAuthentication = undefined, cloudUpdate) => {
        // Parameters:
        const enabled = cloudUpdate.enabled === true ? 1 : 0;
        // /settings/cloud
    }

}

export default Common;