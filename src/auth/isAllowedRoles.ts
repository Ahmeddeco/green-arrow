import { redirect } from "next/navigation"
import { getSession } from "./getSession"
import { Role } from "@/generated/prisma/enums"

export const isAllowedRoles = async (isAllowedRoles: Role[]) => {
  const supperAdmin = process.env.SUPPER_ADMIN
  const session = await getSession()

  if (session?.user.email === supperAdmin) {
    return
  }
  const userRole = session?.user.role as Role | undefined
  if (!session || !isAllowedRoles.includes(userRole as Role)) {
    redirect("/")
  }
  return
}