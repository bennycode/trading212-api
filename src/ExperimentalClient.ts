import {enforceAuth} from './e2e/enforceAuth.js';
import type {Trading212Auth} from './e2e/getAuth.js';
import {getAuth} from './e2e/getAuth.js';
import type {Cookie} from 'playwright';

export class ExperimentalClient {
  private readonly auth?: Trading212Auth;

  private async login() {
    if (this.auth) {
      return this.auth;
    }
    return getAuth(`${process.env.TRADING212_EMAIL}`, `${process.env.TRADING212_PASSWORD}`);
  }

  async getAuthentication() {
    const auth = await this.login();
    const cookies: Cookie[] = JSON.parse(auth.cookieString);
    return enforceAuth(auth, cookies);
  }
}
