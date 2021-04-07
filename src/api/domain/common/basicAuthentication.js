class BasicAuthentication {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Calculates the authorization header's basic authentication value.
     *
     * WARN: only able to process ASCII characters in username and password!
     * UTF-8 support needs to be implemented when needed.
     *
     * @returns {string}
     */
    authorization() {
        return "Basic " + btoa(this.username + ":" + this.password);
    }

}

export default BasicAuthentication;