import { Home } from "lucide-react"
import { FaBacterium, FaWorm } from "react-icons/fa6"
import { GiFertilizerBag, GiHangingSpider, GiHighGrass, GiPlantSeed, GiTreeGrowth } from "react-icons/gi"
import { BsBugFill } from "react-icons/bs"
import { FaTools } from "react-icons/fa"

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
    category: "grass"
  },
  {
    title: "مبيدات حشرية",
    icon: BsBugFill,
    category: "insect"
  },
  {
    title: "مبيدات فطرية",
    icon: FaBacterium,
    category: "fungi"
  },
  {
    title: "مبيدات أكاروس",
    icon: GiHangingSpider,
    category: "mites"
  },
  {
    title: "مبيدات نيماتودا",
    icon: FaWorm,
    category: "nematodes"
  },
  {
    title: "منظمات نمو",
    icon: GiTreeGrowth,
    category: "growth"
  },
  {
    title: "أسمدة",
    icon: GiFertilizerBag,
    category: "fertilizers"
  },
  {
    title: "بذور",
    icon: GiPlantSeed,
    category: "seeds"
  },
  {
    title: "أدوات",
    icon: FaTools,
    category: "tools"
  },
]