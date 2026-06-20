import { getAllFactories, getAllFactoriesForProductPage, getAllFactoriesForServerFactoriesPage, getOneFactoryForEditFactoryPage } from "@/dl/factories.data"

export type getAllFactoriesForServerFactoriesPageType = Awaited<ReturnType<typeof getAllFactoriesForServerFactoriesPage>>
export type getOneFactoryForEditFactoryPageType = Awaited<ReturnType<typeof getOneFactoryForEditFactoryPage>>
export type getAllFactoriesType = Awaited<ReturnType<typeof getAllFactories>>
export type getAllFactoriesForProductPageType = Awaited<ReturnType<typeof getAllFactoriesForProductPage>>