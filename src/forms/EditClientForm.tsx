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
import { editClientAction } from "@/actions/user.action"
import { Input } from "@/components/ui/input"
import ClientSchema from "@/schemas/ClientSchema"
import Gps from "@/components/shared/Gps"
import { Client } from "@/generated/prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
	client: Client
}

export default function EditClientForm({ client }: Props) {
	const [lastResult, action] = useActionState(editClientAction, undefined)
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
				<Input type="hidden" key={fields.id.key} name={fields.id.name} value={client.id} />
				{/* -------------------------------- user -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.userId.name}>المستخدم</FieldLabel>
					<Input type="text" key={fields.userId.key} name={fields.userId.name} defaultValue={client.userId} />
				</Field>

				{/* --------------------------------- role -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.role.name}>الدور</FieldLabel>
					<Select key={fields.role.key} name={fields.role.name} defaultValue={client.role}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.values(Role).map((degreeProgram) => (
								<SelectItem value={degreeProgram} key={degreeProgram}>
									{degreeProgram}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.role.errors}</FieldError>
				</Field>

				{/* ---------------------------- mainMobile ---------------------------- */}
				<Phone
					key={fields.mainMobile.key}
					name={fields.mainMobile.name}
					defaultValue={client.mainMobile ?? ""}
					errors={fields.mainMobile.errors}
					label="الهاتف الرئيسي"
				/>

				{/* --------------------------- secondaryMobile --------------------------- */}
				<Phone
					key={fields.secondaryMobile.key}
					name={fields.secondaryMobile.name ?? ""}
					defaultValue={client.secondaryMobile ?? ""}
					errors={fields.secondaryMobile.errors}
					label="الهاتف الثانوي"
				/>
			</div>

			{/* ----------------------------------- Gps ---------------------------------- */}
			<Gps cord={{ lat: Number(client.lat), lng: Number(client.lng) }} />

			{/* --------------------------- addressDescription --------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.addressDescription.name}>العنوان بالتفصيل</FieldLabel>
				<Textarea
					key={fields.addressDescription.key}
					name={fields.addressDescription.name}
					defaultValue={client.addressDescription ?? ""}
				/>
				<FieldError>{fields.addressDescription.errors}</FieldError>
			</Field>

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"عدل مستخدم"} />
		</Form>
	)
}
