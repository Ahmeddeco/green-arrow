import { ChartNoAxesCombined, Factory, Package2, Server, Users } from "lucide-react"

export const serverNav = [
  {
    title: "سيرفر",
    href: "/server",
    icon: Server
  },
  {
    title: "الأشخاص",
    href: "/server/users",
    icon: Users
  },
  {
    title: "المصانع",
    href: "/server/factories",
    icon: Factory
  },
  {
    title: "المنتجات",
    href: "/server/products",
    icon: Package2
  },
  {
    title: "الإحصائيات",
    href: "/server/charts",
    icon: ChartNoAxesCombined
  },
]