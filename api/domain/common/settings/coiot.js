class Coiot {
    constructor(updatePeriod) {
        this.updatePeriod = updatePeriod;
    }

    /**
     * Update period of CoIoT messages, s.
     *
     * @returns update period in seconds
     */
    get updatePeriod() {
        return this.updatePeriod;
    }

}

export default Coiot;