import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

interface GeocodingResponse {
  results: {
    latitude: number
    longitude: number
    name: string
  }[]
}

interface WeatherResponse {
  current: {
    time: string
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    wind_gusts_10m: number
    weather_code: number
  }
}

// خريطة ترجمة المدن المصرية الشائعة
const egyptianCitiesMap: Record<string, string> = {
  'القاهرة': 'Cairo',
  'الإسكندرية': 'Alexandria',
  'الجيزة': 'Giza',
  'الأقصر': 'Luxor',
  'أسوان': 'Aswan',
  'بورسعيد': 'Port Said',
  'السويس': 'Suez',
  'المنصورة': 'Mansoura',
  'طنطا': 'Tanta',
  'الزقازيق': 'Zagazig',
  'أسيوط': 'Asyut',
  'الفيوم': 'Faiyum',
  'مدينة بدر': 'Badr City',
  'مركز بدر': 'Badr City',
  'شرم الشيخ': 'Sharm El Sheikh',
  'الغردقة': 'Hurghada',
  'دمياط': 'Damietta',
  'المنيا': 'Minya',
  'سوهاج': 'Sohag',
  'قنا': 'Qena',
}

// ترجمة الموقع من العربية إلى الإنجليزية
function translateLocation(location: string): string {
  // البحث في الخريطة أولاً
  for (const [arabic, english] of Object.entries(egyptianCitiesMap)) {
    if (location.includes(arabic)) {
      return english
    }
  }
  // إذا لم يوجد في الخريطة، أعد الاسم كما هو
  return location
}

// ترجمة حالة الطقس إلى العربية
function getWeatherConditionArabic(code: number): string {
  const conditions: Record<number, string> = {
    0: 'سماء صافية',
    1: 'صافٍ في معظمه',
    2: 'غائم جزئياً',
    3: 'غائم',
    45: 'ضبابي',
    48: 'ضباب متجمد',
    51: 'رذاذ خفيف',
    53: 'رذاذ متوسط',
    55: 'رذاذ كثيف',
    61: 'مطر خفيف',
    63: 'مطر متوسط',
    65: 'مطر غزير',
    71: 'ثلج خفيف',
    73: 'ثلج متوسط',
    75: 'ثلج كثيف',
    80: 'زخات مطر خفيفة',
    81: 'زخات مطر متوسطة',
    82: 'زخات مطر عنيفة',
    95: 'عاصفة رعدية',
    96: 'عاصفة رعدية مع برد خفيف',
    99: 'عاصفة رعدية مع برد كثيف',
  }
  return conditions[code] || 'غير معروف'
}

export const weatherTool = createTool({
  id: 'get-weather',
  description: 'جلب بيانات الطقس الحالية لأي مدينة مصرية',
  inputSchema: z.object({
    location: z.string().describe('اسم المدينة بالعربية أو الإنجليزية'),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    feelsLike: z.number(),
    humidity: z.number(),
    windSpeed: z.number(),
    windGust: z.number(),
    conditions: z.string(),
    location: z.string(),
  }),
  execute: async inputData => {
    const translatedLocation = translateLocation(inputData.location)
    return await getWeather(translatedLocation, inputData.location)
  },
})

const getWeather = async (location: string, originalName: string) => {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
  const geocodingResponse = await fetch(geocodingUrl)
  const geocodingData = (await geocodingResponse.json()) as GeocodingResponse

  if (!geocodingData.results?.[0]) {
    throw new Error(`لم يتم العثور على الموقع: '${originalName}'`)
  }

  const { latitude, longitude, } = geocodingData.results[0]

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,weather_code`

  const response = await fetch(weatherUrl)
  const data = (await response.json()) as WeatherResponse

  return {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windGust: data.current.wind_gusts_10m,
    conditions: getWeatherConditionArabic(data.current.weather_code),
    location: originalName, // إرجاع الاسم العربي الأصلي
  }
}