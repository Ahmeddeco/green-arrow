/* ----------------------------- splittedImages ----------------------------- */
export const splittedImages = (images: string) => {
  const imagesArray = images.split(",").map((image) => image.trim())
  return imagesArray
}

/* ------------------------------- splitItems ------------------------------- */
export const splitItems = (items?: string) => {
  return items?.split(",").map((item) => item.trim())
}