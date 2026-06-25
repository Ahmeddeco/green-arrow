import { FaBacterium, FaWorm } from "react-icons/fa6"
import { GiFertilizerBag, GiHangingSpider, GiHighGrass, GiPlantSeed, GiTreeGrowth } from "react-icons/gi"
import { BsBugFill } from "react-icons/bs"
import { FaTools } from "react-icons/fa"
import CategorySchema from "@/generated/zod/inputTypeSchemas/CategorySchema"

/* -------------------------------- heroData -------------------------------- */

export const heroData = {
  title: "منظومة زراعية ذكية: تشخيص فوري وعلاجات مضمونة لمحصولك",
  subTitle: "اجمع بين قوة العلم وجودة المنتج. شخّص آفتك الزراعية فوراً مع مستشارنا الذكي، واطلب أفضل الأسمدة والمبيدات المعتمدة بضغطة زر.",
}


/* ----------------------------- ourServicesData ---------------------------- */
export const ourServicesData = {
  title: "عن خدماتنا",
  mainHeading: "كيف تضمن أعلى إنتاجية لمحاصيلك عبر حلول وقاية وتغذية مدعومة بالذكاء الاصطناعي؟",
  description: "نحن لا نبيع مجرد أسمدة ومبيدات؛ بل نقدم منظومة متكاملة لـتأمين استثماراتك الزراعية في مصر. ندمج بين أجود المركبات الكيميائية والحيوية المعتمدة، وبين الاستشارات الزراعية الرقمية الفورية عبر مساعد الذكاء الاصطناعي الخاص بنا، لتمكينك من تشخيص الآفات، وحساب المقررات السمادية بدقة متناهية تضمن تقليل الهدر وزيادة ربحية الفدان.",
  badges: [
    "تغذية نباتية دقيقة",
    "مكافحة الآفات المستعصية",
    "استشارات AI فورية",
    "تحليل خصوبة التربة",
    "مركبات مسجلة ومضمونة",
    "إدارة تكاليف الإنتاج",
  ],
  Stats: [
    {
      number: "%94",
      feature: "ثقة العملاء"
    },
    {
      number: "450k+",
      feature: "فدان تحت الإشراف"
    },
    {
      number: "%35",
      feature: "توفير"
    },
    {
      number: "+150",
      feature: "مستثمر زراعي"
    },
  ]
}

/* ------------------------------ ourCategories ----------------------------- */
export const ourCategories = [
  {
    title: "مبيدات حشائش",
    icon: GiHighGrass,
    category: CategorySchema.Enum.herbicides
  },
  {
    title: "مبيدات حشرية",
    icon: BsBugFill,
    category: CategorySchema.Enum.insecticides
  },
  {
    title: "مبيدات فطرية",
    icon: FaBacterium,
    category: CategorySchema.Enum.fungicides
  },
  {
    title: "مبيدات أكاروس",
    icon: GiHangingSpider,
    category: CategorySchema.Enum.acaricides
  },
  {
    title: "مبيدات نيماتودا",
    icon: FaWorm,
    category: CategorySchema.Enum.nematicides
  },
  {
    title: "منظمات نمو",
    icon: GiTreeGrowth,
    category: CategorySchema.Enum.growth_regulators
  },
  {
    title: "أسمدة",
    icon: GiFertilizerBag,
    category: CategorySchema.Enum.fertilizers
  },
  {
    title: "بذور",
    icon: GiPlantSeed,
    category: CategorySchema.Enum.fertilizers
  },
  {
    title: "أدوات",
    icon: FaTools,
    category: CategorySchema.Enum.tools
  },
]