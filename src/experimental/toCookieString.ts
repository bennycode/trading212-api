import type {Cookie} from 'playwright';

export function toCookieString(cookies: Cookie[]) {
  return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}
