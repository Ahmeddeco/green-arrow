import { Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

export const getAllClientsForClientsServerPage = async (size: number, page: number, role?: Role) => {
  try {
    const totalStudents = await prisma.client.count()
    const totalPages = Math.ceil(totalStudents / size)

    const data = await prisma.client.findMany({
      where: { role: role },
      select: {
        id: true,
        mainMobile: true,
        country: true,
        state: true,
        city: true,
        role: true,
        user: { select: { id: true, name: true, email: true, image: true } }
      },
      orderBy: { user: { name: "asc" } },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

export const getOneClient = async (id: string) => {
  try {
    return await prisma.client.findUnique({ where: { id } })
  } catch (error) {
    console.error(error)
  }
}