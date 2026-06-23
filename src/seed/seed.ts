/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentUnit, Role, } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { fakerAR as faker } from '@faker-js/faker'
import { z } from 'zod'

// 1. تعريف مخططات Zod لتوليد بيانات متوافقة وموثوقة أثناء الـ Seeding
const userSeedSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  role: z.nativeEnum(Role),
  mainMobile: z.string(),
  secondaryMobile: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  addressDescription: z.string(),
})

async function main() {
  const usersData = [
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: true,
      role: Role.admin,
      mainMobile: '01503150014',
      city: 'البر الشرقي',
      state: 'المنوفية',
      country: 'مصر',
      lat: 30.5612,
      lng: 31.0123,
      addressDescription: "",
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: true,
      role: Role.client,
      mainMobile: faker.phone.number({ style: 'international' }),
      city: 'طنطا',
      state: 'الغربية',
      country: 'مصر',
      lat: 30.7865,
      lng: 30.9998,
      addressDescription: 'المنطقة الصناعية',
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: true,
      role: Role.seller,
      mainMobile: faker.phone.number({ style: 'international' }),
      city: 'Mataria',
      state: 'Cairo',
      country: 'مصر',
      lat: 30.5521,
      lng: 31.0094,
      addressDescription: "",
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: true,
      role: Role.provider,
      mainMobile: faker.phone.number({ style: 'international' }),
      city: 'السادات',
      state: 'المنوفية',
      country: 'مصر',
      lat: 30.3794,
      lng: 30.5234,
      addressDescription: 'طريق مصر إسكندرية الصحراوي - مزرعة رقم 4',
    },
  ]

  const createdUsers = []
  for (const u of usersData) {
    const validatedUser = userSeedSchema.parse(u)
    const user = await prisma.user.create({ data: validatedUser })
    createdUsers.push(user)
  }

  const providerUser = createdUsers.find(u => u.role === Role.provider)!

  // 3. إنشاء الشركات / المصانع (Factory) المرتبطة بالمزود (Provider)
  const factories = [
    { name: 'سينجنتا مصر', tel: faker.phone.number({ style: 'international' }), email: 'info@syngenta.com', website: 'https://www.syngentame.com/ar-eg' },
    { name: 'باير للعلوم الزراعية', tel: faker.phone.number({ style: 'international' }), email: 'info@bayer.com', website: 'https://www.bayer.com/ar/ae/middle-east-ar-home' },
    { name: 'كفر الزيات للمبيدات', tel: faker.phone.number({ style: 'international' }), email: 'kz@kz-pesticides.com', website: 'https://www.kz.com.eg/ar/' }
  ]

  const createdFactories = []
  for (const f of factories) {
    const factory = await prisma.factory.create({
      data: {
        ...f,
        address: faker.location.streetAddress(),
        logo: faker.image.url(),
        userId: providerUser.id
      }
    })
    createdFactories.push(factory)
  }

  // 4. إنشاء المواد الفعالة (Components) مع الـ Units المتنوعة
  const componentsData = [
    { title: 'Abamectin', unit: ComponentUnit.g_liter },
    { title: 'Imidacloprid', unit: ComponentUnit.g_liter },
    { title: 'Glyphosate', unit: ComponentUnit.g_kg },
    { title: 'Nitrogen (N)', unit: ComponentUnit.percentage },
    { title: 'Phosphorus (P2O5)', unit: ComponentUnit.percentage },
    { title: 'Potassium (K2O)', unit: ComponentUnit.percentage },
    { title: 'Iron (Fe)', unit: ComponentUnit.ppm },
    { title: 'Zinc (Zn)', unit: ComponentUnit.ppm },
  ]

  const createdComponents: any[] = []
  for (const c of componentsData) {
    const component = await prisma.component.create({ data: c })
    createdComponents.push(component)
  }

  console.log('🚀 Seeding Completed Successfully !')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })