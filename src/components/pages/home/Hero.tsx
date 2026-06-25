import { Button } from "@/components/ui/button"
import { heroData } from "@/constants/home"
import { Package2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BsRobot } from "react-icons/bs"

export default function Hero() {
	return (
		<section className="lg:h-[80vh] h-auto flex lg:flex-row flex-col items-center justify-center bg-card pb-0 ">
			{/* --------------------------------- Image --------------------------------- */}
			<div className="size-full relative">
				<Image
					src={"/images/hero.webp"}
					alt={"hero section"}
					fill
					className="object-contain"
					sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 600px"
					priority
				/>
			</div>

			{/* ---------------------------------- Text --------------------------------- */}
			<div className=" size-full flex flex-col justify-center gap-8">
				<h1 className="max-w-lg">{heroData.title}</h1>
				<h4 className="max-w-lg">{heroData.subTitle}</h4>

				{/* --------------------------------- CTA -------------------------------- */}
				<div className="flex items-center  gap-4">
					{/* bot */}
					<Button asChild>
						<Link href={"/bot"}>
							<BsRobot />
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
