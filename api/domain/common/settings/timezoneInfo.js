class TimezoneInfo {

    constructor(timezone, autodetect, utcOffset, daylightSavingTime, autoUpdateDaylightSavingTime) {
        this.timezone = timezone;
        this.autodetect = autodetect;
        this.utcOffset = utcOffset;
        this.daylightSavingTime = daylightSavingTime;
        this.autoUpdateDaylightSavingTime = autoUpdateDaylightSavingTime;
    }

    /**
     * Timezone identifier.
     *
     * @returns timezone
     */
    get timezone() {
        return this.timezone;
    }

    /**
     * Timezone auto-detect enabled.
     *
     * @returns timezone auto-detect enabled
     */
    get autodetect() {
        return this.autodetect;
    }

    /**
     * UTC offset.
     *
     * @returns UTC offset
     */
    get utcOffset() {
        return this.utcOffset;
    }

    /**
     * Daylight saving time.
     *
     * @returns daylight saving time
     */
    get daylightSavingTime() {
        return this.daylightSavingTime;
    }

    /**
     * Auto update daylight saving time.
     *
     * @returns auto update daylight saving time
     */
    get autoUpdateDaylightSavingTime() {
        return this.autoUpdateDaylightSavingTime;
    }

}

export default TimezoneInfo;