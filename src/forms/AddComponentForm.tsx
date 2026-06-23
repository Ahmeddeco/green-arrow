"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import { Input } from "@/components/ui/input"
import ComponentSchema from "@/schemas/ComponentSchema"
import { addComponentAction } from "@/actions/component.action"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComponentUnit } from "@/generated/prisma/enums"

export default function AddComponentForm() {
	const [lastResult, action] = useActionState(addComponentAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ComponentSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6 ">
			{/* --------------------------------- title -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>الإسم</FieldLabel>
				<Input type="text" key={fields.title.key} name={fields.title.name} defaultValue={fields.title.initialValue} />
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* ---------------------------------- Unit ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.unit.name}>وحدة القياس</FieldLabel>
				<Select key={fields.unit.key} name={fields.unit.name} defaultValue={ComponentUnit.percentage}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{Object.values(ComponentUnit).map((unit, index) => (
							<SelectItem value={unit} key={index}>
								{unit}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.unit.errors}</FieldError>
			</Field>

			{form.errors && <FieldError>{form.errors}</FieldError>}

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"أضف مادة فعالة"} />
		</Form>
	)
}
