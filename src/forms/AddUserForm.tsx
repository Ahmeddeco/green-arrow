"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import Phone from "@/components/shared/Phone"
import { Role } from "@/generated/prisma/enums"
import { addClientAction } from "@/actions/user.action"
import { Input } from "@/components/ui/input"
import ClientSchema from "@/schemas/ClientSchema"
import Gps from "@/components/shared/Gps"

type Props = {
	userId: string | undefined
}

export default function AddClientForm({ userId }: Props) {
	const [lastResult, action] = useActionState(addClientAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ClientSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* -------------------------------- user -------------------------------- */}
				<Input type="hidden" key={fields.userId.key} name={fields.userId.name} value={userId} />

				{/* --------------------------------- role -------------------------------- */}
				<Input type="hidden" key={fields.role.key} name={fields.role.name} value={Role.client} />

				{/* ---------------------------- mainMobile ---------------------------- */}
				<Phone
					key={fields.mainMobile.key}
					name={fields.mainMobile.name}
					defaultValue={fields.mainMobile.initialValue ?? ""}
					errors={fields.mainMobile.errors}
					label="الهاتف الرئيسي"
				/>

				{/* --------------------------- secondaryMobile --------------------------- */}
				<Phone
					key={fields.secondaryMobile.key}
					name={fields.secondaryMobile.name ?? ""}
					defaultValue={fields.secondaryMobile.initialValue ?? ""}
					errors={fields.secondaryMobile.errors}
					label="الهاتف الثانوي"
				/>
			</div>

			{/* ----------------------------------- Gps ---------------------------------- */}
			<Gps />

			{/* --------------------------- addressDescription --------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.addressDescription.name}>العنوان بالتفصيل</FieldLabel>
				<Textarea
					key={fields.addressDescription.key}
					name={fields.addressDescription.name}
					defaultValue={fields.addressDescription.initialValue}
				/>
				<FieldError>{fields.addressDescription.errors}</FieldError>
			</Field>

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"أضف مستخدم"} />
		</Form>
	)
}
