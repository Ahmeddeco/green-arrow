/* ----------------------------- splittedImages ----------------------------- */
export const splittedImages = (images: unknown): string[] => {
  if (!images || typeof images !== "string") return []

  return images
    .split(",")
    .map((image) => image.trim())
    .filter(Boolean) // يضمن عدم إرجاع نصوص فارغة للمصفوفة
}

/* ------------------------------- splitItems ------------------------------- */
export const splitItems = (items?: string) => {
  if (!items) return []
  return items.split(",").map((item) => item.trim()).filter(Boolean)
}