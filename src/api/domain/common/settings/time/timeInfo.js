class TimeInfo {

    constructor(time, unixtime, timezoneInfo) {
        this.time = time;
        this.unixtime = unixtime;
        this.timezoneInfo = timezoneInfo;
    }

    /**
     * Current time in HH:MM format if synced.
     *
     * @returns time in HH:MM format
     */
    get time() {
        return this.time;
    }

    /**
     * Unix timestamp if synced; 0 otherwise.
     *
     * @returns unix timestamp or 0
     */
    get unixtime() {
        return this.unixtime;
    }

    get timezoneInfo() {
        return this.timezoneInfo;
    }
}

export default TimeInfo;