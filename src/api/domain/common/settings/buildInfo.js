class BuildInfo {
  constructor(id, timestamp, version) {
    this.id = id;
    this.timestamp = timestamp;
    this.version = version;
  }

  get id() {
    return this.id;
  }

  get timestamp() {
    return this.timestamp;
  }

  get version() {
    return this.version;
  }
}

export default BuildInfo;
