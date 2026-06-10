import { Button } from "@/components/ui/button"
import { heroData } from "@/constants/home"
import { Bot, Package2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
	return (
		<section className="lg:h-[90vh] h-auto flex lg:flex-row flex-col items-center justify-center ">
			{/* --------------------------------- Image --------------------------------- */}
			<div className="size-full relative">
				<Image src={"/images/hero.webp"} alt={""} fill className="object-contain" />
			</div>

			{/* ---------------------------------- Text --------------------------------- */}
			<div className=" size-full flex flex-col justify-center gap-4">
				<h1 className="max-w-lg">{heroData.title}</h1>
				<h4 className="max-w-lg">{heroData.subTitle}</h4>
				{/* --------------------------------- CTA -------------------------------- */}
				<div className="flex items-center  gap-4">
					{/* bot */}
					<Button asChild>
						<Link href={"/bot"}>
							<Bot />
							شخّص إصابة زرعك مجاناً
						</Link>
					</Button>
					{/* products */}
					<Button asChild variant={"outline"}>
						<Link href={"/products"}>
							<Package2 />
							تصفح المنتجات
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
