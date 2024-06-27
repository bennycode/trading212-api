import nock from 'nock';
import {APIClient} from '../../APIClient.js';
import pie1337 from '../../fixtures/api/v0/equity/pies/pie1337.json' with {type: 'json'};
import {getBaseUrl} from '../../getBaseUrl.js';
import {PieAPI} from './PieAPI.js';

describe('PieAPI', () => {
  describe('getPie', () => {
    it('fetches a pie by ID', async () => {
      const baseURL = getBaseUrl('test');
      nock(baseURL).get([PieAPI.URL.PIES, pie1337.settings.id].join('/')).reply(200, pie1337);
      const client = new APIClient(baseURL, 'apiKey');
      const pie = await client.rest.pie.getPie(pie1337.settings.id);
      expect(pie.settings.id).toBe(pie1337.settings.id);
    });
  });
});
