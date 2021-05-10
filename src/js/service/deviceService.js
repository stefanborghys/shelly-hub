const Device = require('../model/device');

/**
 * Manages stored devices.
 *
 * @class
 * @since 1.0.0
 */
class DeviceService {
  constructor() {
    this._devices = new Set();
  }

  static validateDevice(device) {
    if (!(device instanceof Device)) {
      throw new TypeError('The device is not of type Device');
    }
    return device;
  }

  add(device) {
    DeviceService.validateDevice(device);
    if (this.has(device)) {
      throw new TypeError('The device is already added');
    }
    this._devices.add(device);
  }

  all() {
    const valuesIterator = this._devices.values();
    const devices = [];
    let next = valuesIterator.next();
    while (!next.done) {
      devices.push(next.value);
      next = valuesIterator.next();
    }
    return devices;
  }

  has(device) {
    const valuesIterator = this._devices.values();
    let next = valuesIterator.next();
    let found = false;
    while (!next.done) {
      const nextDevice = next.value;
      if (nextDevice.ipV4Address.ip === device.ipV4Address.ip) {
        found = true;
        break;
      }
      next = valuesIterator.next();
    }
    return found;
  }
}

/**
   * Exports a singleton ConfigurationService.
   *
   * @module
   * @since 1.0.0
   */
module.exports = new DeviceService();
