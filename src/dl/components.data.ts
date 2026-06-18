import prisma from "@/lib/prisma"

export const getAllComponentsForComponentsServerPage = async (size: number, page: number) => {
  try {
    const totalStudents = await prisma.component.count()
    const totalPages = Math.ceil(totalStudents / size)
    const data = await prisma.component.findMany({
      orderBy: { title: "asc" },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------------- getOneComponent ---------------------------- */
export const getOneComponent = async (id: string) => {
  try {
    return await prisma.component.findUnique({ where: { id } })
  } catch (error) {
    console.error(error)
  }
}