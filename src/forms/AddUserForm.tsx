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
import Gps from "@/components/shared/Gps"
import UserSchema from "@/schemas/UserSchema"
import { addUserAction } from "@/actions/user.action"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Role } from "@/generated/prisma/enums"

type Props = {
	authUser:
		| {
				id: string
				createdAt: Date
				updatedAt: Date
				email: string
				emailVerified: boolean
				name: string
				image?: string | null | undefined
				banned: boolean | null | undefined
				role?: string | null | undefined
				banReason?: string | null | undefined
				banExpires?: Date | null | undefined
		  }
		| undefined
}

export default function AddUserForm({ authUser }: Props) {
	const [lastResult, action] = useActionState(addUserAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6 ">
			{/* --------------------------------- name -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>الإسم</FieldLabel>
				<Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={authUser?.name ?? ""} />
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* -------------------------------- email -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.email.name}>الإيميل </FieldLabel>
				<Input type="email" key={fields.email.key} name={fields.email.name} defaultValue={authUser?.email ?? ""} />
				<FieldError>{fields.email.errors}</FieldError>
			</Field>

			{/* ---------------------------------- role ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.role.name}>الدور</FieldLabel>
				<Select key={fields.role.key} name={fields.role.name} defaultValue={Role.user}>
					<SelectTrigger>
						<SelectValue placeholder={Role.user} />
					</SelectTrigger>
					<SelectContent>
						{Object.values(Role).map((role) => (
							<SelectItem value={role} key={role}>
								{role}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.role.errors}</FieldError>
			</Field>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone
				errors={fields.image.errors}
				label="الصورة"
				imageKey={fields.image.key}
				imageName={fields.image.name}
				dbImage={authUser?.image ?? ""}
			/>
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
			{form.errors && <FieldError>{form.errors}</FieldError>}

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"أضف مستخدم"} />
		</Form>
	)
}
