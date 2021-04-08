/**
 * Provides HTTP authentication configuration.
 */
class Login {
  constructor(enabled, unprotected, username, password = undefined) {
    this.enabled = enabled;
    this.unprotected = unprotected;
    this.username = username;
    this.password = password;
  }

  /**
     * Creates a new Login.
     *
     * @param enabled - authentication enabled? [boolean]
     * @param unprotected - is the user aware of the risk when authentication is disabled? [boolean]
     * @param username - username
     * @returns {Login}
     */
  static of(enabled, unprotected, username) {
    return new Login(enabled, unprotected, username);
  }

  /**
     * Enable login authentication.
     *
     * @param username - username
     * @param password - password
     * @returns {LoginUpdate}
     */
  static enable(username, password) {
    return new Login(true, true, username, password);
  }

  /**
     * Disable login authentication.
     *
     * @param unprotected - user aware of disabled authentication risks? [boolean]
     * @returns {LoginUpdate}
     */
  static disable(unprotected) {
    return new Login(false, unprotected, undefined, undefined);
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

export default Login;
