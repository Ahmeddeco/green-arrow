import { createStep, createWorkflow } from '@mastra/core/workflows'
import { z } from 'zod'
import { Category } from '@/generated/prisma/enums'
import { getProductsByCategoryTool } from "../tools/get-product-by-category-tool"

const productsOutputSchema = z.object({
  products: z.array(
    z.object({
      title: z.string(),
      link: z.string(),
      activeIngredient: z.string(),
    })
  ),
})

/* ---------------------------- fetchProductsStep --------------------------- */
const fetchProductsStep = createStep(getProductsByCategoryTool)

/* ------------------------- analyzeAndRecommendStep ------------------------ */
const analyzeAndRecommendStep = createStep({
  id: 'analyze-and-recommend',
  description: 'Compares products and weather data to generate the final treatment recommendation',
  inputSchema: z.object({
    cropDetails: z.string(),
    productsData: productsOutputSchema,
  }),
  outputSchema: z.object({
    recommendation: z.string(),
  }),
  execute: async ({ inputData, mastra }) => {
    if (!inputData) {
      throw new Error('Input data not found')
    }

    const agent = mastra?.getAgent('agricultureAgent')
    if (!agent) {
      throw new Error('Agriculture agent not found in Mastra context')
    }

    const promptContext = `
أنت الآن في خطوة اتخاذ القرار النهائي بناءً على بيانات حقيقية مستخرجة من النظام:

تفاصيل المحصول والإصابة المستلمة:
${inputData.cropDetails}

قائمة المنتجات المتاحة والمطابقة في قاعدة البيانات الحالية (اختر منها حصراً):
${JSON.stringify(inputData.productsData.products, null, 2)}

المهمة المطلوبة منك:
بناءً على المعطيات السابقة، قم باختيار منتج واحد فقط من القائمة الممررة أعلاه كأفضل خيار لعلاج هذه الإصابة الفطرية.
أخرج الإجابة بشكل مباشر وصارم على خطوات (1، 2، 3) متبوعاً بتوصية الأمان، واستبدل الأقواس بالبيانات الحقيقية للمنتج المختار:

1. **المنتج المقترح:** [اكتب هنا حتماً الـ title للمنتج المختار] (رابط الصفحة: [اكتب هنا الـ link للمنتج المختار])
2. **المادة الفعالة:** [اكتب هنا الـ activeIngredient للمنتج المختار]
3. **سبب الاختيار:** [اكتب مبرراً فنياً زراعياً منطقياً بناءً على نوع الإصابة]

**توصية الأمان:**
يجب الالتزام بفترة ما قبل الحصاد (PHI) المذكورة على عبوة المنتج لضمان سلامة المحصول.
`

    const response = await agent.generate(promptContext)

    return {
      recommendation: response.text,
    }
  },
})

const workflowInputSchema = z.object({
  category: z.nativeEnum(Category).describe('فئة الإصابة المستنتجة'),
  cropDetails: z.string().describe('نوع المحصول وعمر النبات وتفاصيل الإصابة الملاحظة'),
})

type WorkflowInput = z.infer<typeof workflowInputSchema>

/* ---------------------- agricultureTreatmentWorkflow ---------------------- */
const agricultureTreatmentWorkflow = createWorkflow({
  id: 'agriculture-treatment-workflow',
  inputSchema: workflowInputSchema,
  outputSchema: z.object({
    recommendation: z.string(),
  }),
})

  .map(async ({ getInitData }) => {
    const initData = getInitData<WorkflowInput>()
    return {
      category: initData.category,
    }
  })
  .then(fetchProductsStep)

  .map(async ({ inputData, getInitData }) => {
    const initData = getInitData<WorkflowInput>()
    return {
      cropDetails: initData.cropDetails,
      productsData: inputData,
    }
  })
  .then(analyzeAndRecommendStep)
  .commit()

export { agricultureTreatmentWorkflow }