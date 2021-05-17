const Device = require('../model/device');
const ConflictError = require('../model/error/conflictError');
const NotFoundError = require('../model/error/notFoundError');

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

  async add(ip, userId, password) {
    return Device.of(ip, userId, password)
      .then((device) => {
        if (this.hasDeviceWithIp(device.ipV4Address)) {
          throw new ConflictError(`A device with ip '${device.ipV4Address.ip}' has already been added`);
        }
        return device;
      })
      .then((device) => {
        this._devices.add(device);
        return device;
      });
  }

  getAll() {
    const valuesIterator = this._devices.values();
    const devices = [];
    let next = valuesIterator.next();
    while (!next.done) {
      devices.push(next.value);
      next = valuesIterator.next();
    }
    return devices;
  }

  hasDeviceWithIp(ipV4Address) {
    return this._has(((device) => device.ipV4Address.ip === ipV4Address.ip));
  }

  _has(isTheDeviceToBeFound) {
    const valuesIterator = this._devices.values();
    let next = valuesIterator.next();
    let found = false;
    while (!next.done) {
      const nextDevice = next.value;
      if (isTheDeviceToBeFound(nextDevice)) {
        found = true;
        break;
      }
      next = valuesIterator.next();
    }
    return found;
  }

  findById(id) {
    const valuesIterator = this._devices.values();
    let next = valuesIterator.next();
    let foundDevice;
    while (!next.done) {
      const nextDevice = next.value;
      if (nextDevice.id === id) {
        foundDevice = nextDevice;
        break;
      }
      next = valuesIterator.next();
    }
    if (foundDevice) {
      return foundDevice;
    }
    throw new NotFoundError(`Device with id '${id}' could not be found`);
  }
}

/**
 * Exports a singleton DeviceService.
 * Responsible for managing stored devices.
 *
 * @module
 * @since 1.0.0
 */
module.exports = new DeviceService();
