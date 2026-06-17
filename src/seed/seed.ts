import { Category, OrderStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { fakerAR as faker } from '@faker-js/faker' // استخدام النسخة العربية لبيانات واقعية محلياً


// قوائم مخصصة للمجال الزراعي لضمان واقعية البيانات بدلاً من النصوص العشوائية تماماً
const EGYPTIAN_CITIES = ['شبين الكوم', 'طنطا', 'المنصورة', 'الإسكندرية', 'القاهرة', 'دمنهور', 'الزقازيق']
const AGRICULTURAL_COMPONENTS = [
  'Abamectin', 'Imidacloprid', 'Glyphosate', 'Copper Oxychloride',
  'Mancozeb', 'Chlorpyrifos', 'Deltamethrin', 'Cypermethrin',
  'Gibberellic Acid', 'Nitrogen NPK', 'Humic Acid', 'Emamectin Benzoate'
]
const CONCENTRATION_FORMATS = ['1.8% EC', '25% WP', '48% EC', '70% WG', '10% SL']

async function main() {
  console.log('🌱 بدء عملية تصفية البيانات القديمة (Clean up)...')

  // ترتيب الحذف لتجنب مشاكل Foreign Key Constraints
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productComponent.deleteMany()
  await prisma.product.deleteMany()
  await prisma.factory.deleteMany()
  await prisma.component.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  console.log('🔄 جاري توليد البيانات الجديدة...')

  // ----------------------------------------------------------------
  // 1. إنشاء المستخدمين (Users) الأدوار المختلفة
  // ----------------------------------------------------------------
  const roles: Role[] = ['user', 'admin', 'seller', 'client', 'provider']
  const users = []

  // إنشاء مستخدم افتراضي ثابت للتطوير والـ Testing
  const testUser = await prisma.user.create({
    data: {
      name: 'أحمد محمد',
      email: 'admin@greenarrow.com',
      emailVerified: true,
      role: 'admin',
      mainMobile: '01012345678',
      city: 'شبين الكوم',
      state: 'المنوفية',
      country: 'مصر',
    }
  })
  users.push(testUser)

  // توليد 15 مستخدم عشوائي
  for (let i = 0; i < 15; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        emailVerified: faker.datatype.boolean(),
        image: faker.image.avatar(),
        role: faker.helpers.arrayElement(roles),
        banned: faker.datatype.boolean({ probability: 0.1 }), // 10% احتمال الحظر
        banReason: faker.datatype.boolean({ probability: 0.1 }) ? 'مخالفة شروط الاستخدام' : null,
        mainMobile: faker.phone.number({ style: 'international' }),
        secondaryMobile: faker.phone.number({ style: 'international' }),
        city: faker.helpers.arrayElement(EGYPTIAN_CITIES),
        state: 'الوجه البحري',
        country: 'مصر',
        lat: faker.location.latitude({ max: 31.5, min: 29.5 }), // إحداثيات تقريبية لمصر
        lng: faker.location.longitude({ max: 32.5, min: 30.5 }),
        addressDescription: faker.location.streetAddress({ useFullAddress: true }),
      }
    })
    users.push(user)

  }

  // ----------------------------------------------------------------
  // 2. إنشاء الشركات والمصانع (Factories)
  // ----------------------------------------------------------------
  const providersAndSellers = users.filter(u => u.role === 'provider' || u.role === 'seller' || u.role === 'admin')
  const factories = []

  const factoryNames = ['سينجنتا زراعية', 'باير مصر', 'كفر الزيات للمبيدات', 'الشوربجي للأسمدة', 'النصر للكيماويات']

  for (const name of factoryNames) {
    const factoryOwner = faker.helpers.arrayElement(providersAndSellers)
    const factory = await prisma.factory.create({
      data: {
        name: name,
        address: faker.location.streetAddress(),
        tel: faker.phone.number({ style: 'international' }),
        email: faker.internet.email().toLowerCase(),
        website: faker.internet.url(),
        logo: faker.image.url(),
        userId: factoryOwner.id,
      }
    })
    factories.push(factory)
  }

  // ----------------------------------------------------------------
  // 3. إنشاء المواد الفعالة (Components)
  // ----------------------------------------------------------------
  const components = []
  for (const title of AGRICULTURAL_COMPONENTS) {
    const component = await prisma.component.create({
      data: { title: title }
    })
    components.push(component)
  }

  // ----------------------------------------------------------------
  // 4. إنشاء المنتجات والمبيدات (Products) وربط موادها الفعالة
  // ----------------------------------------------------------------
  const categories: Category[] = [
    'herbicides', 'insecticides', 'fungicides',
    'acaricides', 'nematicides', 'growth_regulators',
    'fertilizers', 'seeds', 'tools'
  ]
  const products = []

  for (let i = 0; i < 30; i++) {
    const associatedFactory = faker.helpers.arrayElement(factories)
    const product = await prisma.product.create({
      data: {
        title: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
        description: `مبيد زراعي عالي الجودة يقضي على الآفات المستهدفة بفعالية، معدل الاستخدام الموصى به: ${faker.number.int({ min: 50, max: 200 })} سم٣ / ١٠٠ لتر ماء.`,
        productUrl: faker.internet.url(),
        stock: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }), // دعم السوائل والسائب بالكسور
        price: faker.number.float({ min: 150, max: 2500, fractionDigits: 2 }),
        discountPercentage: faker.datatype.boolean({ probability: 0.3 }) ? faker.number.int({ min: 5, max: 25 }) : 0,
        mainImage: faker.image.url(),
        images: [faker.image.url(), faker.image.url()],
        category: faker.helpers.arrayElement(categories),
        factoryId: associatedFactory.id,
      }
    })
    products.push(product)

    // ربط مادة فعالة أو أكثر بالمنتج من خلال الجدول الوسيط (ProductComponent)
    // الأدوات والآلات (tools) والبذور قد لا تحتاج لمادة فعالة
    if (product.category !== 'tools' && product.category !== 'seeds') {
      const selectedComponents = faker.helpers.arrayElements(components, { min: 1, max: 2 })

      for (const comp of selectedComponents) {
        await prisma.productComponent.create({
          data: {
            productId: product.id,
            componentId: comp.id,
            concentration: faker.helpers.arrayElement(CONCENTRATION_FORMATS)
          }
        })
      }
    }
  }

  // ----------------------------------------------------------------
  // 5. إنشاء طلبات الشراء (Orders & OrderItems)
  // ----------------------------------------------------------------
  const orderStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

  for (let i = 0; i < 10; i++) {
    const buyer = faker.helpers.arrayElement(users)
    // اختيار عشوائي من 1 إلى 3 منتجات فريدة لكل طلب
    const orderProducts = faker.helpers.arrayElements(products, { min: 1, max: 3 })

    let calculatedTotal = 0
    const itemsData = orderProducts.map(prod => {
      const qty = faker.number.int({ min: 1, max: 5 })
      const itemPrice = prod.price * (1 - prod.discountPercentage / 100)
      calculatedTotal += itemPrice * qty

      return {
        productId: prod.id,
        quantity: qty,
        price: Number(itemPrice.toFixed(2)) // تثبيت سعر وقت الشراء
      }
    })

    await prisma.order.create({
      data: {
        userId: buyer.id,
        totalAmount: Number(calculatedTotal.toFixed(2)),
        status: faker.helpers.arrayElement(orderStatuses),
        address: `${faker.helpers.arrayElement(EGYPTIAN_CITIES)} - ${faker.location.streetAddress()}`,
        items: {
          createMany: {
            data: itemsData
          }
        }
      }
    })
  }

  // ----------------------------------------------------------------
  // 6. إنشاء رموز تحقق عشوائية من باب اكتمال الجداول
  // ----------------------------------------------------------------
  await prisma.verification.createMany({
    data: Array.from({ length: 5 }).map(() => ({
      id: faker.string.uuid(),
      identifier: faker.internet.email().toLowerCase(),
      value: faker.string.numeric(6),
      expiresAt: faker.date.future(),
    }))
  })

  console.log('✅ تم الانتهاء من عملية الـ Seeding بنجاح وتوليد كافة الجداول والعلاقات المترابطة!')
}

main()
  .catch((e) => {
    console.error('❌ حدث خطأ أثناء عملية الـ Seed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })