import nock from 'nock';
import {APIClient} from '../../../APIClient.js';
import {HistoryAPI} from './HistoryAPI.js';
import transactions1 from '../../../fixtures/api/v0/history/transactions/transactions-1.json' with {type: 'json'};
import transactions2 from '../../../fixtures/api/v0/history/transactions/transactions-2.json' with {type: 'json'};
import {getBaseUrl, TRADING212_ENVIRONMENT} from '../../../getBaseUrl.js';

describe('HistoryAPI', () => {
  describe('getTransactions', () => {
    it('retrieves paginated transactions', async () => {
      const env = TRADING212_ENVIRONMENT.TEST;
      const baseURL = getBaseUrl(env);
      nock(baseURL)
        .persist()
        .get(HistoryAPI.URL.TRANSACTIONS)
        .query(true)
        .reply(uri => {
          if (uri === '/api/v0/history/transactions?limit=50') {
            return [200, JSON.stringify(transactions1)];
          } else if (uri === transactions1.nextPagePath) {
            return [200, JSON.stringify(transactions2)];
          }
          return [404];
        });

      const client = new APIClient(env, 'apiKey');
      const transactions = client.rest.history.getTransactions();
      const total = [];
      for await (const data of transactions) {
        total.push(data);
      }
      expect(total.length).toBe(58);
    });
  });
});
