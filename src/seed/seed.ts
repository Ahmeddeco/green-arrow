/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, OrderStatus, Role, Unit } from "@/generated/prisma/enums"
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
  console.log('⏳ بدء عملية تغذية قاعدة البيانات (Seeding)...')

  // تنظيف البيانات القديمة بترتيب عكسي لتجنب مشاكل الـ Foreign Keys
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productComponent.deleteMany()
  await prisma.product.deleteMany()
  await prisma.component.deleteMany()
  await prisma.factory.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ تم تنظيف قاعدة البيانات بنجاح.')

  // 2. إنشاء المستخدمين بأدوار مختلفة (Admin, Provider, Seller, Client)
  const usersData = [
    {
      name: 'أحمد محمد عبد الفتاح',
      email: 'ahmed.admin@example.com',
      emailVerified: true,
      role: Role.admin,
      mainMobile: '01012345678',
      city: 'البر الشرقي',
      state: 'المنوفية',
      country: 'مصر',
      lat: 30.5612,
      lng: 31.0123,
      addressDescription: 'بجوار مستشفى المواساة',
    },
    {
      name: faker.person.fullName(),
      email: 'provider@factory.com',
      emailVerified: true,
      role: Role.provider,
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
      email: 'seller@store.com',
      emailVerified: true,
      role: Role.seller,
      mainMobile: faker.phone.number({ style: 'international' }),
      city: 'شبين الكوم',
      state: 'المنوفية',
      country: 'مصر',
      lat: 30.5521,
      lng: 31.0094,
      addressDescription: 'شارع الجلاء الرئيسي',
    },
    {
      name: faker.person.fullName(),
      email: 'client@farm.com',
      emailVerified: true,
      role: Role.client,
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
  const clientUser = createdUsers.find(u => u.role === Role.client)!

  // 3. إنشاء الشركات / المصانع (Factory) المرتبطة بالمزود (Provider)
  const factories = [
    { name: 'سينجنتا مصر', tel: '0221234567', email: 'info@syngenta.com', website: 'https://syngenta.com' },
    { name: 'باير للعلوم الزراعية', tel: '0229876543', email: 'info@bayer.com', website: 'https://bayer.com' },
    { name: 'كفر الزيات للمبيدات', tel: '0404567891', email: 'kz@kz-pesticides.com', website: 'https://kz-pesticides.com' }
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

  // 4. إنشاء المواد الفعالة (Components) مع الـ Units الجديدة المتنوعة
  const componentsData = [
    { title: 'Abamectin', unit: Unit.g_liter },
    { title: 'Imidacloprid', unit: Unit.g_liter },
    { title: 'Glyphosate', unit: Unit.g_kg },
    { title: 'Nitrogen (N)', unit: Unit.percentage },
    { title: 'Phosphorus (P2O5)', unit: Unit.percentage },
    { title: 'Potassium (K2O)', unit: Unit.percentage },
    { title: 'Iron (Fe)', unit: Unit.ppm },
    { title: 'Zinc (Zn)', unit: Unit.ppm },
  ]

  const createdComponents: any[] = []
  for (const c of componentsData) {
    const component = await prisma.component.create({ data: c })
    createdComponents.push(component)
  }

  // 5. إنشاء المنتجات (Products) وربطها بالمواد الفعالة عبر الجدول الوسيط `ProductComponent`
  const productsTemplates = [
    {
      title: 'أبامكتين 1.8%',
      category: Category.acaricides,
      comps: [{ title: 'Abamectin', concentration: 18 }]
    },
    {
      title: 'كونفيدور حشري',
      category: Category.insecticides,
      comps: [{ title: 'Imidacloprid', concentration: 350 }]
    },
    {
      title: 'سماد NPK متوازن 20-20-20',
      category: Category.fertilizers,
      comps: [
        { title: 'Nitrogen (N)', concentration: 20 },
        { title: 'Phosphorus (P2O5)', concentration: 20 },
        { title: 'Potassium (K2O)', concentration: 20 }
      ]
    },
    {
      title: 'شالنجر فائق التميز',
      category: Category.insecticides,
      comps: [{ title: 'Abamectin', concentration: 36 }]
    },
    {
      title: 'عناصر صغرى مخلبية',
      category: Category.fertilizers,
      comps: [
        { title: 'Iron (Fe)', concentration: 1500 },
        { title: 'Zinc (Zn)', concentration: 800 }
      ]
    }
  ]

  const createdProducts = []
  for (const p of productsTemplates) {
    const randomFactory = faker.helpers.arrayElement(createdFactories)

    // بناء أجزاء الـ ProductComponent التابعة لهذا المنتج
    const componentConnections = p.comps.map(c => {
      const dbComp = createdComponents.find(dc => dc.title === c.title)!
      return {
        componentId: dbComp.id,
        concentration: c.concentration
      }
    })

    const product = await prisma.product.create({
      data: {
        title: p.title,
        category: p.category,
        description: faker.lorem.paragraph(),
        productUrl: faker.internet.url(),
        stock: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }), // دعم الكيلوات السائبة واللترات
        price: faker.number.float({ min: 150, max: 2500, fractionDigits: 2 }),
        discountPercentage: faker.helpers.arrayElement([0, 5, 10, 15]),
        mainImage: faker.image.url(),
        images: [faker.image.url(), faker.image.url()],
        recommendations: faker.lorem.sentence(),
        features: faker.lorem.sentence(),
        phi: 'الطماطم: 7 أيام',
        factoryId: randomFactory.id,
        activeComponents: {
          create: componentConnections
        }
      }
    })
    createdProducts.push(product)
  }

  // 6. إنشاء عينة من طلبات الشراء (Orders & OrderItems) للعميل التجاري
  const order = await prisma.order.create({
    data: {
      userId: clientUser.id,
      totalAmount: 0, // سيتم حسابها وتحديثها بناءً على الـ Items
      status: OrderStatus.processing,
      address: clientUser.addressDescription || 'العنوان الافتراضي للمزرعة',
    }
  })

  let calculatedTotal = 0
  const selectedProducts = faker.helpers.arrayElements(createdProducts, 2)

  for (const prod of selectedProducts) {
    const qty = faker.number.int({ min: 1, max: 5 })
    const itemPrice = prod.price * (1 - prod.discountPercentage / 100)
    calculatedTotal += itemPrice * qty

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: prod.id,
        quantity: qty,
        price: itemPrice // تثبيت السعر وقت الشراء بحسب شروط السكيما لحماية الفاتورة
      }
    })
  }

  // تحديث إجمالي الطلب بالقيمة الحقيقية المحسوبة
  await prisma.order.update({
    where: { id: order.id },
    data: { totalAmount: parseFloat(calculatedTotal.toFixed(2)) }
  })

  console.log('🚀 تمت عملية الـ Seeding بالكامل بنجاح وملئت الجداول بالبيانات المتوافقة!')
}

main()
  .catch((e) => {
    console.error('❌ حدث خطأ أثناء عملية الـ Seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })