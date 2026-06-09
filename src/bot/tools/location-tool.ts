import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

// الدالة البرمجية النظيفة التي تجلب الموقع من سياق السيرفر المدمج
export const locationTool = createTool({
  id: 'get-farm-location',
  description: 'تجلب إحداثيات الموقع الجغرافي الحالي (خطوط الطول والعرض) للمزارع تلقائياً من سياق الطلب المشترك دون تدخل يدوي.',
  inputSchema: z.object({}), // الاسكيما فارغة لأن الاستدعاء والجلب أوتوماتيكي بالكامل بالخلفية
  execute: async ({ context }) => {

    // قراءة الإحداثيات مباشرة من الـ context المشترك لسيرفر Next/Mastra
    const farmLocation = context?.currentFarmLocation

    if (farmLocation?.lat && farmLocation?.lng) {
      // إرجاع بيانات رقمية نقية فقط لتغذية العميل الزراعي وأداة الطقس
      return {
        success: true,
        latitude: farmLocation.lat,
        longitude: farmLocation.lng,
        status: 'fetched_successfully'
      }
    }

    // خطة بديلة (Fallback) في حال عدم تفعيل المزارع للـ GPS (موقع افتراضي لوسط الدلتا كمثال)
    return {
      success: false,
      latitude: 30.0444,
      longitude: 31.2357,
      status: 'using_fallback',
      message: 'لم تتوفر إحداثيات حية من المتصفح، تم توجيه العميل للإحداثيات الافتراضية لوسط الدلتا.'
    }
  },
})