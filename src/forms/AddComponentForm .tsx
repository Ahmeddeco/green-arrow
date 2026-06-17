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

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"أضف مادة فعالة"} />
		</Form>
	)
}
