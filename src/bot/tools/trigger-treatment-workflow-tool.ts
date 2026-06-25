import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { agricultureTreatmentWorkflow } from '../workflows/agriculture-treatment-workflow'
import CategorySchema from "@/generated/zod/inputTypeSchemas/CategorySchema"

export const triggerTreatmentWorkflowTool = createTool({
  id: 'triggerTreatmentWorkflow',
  description: 'يتم استدعاؤها حتماً فور انتهاء مرحلة التشخيص العلمي، لإرسال البيانات إلى نظام العلاج وجلب المنتجات.',
  inputSchema: z.object({
    category: CategorySchema,
    cropDetails: z.string(),
  }),
  execute: async ({ category, cropDetails }) => {
    const run = await agricultureTreatmentWorkflow.createRun()

    const result = await run.start({
      inputData: {
        category,
        cropDetails,
      },
    })

    return result
  },
})