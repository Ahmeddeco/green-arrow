'use server'

import { parseWithZod } from "@conform-to/zod"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import ComponentSchema from "@/schemas/ComponentSchema"
import { Prisma } from "@/generated/prisma/client"

/* ------------------------------ addProductAction ----------------------------- */
export const addComponentAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ComponentSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.component.create({
      data: {
        title: submission.value.title,
      }
    })
  } catch (error) {
    // التحقق مما إذا كان الخطأ بسبب تكرار قيمة فريدة (Unique Constraint)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return submission.reply({
          fieldErrors: {
            title: ['هذه المادة الفعالة مضافة بالفعل في النظام.'],
          },
        })
      }
    }

    console.error(error)
    return submission.reply({
      formErrors: ['حدث خطأ غير متوقع أثناء حفظ البيانات.'],
    })
  }
  redirect("/server/components")
}

/* ------------------------------ editComponentAction ----------------------------- */
export const editComponentAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ComponentSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.component.update({
      where: { id: submission.value.id! },
      data: {
        title: submission.value.title,
      }
    })
  } catch (error) {
    // التحقق مما إذا كان الخطأ بسبب تكرار قيمة فريدة (Unique Constraint)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return submission.reply({
          fieldErrors: {
            title: ['هذه المادة الفعالة مضافة بالفعل في النظام.'],
          },
        })
      }
    }

    console.error(error)
    return submission.reply({
      formErrors: ['حدث خطأ غير متوقع أثناء حفظ البيانات.'],
    })
  }
  redirect("/server/components")
}

/* -------------------------- deleteComponentAction ------------------------- */
export const deleteComponentAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.component.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/components")
}