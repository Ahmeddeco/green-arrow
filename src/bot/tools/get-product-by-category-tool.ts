import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { Category } from "@/generated/prisma/enums"
import { getProductsByCategoryForBot } from "@/dl/products.data"

export const getProductsByCategoryTool = createTool({
  id: 'get-products-by-category',
  description: 'Gets a list of agricultural products (herbicides, insecticides, fertilizers, etc.) from the local database based on the requested category.',
  inputSchema: z.object({
    category: z.nativeEnum(Category),
  }),
  outputSchema: z.object({
    products: z.array(
      z.object({
        title: z.string(),
        link: z.string(),
        activeIngredient: z.string(),
      })
    ),
  }),
  execute: async (inputData) => {
    const category = inputData.category
    const products = await getProductsByCategoryForBot(category)

    if (!products || products.length === 0) {
      return { products: [] }
    }

    return {
      products: products.map(product => ({
        title: product.title,
        link: product.productUrl ?? '',
        activeIngredient: product.activeComponents[0].component.title ?? ''
      }))
    }
  },
})