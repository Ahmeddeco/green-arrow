'use server'

import { parseWithZod } from "@conform-to/zod"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import FactorySchema from "@/schemas/FactorySchema"

/* ------------------------------ addUserAction ----------------------------- */
export const addFactoryAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: FactorySchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.factory.upsert({
      where: { tel: submission.value.tel },
      create: {
        name: submission.value.name,
        email: submission.value.email,
        logo: submission.value.logo,
        tel: submission.value.tel,
        address: submission.value.address,
        website: submission.value.website,
        owner: { connect: { id: submission.value.userId } },
      },
      update: {
        name: submission.value.name,
        email: submission.value.email,
        logo: submission.value.logo,
        address: submission.value.address,
        website: submission.value.website,
        owner: { connect: { id: submission.value.userId } },
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/factories")
}


/* ---------------------------- editFactoryAction --------------------------- */
export const editFactoryAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: FactorySchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.factory.update({
      where: { tel: submission.value.tel },
      data: {
        name: submission.value.name,
        email: submission.value.email,
        logo: submission.value.logo,
        tel: submission.value.tel,
        address: submission.value.address,
        website: submission.value.website,
        owner: { connect: { id: submission.value.userId } },
      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/factories")
}

export const deleteFactoryAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.factory.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/factories")
}