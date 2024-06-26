import {z} from 'zod';

export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(itemSchema: ItemType) {
  return z.object({
    items: z.array(itemSchema),
    nextPagePath: z.union([z.string(), z.null()]),
  });
}
