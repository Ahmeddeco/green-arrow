import { Category } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

/* ------------------ getAllProductsForServerProductsPage ----------------- */
export const getAllProductsForServerProductsPage = async (size: number, page: number) => {
  const totalProducts = await prisma.product.count()
  const totalPages = Math.ceil(totalProducts / size)

  try {
    const data = await prisma.product.findMany({
      select: { id: true, mainImage: true, title: true, createdAt: true, category: true, factory: { select: { name: true } }, activeComponents: { select: { component: { select: { title: true } } } } },
      orderBy: { createdAt: "desc" },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)

  }
}

/* --------------------- getOneProductForEditProductPage -------------------- */
export const getOneProductForEditProductPage = async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: { factory: true, activeComponents: true },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ----------------- getAllProductWithCategoryForProductCard ---------------- */
export const getAllProductWithCategoryForProductCard = async (size: number, page: number, category?: Category) => {
  const totalProducts = await prisma.product.count({ where: { category } })
  const totalPages = Math.ceil(totalProducts / size)

  try {
    const data = await prisma.product.findMany({
      where: { category: category },
      select: { id: true, mainImage: true, title: true, createdAt: true, category: true, discountPercentage: true, unit: true, price: true, description: true, factory: { select: { name: true } }, activeComponents: { select: { component: { select: { title: true } } } } },
      orderBy: { createdAt: "desc" },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages, totalProducts }
  } catch (error) {
    console.error(error)
  }
}

/* ------------------- getOneProductForProductDetailsPage ------------------- */
export const getOneProductForProductDetailsPage = async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        factory: { select: { id: true, name: true } },
        activeComponents: { include: { component: { select: { title: true, } } } }
      },
    })
  } catch (error) {
    console.error(error)
  }
}