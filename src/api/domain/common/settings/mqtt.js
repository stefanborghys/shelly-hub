/**
 * Provides MQTT-related settings.
 */
class Mqtt {
  constructor(enabled,
    server,
    username,
    id,
    reconnectTimeoutMax,
    reconnectTimeoutMin,
    cleanSession,
    keepAlive,
    maxQos,
    retain,
    updatePeriod,
    password = undefined) {
    this.enabled = enabled;
    this.server = server;
    this.username = username;
    this.id = id;
    this.reconnectTimeoutMax = reconnectTimeoutMax;
    this.reconnectTimeoutMin = reconnectTimeoutMin;
    this.cleanSession = cleanSession;
    this.keepAlive = keepAlive;
    this.maxQos = maxQos;
    this.retain = retain;
    this.updatePeriod = updatePeriod;
    this.password = password;
  }

  /**
     * Creates a new Mqtt configuration.
     *
     * @param enabled - connecting a MQTT broker enabled? [boolean]
     * @param server - broker IP address and port, ex. 10.0.0.1:1883
     * @param username - username, leave empty to disable authentication
     * @param id
     * @param reconnectTimeoutMax - maximum interval for reconnect attempts
     * @param reconnectTimeoutMin - minimum interval for reconnect attempts
     * @param cleanSession - clean session [boolean]
     * @param keepAlive - keep alive period in seconds
     * @param maxQos - max value of QOS for MQTT packets
     * @param retain - retain flag [boolean]
     * @param updatePeriod - periodic update in seconds, 0 to disable
     * @returns {Mqtt}
     */
  static of(enabled, server, username, id, reconnectTimeoutMax, reconnectTimeoutMin, cleanSession, keepAlive, maxQos, retain, updatePeriod) {
    return new Mqtt(enabled, server, username, id, reconnectTimeoutMax, reconnectTimeoutMin, cleanSession, keepAlive, maxQos, retain, updatePeriod);
  }

  static enable(server, username, id, reconnectTimeoutMax, reconnectTimeoutMin, cleanSession, keepAlive, maxQos, retain, updatePeriod, password) {
    return new Mqtt(true, server, username, id, reconnectTimeoutMax, reconnectTimeoutMin, cleanSession, keepAlive, maxQos, retain, updatePeriod, password);
  }

  static disable() {
    return new Mqtt(false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

  /**
     * Enable connecting to a MQTT broker.
     *
     * @returns enable MQTT
     */
  get enabled() {
    return this.enabled;
  }

  /**
     * MQTT broker IP address and port,
     * ex. 10.0.0.1:1883.
     *
     * @returns IP address and port
     */
  get server() {
    return this.server;
  }

  /**
     * MQTT username, leave empty to disable authentication.
     *
     * @returns username
     */
  get username() {
    return this.username;
  }

  /**
     * MQTT ID --
     * by default this has the form '<shellymodel>-<deviceid>'.
     * e.g. shelly1-B929CC.
     * If you wish to use custom a MQTT ID,
     * it is recommended that it doesn't exceed 25 characters.
     *
     * @returns id
     */
  get id() {
    return this.id;
  }

  /**
     * Maximum interval for reconnect attempts.
     *
     * @returns maximum interval
     */
  get reconnectTimeoutMax() {
    return this.reconnectTimeoutMax;
  }

  /**
     * Minimum interval for reconnect attempts.
     *
     * @returns minimum interval
     */
  get reconnectTimeoutMin() {
    return this.reconnectTimeoutMin;
  }

  /**
     * MQTT clean session flag.
     *
     * @returns clean session
     */
  get cleanSession() {
    return this.cleanSession;
  }

  /**
     * MQTT keep alive period in seconds.
     *
     * @returns keep alive period in seconds
     */
  get keepAlive() {
    return this.keepAlive;
  }

  /**
     * Max value of QOS for MQTT packets.
     *
     * @returns max value of QOS
     */
  get maxQos() {
    return this.maxQos;
  }

  /**
     * MQTT retain flag.
     *
     * @returns retain
     */
  get retain() {
    return this.retain;
  }

  /**
     * Periodic update in seconds, 0 to disable.
     *
     * @returns periodic update in seconds
     */
  get updatePeriod() {
    return this.updatePeriod;
  }

  /**
     * MQTT password.
     *
     * @returns password
     */
  get password() {
    return this.password;
  }
}

export default Mqtt;
