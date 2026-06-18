import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ourCategories } from "@/constants/home"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function Categories() {
	return (
		<section className="container mx-auto flex flex-col items-center justify-center gap-4">
			<h2>أقسام المنتجات</h2>

			{/* ----------------------------- Carousel ----------------------------- */}
			<div className="w-full ">
				<Carousel opts={{ align: "start", loop: false, direction: "rtl" }}>
					<CarouselContent className="-ml-2 md:-ml-4">
						{ourCategories.map(({ icon, title, category }, index) => (
							<CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-2 md:pl-4 " key={index}>
								<Link href={`/products?category=${category}`}>
									<Card>
										<CardContent className="flex items-center justify-center">
											{React.createElement(icon, { size: 108 })}
										</CardContent>
										<CardFooter className="flex items-center justify-between">
											<h3>{title}</h3>
											<div className={`rounded-full ${buttonVariants({ size: "icon-sm" })} `}>
												<ExternalLink />
											</div>
										</CardFooter>
									</Card>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	)
}
