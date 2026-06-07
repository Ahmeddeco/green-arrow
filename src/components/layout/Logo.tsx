import { TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Logo() {
	return (
		<Link href="/" className="flex items-center justify-center gap-1">
			<TrendingUp className=" text-primary size-8 " />
			<h4 className="tracking-wider  font-black ">السهم الأخضر</h4>
		</Link>
	)
}
