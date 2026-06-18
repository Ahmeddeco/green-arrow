import { getAllComponentsForComponentsServerPage } from "@/dl/components.data"

export type getAllComponentsForUsersServerPageType = Awaited<ReturnType<typeof getAllComponentsForComponentsServerPage>>
