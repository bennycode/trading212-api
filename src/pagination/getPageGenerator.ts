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
  itemSchema: ItemType,
  url: string,
  params: URLSearchParams = new URLSearchParams()
) {
  let nextPagePath: string | null = null;

  do {
    // Extend params
    params.append('limit', '50');

    // Make request
    const paginatedSchema = createPaginatedResponseSchema(itemSchema);
    const resource = nextPagePath ? nextPagePath : `${url}?${params.toString()}`;
    const response = await apiClient.get(resource);
    const validated = paginatedSchema.parse(response.data);

    for (const item of validated.items) {
      yield item;
    }

    // The `includes('null')` quickfixes the following issue: https://community.trading212.com/t/61788/207
    if (validated.nextPagePath && !validated.nextPagePath.includes('null')) {
      nextPagePath = validated.nextPagePath;
    } else {
      nextPagePath = null;
    }
  } while (nextPagePath);
}
