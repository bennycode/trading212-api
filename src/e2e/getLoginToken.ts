import {Cookie} from 'playwright';

export function getLoginToken(cookies: Pick<Cookie, 'name' | 'value'>[]) {
  const loginCookie = cookies.find(cookie => cookie.name === 'LOGIN_TOKEN');
  return loginCookie?.value;
}
