import {getdUUID} from './getdUUID.js';

describe('dUUID', () => {
  it('extracts the device UUID', async () => {
    const duuid = getdUUID([
      {name: 'amp_123456', value: '86131e42-2a57-4320-960d-ba93d42bd720.97633566972296093620439165219189'},
    ]);
    expect(duuid).toBe('86131e42-2a57-4320-960d-ba93d42bd720');
  });
});
