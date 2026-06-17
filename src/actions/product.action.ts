'use server'

import { parseWithZod } from "@conform-to/zod"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import FactorySchema from "@/schemas/FactorySchema"
import ProductSchema from "@/schemas/ProductSchema"

/* ------------------------------ addProductAction ----------------------------- */
export const addProductAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProductSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.product.upsert({
      where: { id: submission.value.id! },
      create: {
        title: submission.value.title,

        factory: { connect: { id: submission.value.factoryId } },
      },
      update: {

      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/products")
}


/* ---------------------------- editProductAction --------------------------- */
export const editProductAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: FactorySchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.product.update({
      where: { id: submission.value.id! },
      data: {

      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/products")
}

/* --------------------------- deleteProductAction -------------------------- */
export const deleteProductAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.product.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/products")
}