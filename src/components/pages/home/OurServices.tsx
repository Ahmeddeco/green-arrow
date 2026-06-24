import { Badge } from "@/components/ui/badge"
import { ourServicesData } from "@/constants/home"
import Image from "next/image"

export default function OurServices() {
	return (
		<section className="container mx-auto flex flex-col lg:flex-row lg:gap-16 justify-between gap-8">
			{/* ------------------------------- Text ------------------------------- */}
			<div className="flex flex-col gap-8 lg:w-2/3 w-full h-auto max-w-lg ">
				<Badge variant={"outline"}>{ourServicesData.title}</Badge>
				<h3>{ourServicesData.mainHeading}</h3>
				<p>{ourServicesData.description}</p>

				{/* Badges */}
				<div className="flex flex-wrap items-center gap-2">
					{ourServicesData.badges.map((badge, index) => (
						<Badge key={index} variant={"outline"}>
							{badge}
						</Badge>
					))}
				</div>

				{/* Stats */}
				<div className="flex items-center justify-between">
					{ourServicesData.Stats.map(({ feature, number }, index) => (
						<div className="flex flex-col justify-center gap-0.5" key={index}>
							<h4>{number}</h4>
							<p>{feature}</p>
						</div>
					))}
				</div>
			</div>

			{/* ------------------------------- Image ------------------------------ */}
			<div className="lg:w-1/3 w-full  aspect-video bg-card rounded-xl py-4 px-1 ">
				<div className="relative w-full h-full -rotate-3 ">
					<Image
						src={"/images/TractoreKofra.webp"}
						alt={"Our Services"}
						fill
						sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 600px"
						className="object-cover rounded-xl shadow-lg"
					/>
				</div>
			</div>
		</section>
	)
}
