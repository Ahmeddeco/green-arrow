import { getAllComponents, getAllComponentsForComponentsServerPage } from "@/dl/components.data"

export type getAllComponentsForUsersServerPageType = Awaited<ReturnType<typeof getAllComponentsForComponentsServerPage>>
export type getAllComponentsType = Awaited<ReturnType<typeof getAllComponents>>
