/**
 * Provides location information.
 */
class Location {
  constructor(latitude = 0.0000, longitude = 0.0000) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
     * Creates a new location.
     *
     * @param latitude - degrees latitude in decimal format, South is negative
     * @param longitude - degrees longitude in decimal format, -180°..180°
     * @returns {Location}
     */
  static of(latitude, longitude) {
    return new Location(latitude, longitude);
  }

  /**
     * Degrees latitude in decimal format, South is negative.
     *
     * @returns latitude
     */
  get latitude() {
    return this.latitude;
  }

  /**
     * Degrees longitude in decimal fomrat, between -180° and 180°.
     *
     * @returns longitude
     */
  get longitude() {
    return this.longitude;
  }
}

export default Location;
