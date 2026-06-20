'use server'

import { parseWithZod } from "@conform-to/zod"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProductSchema from "@/schemas/ProductSchema"
import { splittedImages } from "@/logic/splitThings"

/* ------------------------------ addProductAction ----------------------------- */
export const addProductAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProductSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const data = submission.value
  const separatedImages = splittedImages(data.images[0])
  try {
    await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        recommendations: data.recommendations,
        features: data.features,
        phi: data.phi,
        category: data.category,
        productUrl: data.productUrl,
        price: Number(data.price),
        stock: Number(data.stock),
        discountPercentage: Number(data.discountPercentage),
        mainImage: data.mainImage,
        images: separatedImages,
        factory: {
          connect: { id: data.factoryId }
        },
        // إنشاء السجلات في الجدول الوسيط للمواد الفعالة
        activeComponents: {
          create: data.activeComponents.map((comp) => ({
            concentration: comp.concentration ? Number(comp.concentration) : null,
            unit: comp.unit,
            // نربط السجل بالمادة الفعالة الموجودة مسبقاً في قاعدة البيانات عبر معرفها
            component: {
              connect: {
                id: comp.componentId,
              },
            },
          })),
        },
      },
    })
  } catch (error) {
    console.error("Failed to create product: ", error)
    return submission.reply({
      formErrors: ["حدث خطأ أثناء حفظ المنتج ومكوناته الفعالة في قاعدة البيانات."],
    })
  }

  redirect("/server/products")
}

/* ---------------------------- editProductAction --------------------------- */
export const editProductAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProductSchema,
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