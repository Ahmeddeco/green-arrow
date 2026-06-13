'use server'

import { parseWithZod } from "@conform-to/zod"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import ClientSchema from "@/schemas/ClientSchema"

/* ------------------------------ addUserAction ----------------------------- */
export const addClientAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ClientSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.client.upsert({
      where: { userId: submission.value.userId },
      create: {
        user: { connect: { id: submission.value.userId } },
        role: submission.value.role,
        mainMobile: submission.value.mainMobile,
        secondaryMobile: submission.value.secondaryMobile,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        addressDescription: submission.value.addressDescription,
        lng: submission.value.lng,
        lat: submission.value.lat
      },
      update: {
        role: submission.value.role,
        mainMobile: submission.value.mainMobile,
        secondaryMobile: submission.value.secondaryMobile,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        addressDescription: submission.value.addressDescription,
        lng: submission.value.lng,
        lat: submission.value.lat
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/clients")
}


/* ---------------------------- editClientAction ---------------------------- */
export const editClientAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ClientSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.client.update({
      where: { userId: submission.value.userId },
      data: {
        role: submission.value.role,
        mainMobile: submission.value.mainMobile,
        secondaryMobile: submission.value.secondaryMobile,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        addressDescription: submission.value.addressDescription,
        lng: submission.value.lng,
        lat: submission.value.lat
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/clients")
}


/* --------------------------- deleteClientAction --------------------------- */
export const deleteClientAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.client.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/clients")
}