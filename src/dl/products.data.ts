import prisma from "@/lib/prisma"

/* ------------------ getAllProductsForServerProductsPage ----------------- */
export const getAllProductsForServerProductsPage = async (size: number, page: number) => {
  const totalProducts = await prisma.product.count()
  const totalPages = Math.ceil(totalProducts / size)

  try {
    const data = await prisma.product.findMany({
      select: { id: true, mainImage: true, title: true, category: true, factory: { select: { name: true } }, activeComponents: { select: { component: { select: { title: true } } } } },
      orderBy: { title: "asc" },
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


