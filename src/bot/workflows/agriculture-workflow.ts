import { getProductsByCategoryForBot } from "@/dl/products.data"
import { Category, ProductUnit } from "@/generated/prisma/enums"
import { createStep, createWorkflow } from '@mastra/core/workflows'
import { z } from 'zod'

// 1. استخراج الـ Schemas كمتغيرات مستقلة لمنع التكرار وسهولة تعيينها للـ Workflow
const WorkflowInputSchema = z.object({
  category: z.nativeEnum(Category)
})

const WorkflowOutputSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    discountPercentage: z.number().nullable(),
    mainImage: z.string(),
    category: z.nativeEnum(Category),
    unit: z.nativeEnum(ProductUnit),
    factoryId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),

    factory: z.object({
      name: z.string()
    }).nullable(),

    activeComponents: z.array(
      z.object({
        concentration: z.number().nullable(),
        component: z.object({
          id: z.string(),
          title: z.string(),
          unit: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })
    )
  })
)

const getProductsByCategory = createStep({
  id: "get-products-by-category",
  description: "Gets products by category from the database.",
  inputSchema: WorkflowInputSchema,
  outputSchema: WorkflowOutputSchema,

  // 👈 تعديل المتغير وتفكيكه كـ input بدلاً من inputData ليتوافق تماماً مع إصدار Mastra 1.x
  execute: async ({ inputData }) => {
    const category = inputData.category

    // استدعاء دالة قاعدة البيانات
    const products = await getProductsByCategoryForBot(category)

    if (!products) {
      return []
    }

    return products
  }
})

// 2. الحل هنا: تمرير الـ inputSchema والـ outputSchema إلى تهيئة الـ Workflow
const agricultureWorkflow = createWorkflow({
  id: 'agriculture-workflow',
  inputSchema: WorkflowInputSchema,   // 👈 تزويد المدخلات الأساسية للـ Workflow
  outputSchema: WorkflowOutputSchema, // 👈 تزويد المخرجات الأساسية للـ Workflow
})
  .then(getProductsByCategory)
agricultureWorkflow.commit()

export { agricultureWorkflow }