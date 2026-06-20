import prisma from "@/lib/prisma"

/* ------------------ getAllFactoriesForServerFactoriesPage ----------------- */
export const getAllFactoriesForServerFactoriesPage = async () => {
  try {
    return await prisma.factory.findMany({
      include: { owner: { select: { name: true, email: true, image: true } } },
      orderBy: { name: "asc" },
    })
  } catch (error) {
    console.error(error)

  }
}

/* --------------------- getOneFactoryForEditFactoryPage -------------------- */
export const getOneFactoryForEditFactoryPage = async (id: string) => {
  try {
    return await prisma.factory.findUnique({ where: { id }, include: { owner: { select: { id: true, name: true, email: true, image: true } } } })
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------------- getAllFactories ---------------------------- */
export const getAllFactories = async (size: number, page: number) => {
  const totalStudents = await prisma.factory.count()
  const totalPages = Math.ceil(totalStudents / size)

  try {
    const data = await prisma.factory.findMany({
      include: { owner: { select: { name: true, email: true, image: true } } },
      orderBy: { name: "asc" },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)

  }
}

/* ---------------------- getAllFactoriesForProductPage --------------------- */
export const getAllFactoriesForProductPage = async () => {
  try {
    return await prisma.factory.findMany({ select: { id: true, name: true, logo: true } })
  } catch (error) {
    console.error(error)
  }
}