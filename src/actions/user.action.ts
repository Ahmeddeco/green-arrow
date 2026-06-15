'use server'

import { parseWithZod } from "@conform-to/zod"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import UserSchema from "@/schemas/UserSchema"

/* ------------------------------ addUserAction ----------------------------- */
export const addUserAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.user.upsert({
      where: { email: submission.value.email },
      create: {
        role: submission.value.role,
        name: submission.value.name,
        email: submission.value.email,
        image: submission.value.image,
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
        name: submission.value.name,
        image: submission.value.image,
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
  redirect("/server/users")
}


/* ---------------------------- editUserAction ---------------------------- */
export const editUserAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.user.update({
      where: { email: submission.value.email },
      data: {
        role: submission.value.role,
        name: submission.value.name,
        image: submission.value.image,
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
  redirect("/server/users")
}


/* --------------------------- deleteUserAction --------------------------- */
export const deleteUserAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.user.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/users")
}