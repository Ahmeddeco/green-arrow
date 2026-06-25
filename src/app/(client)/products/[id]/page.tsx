import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getOneProductForProductDetailsPage } from "@/dl/products.data"
import { Currency, finalPrice } from "@/logic/currency"
import { getOneProductForProductDetailsPageType } from "@/types/Product.type"
import { Factory, ImageOff, Link2, Percent } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
	params: Promise<{ id: string }>
}

export default async function ProductDetailsPage({ params }: Props) {
	const id = (await params).id
	const product: getOneProductForProductDetailsPageType = await getOneProductForProductDetailsPage(id)

	return (
		<section className="mx-auto container  ">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between w-full lg:w-1/2">
						<h1>
							{product?.title}
							<Badge variant={"outline"} className="lowercase mx-4">
								{product?.size} {product?.unit}
							</Badge>
						</h1>
						<div className="flex items-end gap-4">
							<h4 className="text-muted-foreground  line-through ">{Currency(product?.price ?? 0)}</h4>
							<h2 className="text-primary">{finalPrice(product?.price ?? 0, product?.discountPercentage ?? 0)}</h2>
						</div>
					</CardTitle>
					<CardDescription>{product?.description}</CardDescription>
				</CardHeader>
				<CardContent className="flex lg:flex-row flex-col gap-8 min-h-[60vh] h-auto ">
					{/* ----------------------------- mainImage ----------------------------- */}
					<div className="flex-1 relative max-h-[60vh]">
						{product?.mainImage ? (
							<Image
								src={product?.mainImage}
								alt={product?.title ?? "product"}
								fill
								className="object-cover rounded-xl"
								sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 600px"
								priority
							/>
						) : (
							<ImageOff />
						)}
					</div>

					{/* --------------------------------- Details -------------------------------- */}
					<div className="flex-1 flex flex-col gap-2 ">
						{/* factory */}
						<div className="flex items-center gap-4">
							<h4>من إنتاج شركة</h4>
							<Badge variant={"default"}>
								<Factory />
								{product?.factory.name}
							</Badge>
						</div>
						{/* category */}
						<div className="flex items-center gap-4">
							<h4>النوع</h4>
							<Badge variant={"default"}>{product?.category}</Badge>
						</div>

						<div className="flex items-center gap-4">
							<h4>المادة الفعالة</h4>
							<div className="flex flex-wrap items-center gap-4">
								{product?.activeComponents.map(({ component, componentId, concentration, unit }) => (
									<Badge key={componentId} variant={"default"} dir="ltr">
										{component.title} - {concentration} {unit === "percentage" ? <Percent /> : unit}
									</Badge>
								))}
							</div>
						</div>

						{/* productUrl */}
						<div className="flex items-center gap-4">
							<h4>صفحة المنتج</h4>
							<Button size={"sm"} variant={"default"} asChild>
								<Link href={product?.productUrl ?? "#"} target="_blank">
									<Link2 />
									{product?.factory.name}
								</Link>
							</Button>
						</div>
						{/* phi */}
						<h4>توصيات ما قبل الحصاد</h4>
						<div
							dir="rtl"
							className="prose dark:prose-invert "
							dangerouslySetInnerHTML={{ __html: product?.phi ?? "لا توجد توصيات" }}
						/>
					</div>
				</CardContent>

				{/* -------------------------------- Footer ------------------------------- */}
				<CardFooter>
					<div className="flex flex-col lg:flex-row gap-8 justify-between w-full ">
						{/* ------------------------------ features ------------------------------ */}
						<Accordion type="single" collapsible defaultValue="item-1" className="lg:w-1/2 w-full ">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									<h2>خصائص ومميزات</h2>
								</AccordionTrigger>
								<AccordionContent className="h-fit">
									<div
										dir="rtl"
										className="prose dark:prose-invert "
										dangerouslySetInnerHTML={{ __html: product?.features ?? "no phi" }}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						{/* --------------------------- recommendations -------------------------- */}
						<Accordion type="single" collapsible defaultValue="item-1" className="lg:w-1/2 w-full ">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									<h2>التوصيات</h2>
								</AccordionTrigger>
								<AccordionContent className="h-fit">
									<div
										dir="rtl"
										className="prose dark:prose-invert "
										dangerouslySetInnerHTML={{ __html: product?.recommendations ?? "no recommendations" }}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</CardFooter>
			</Card>
		</section>
	)
}
