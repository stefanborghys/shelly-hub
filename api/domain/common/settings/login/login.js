/**
 * Provides HTTP authentication configuration.
 */
class Login {

    constructor(enabled, unprotected, username) {
        this.enabled = enabled;
        this.unprotected = unprotected;
        this.username = username;
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

}

export default Login;