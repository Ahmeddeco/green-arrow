"use client"

import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Card, CardContent, CardHeader } from "../ui/card"

type Props = {
	allSelectedData: { id: string; title: string }[] | undefined
	errors: string[] | undefined
	defaultValues?: { id: string; title: string }[] | undefined
	label: string
	onSelectionChange?: (selected: { id: string; title: string }[]) => void // 👈 أضفنا هذا الـ Callback
}

export default function MultiComponentSelect({
	allSelectedData,
	label,
	defaultValues,
	errors,
	onSelectionChange,
}: Props) {
	const [selected, setSelected] = useState<{ id: string; title: string }[]>(defaultValues || [])

	const toggle = (id: string) => {
		// 1. حساب المصفوفة الجديدة أولاً خارج الـ State
		let updated: { id: string; title: string }[] = []

		if (selected.some((item) => item.id === id)) {
			updated = selected.filter((item) => item.id !== id)
		} else {
			const found = allSelectedData?.find((item) => item.id === id)
			updated = found ? [...selected, found] : selected
		}

		// 2. تحديث الـ State المحلي للمكون
		setSelected(updated)

		// 3. إرسال البيانات المحدثة بأمان إلى الفورم الأب (خارج عملية الـ Render)
		if (onSelectionChange) {
			onSelectionChange(updated)
		}
	}

	const remove = (id: string) => {
		const updated = selected.filter((item) => item.id !== id)
		setSelected(updated)

		if (onSelectionChange) {
			onSelectionChange(updated)
		}
	}

	return (
		<Field>
			<FieldLabel>{label}</FieldLabel>
			<Card className="w-full ">
				<CardHeader className="flex flex-wrap gap-6">
					{selected.map(({ id, title }) => (
						<Button key={id} onClick={() => remove(id)} size={"sm"} type="button">
							{title} <X />
						</Button>
					))}
				</CardHeader>

				<CardContent className="flex flex-col gap-6 w-full">
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" role="combobox" size={"lg"} type="button">
								اختر المواد الفعالة
								<ChevronDown opacity={0.5} />
							</Button>
						</PopoverTrigger>

						<PopoverContent className="w-fit max-w-xl p-0 " align="start">
							<Command>
								<CommandEmpty>No result found.</CommandEmpty>
								<CommandGroup>
									{allSelectedData?.map(({ id, title }) => (
										<CommandItem key={id} onSelect={() => toggle(id)} className="flex items-start gap-4">
											<Check className={selected.some((item) => item.id === id) ? "opacity-100" : "opacity-0"} />
											{title}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</CardContent>
			</Card>
			<FieldError>{errors}</FieldError>
		</Field>
	)
}
