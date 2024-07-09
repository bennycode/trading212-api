import {Cookie} from 'playwright';

export function getdUUID(cookies: Pick<Cookie, 'name' | 'value'>[]) {
  const candidate = cookies.find(cookie => cookie.name.startsWith('amp_'));
  return candidate?.value.split('.')[0];
}
