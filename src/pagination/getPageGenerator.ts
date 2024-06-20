import {AxiosInstance} from 'axios';
import {z} from 'zod';

function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(itemSchema: ItemType) {
  return z.object({
    items: z.array(itemSchema),
    nextPagePath: z.union([z.string(), z.null()]),
  });
}

export async function* getPageGenerator<ItemType extends z.ZodTypeAny>(
  apiClient: AxiosInstance,
  url: string,
  params: URLSearchParams,
  itemSchema: ItemType
) {
  let cursor: number = 0;
  while (cursor !== -1) {
    // Extend params
    params.append('limit', '50');
    params.append('cursor', `${cursor}`);

    // Make request
    const paginatedSchema = createPaginatedResponseSchema(itemSchema);
    const response = await apiClient.get(`${url}?${params.toString()}`);
    const validated = paginatedSchema.parse(response.data);

    for (const item of validated.items) {
      yield item;
    }

    // The `includes('null')` quickfixes the following issue: https://community.trading212.com/t/61788/207
    if (!validated.nextPagePath || validated.nextPagePath.includes('null')) {
      cursor = -1;
    } else {
      cursor += 1;
    }
  }
}
