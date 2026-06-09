"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin } from "lucide-react" // أيقونات لتحسين الواجهة
// افترضت وجود مكتبة toast لديك بناءً على استخدامك لـ Radix/Tailwind
import { toast } from "sonner"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"

type Coordinates = {
	lat: number
	lng: number
}

export default function Gps() {
	const [coords, setCoords] = useState<Coordinates | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// console.log("coords from Gps", coords)

	 const getMyLocation = useCallback(() => {
		if (!("geolocation" in navigator)) {
			toast.error("متصفحك لا يدعم خاصية تحديد الموقع")
			return
		}

		setIsLoading(true)

		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const newCoords = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
				setCoords(newCoords)

				// console.log(`الدقة الحالية: ${position.coords.accuracy} متر`)

				setIsLoading(false)
				toast.success("تم تحديد الموقع بنجاح")
			},
			(err) => {
				setIsLoading(false)
				switch (err.code) {
					case err.PERMISSION_DENIED:
						toast.error("يرجى السماح بالوصول للموقع من إعدادات المتصفح")
						break
					case err.TIMEOUT:
						toast.error("استغرق طلب الموقع وقتاً طويلاً، حاول مجدداً")
						break
					default:
						toast.error("حدث خطأ أثناء تحديد الموقع")
				}
			},
			options,
		)
	}, [])

	const goToLocationUrl = `https://www.google.com/maps/dir/?api=1&origin=30.5625774611634, 31.013690386491106&destination=${coords?.lat},${coords?.lng}`

	return (
		<Card className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
			<CardHeader>
				<Button onClick={getMyLocation} disabled={isLoading} size={"lg"}>
					{isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <MapPin />}
					{isLoading ? "جاري التحديد..." : "تحديد موقعي الآن"}
				</Button>
			</CardHeader>

			{coords && (
				<CardContent>
					<p>Lat: {coords.lat}</p>
					<p>Lng: {coords.lng}</p>
					<Button variant={"secondary"} asChild>
						<Link href={goToLocationUrl} target="_blank">
							اذهب الى الموقع
						</Link>
					</Button>
				</CardContent>
			)}
		</Card>
	)
}
