import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { Eye, ImageOff } from "lucide-react"
import { Badge } from "../ui/badge"
import { Currency, finalPrice } from "@/logic/currency"
import Link from "next/link"
import { AddToCart } from "./CustomButtons"
import { ProductCardType } from "@/types/Product.type"

export default function ProductCard({ product }: { product: ProductCardType }) {
	return (
		<Card className="overflow-hidden group">
			<CardHeader>
				<div className="relative aspect-video">
					{!product?.mainImage ? (
						<ImageOff />
					) : (
						<Image
							src={product?.mainImage}
							alt={product?.title}
							fill
							className="object-cover rounded-t-xl"
							sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 600px"
						/>
					)}

					{product?.discountPercentage && product.discountPercentage > 0 && (
						<Badge className="absolute top-2 left-2 ">خصم {product?.discountPercentage} %</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<h6>{product?.category}</h6>
				<h4>{product?.title}</h4>
				<h4 className="line-through text-muted-foreground">{Currency(product?.price as number)}</h4>
				<h2>{finalPrice(product?.price as number, product?.discountPercentage as number)}</h2>
			</CardContent>

			{/* ------------------------------ CardFooter ----------------------------- */}
			<CardFooter className="flex items-center justify-center gap-2 ">
				{/* AddToCart */}
				<AddToCart product={product} />
				<Button className="lg:flex-1" variant={"outline"} asChild>
					<Link href={`/products/${product?.id}`}>
						<Eye />
						شاهد التفاصيل
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
