"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import Phone from "@/components/shared/Phone"
import { Input } from "@/components/ui/input"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { editFactoryAction } from "@/actions/factory.action"
import FactorySchema from "@/schemas/FactorySchema"
import Image from "next/image"
import { getOneFactoryForEditFactoryPageType } from "@/types/factories.type"

type Props = {
	allUsers:
		| {
				id: string
				name: string
				image: string | null
		  }[]
		| undefined
	oneFactory: getOneFactoryForEditFactoryPageType
}
export default function EditFactoryForm({ allUsers, oneFactory }: Props) {
	const [lastResult, action] = useActionState(editFactoryAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: FactorySchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6 ">
			{/* --------------------------------- name -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>الإسم</FieldLabel>
				<Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={oneFactory?.name} />
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* --------------------------------- email -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.email.name}>الإيميل</FieldLabel>
				<Input type="email" key={fields.email.key} name={fields.email.name} defaultValue={oneFactory?.email ?? ""} />
				<FieldError>{fields.email.errors}</FieldError>
			</Field>

			{/* --------------------------------- website -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.website.name}>الموقع الإلكتروني</FieldLabel>
				<Input
					type="url"
					key={fields.website.key}
					name={fields.website.name}
					defaultValue={oneFactory?.website ?? ""}
				/>
				<FieldError>{fields.website.errors}</FieldError>
			</Field>

			{/* -------------------------------- address -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.address.name}>العنوان </FieldLabel>
				<Textarea key={fields.address.key} name={fields.address.name} defaultValue={oneFactory?.address ?? ""} />
				<FieldError>{fields.address.errors}</FieldError>
			</Field>

			{/* ---------------------------- tel ---------------------------- */}
			<Phone
				key={fields.tel.key}
				name={fields.tel.name}
				defaultValue={oneFactory?.tel ?? ""}
				errors={fields.tel.errors}
				label="الهاتف الرئيسي"
			/>

			{/* ---------------------------------- users ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.userId.name}>الدور</FieldLabel>
				<Select key={fields.userId.key} name={fields.userId.name} defaultValue={oneFactory?.owner.id ?? ""}>
					<SelectTrigger>
						<SelectValue placeholder={"المالك"} />
					</SelectTrigger>
					<SelectContent>
						{allUsers?.map(({ id, image, name }) => (
							<SelectItem value={id} key={id} className="flex items-center py-2 gap-2 w-fit">
								{image && <Image src={image} alt={"owner"} width={24} height={24} />}
								<h6>{name}</h6>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.userId.errors}</FieldError>
			</Field>

			{/* ---------------------------------- logo --------------------------------- */}
			<UploadOneImagesDropZone
				errors={fields.logo.errors}
				label="اللوجو"
				imageKey={fields.logo.key}
				imageName={fields.logo.name}
				dbImage={oneFactory?.logo ?? ""}
			/>
			{form.errors && <FieldError>{form.errors}</FieldError>}

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"عدل بيانات المصنع"} />
		</Form>
	)
}
