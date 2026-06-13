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
  console.log('formData from addClientAction', formData)
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
