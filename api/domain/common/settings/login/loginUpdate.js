/**
 * Update HTTP authentication configuration.
 */
class LoginUpdate {

    /**
     *
     * @param enabled
     * @param unprotected
     * @param username
     * @param password
     */
    constructor(enabled, unprotected, username, password) {
        this.enabled = enabled;
        this.unprotected = unprotected;
        this.username = username;
        this.password = password;
    }

    static enabled(username, password) {
        return new LoginUpdate(true, true, username, password);
    }

    static disabled(unprotected) {
        return new LoginUpdate(false, unprotected, undefined, undefined);
    }

    /**
     * Whether HTTP authentication is required.
     *
     * @returns HTTP authentication required
     */
    get enabled() {
        return this.enabled;
    }

    /**
     * Whether the user is aware of the risks.
     *
     * @returns user is aware no authentication is required
     */
    get unprotected() {
        return this.unprotected;
    }

    /**
     * Username.
     *
     * @returns username
     */
    get username() {
        return this.username;
    }

    /**
     * Password.
     *
     * @returns password
     */
    get password() {
        return this.password;
    }

}

export default LoginUpdate;