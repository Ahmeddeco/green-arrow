"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import { Input } from "@/components/ui/input"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { addProductAction } from "@/actions/product.action"
import MultiSelect from "@/components/shared/MultiSelect"
import ProductSchema from "@/schemas/ProductSchema"
import { getAllComponentsType } from "@/types/components.type"
import TiptapEditor from "@/components/shared/TiptapEditor"

type Props = {
	allFactories:
		| {
				id: string
				name: string
				logo: string | null
		  }[]
		| undefined
	allComponents: getAllComponentsType
}
export default function AddProductForm({ allFactories, allComponents }: Props) {
	const [lastResult, action] = useActionState(addProductAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProductSchema })
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

			{/* ------------------------------- description ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>وصف المنتج</FieldLabel>
				<TiptapEditor
					editorKey={fields.description.key}
					name={fields.description.name}
					defaultValue={fields.description.initialValue}
				/>
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* ----------------------------- recommendations ---------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.recommendations.name}>التوصيات</FieldLabel>
				<TiptapEditor
					key={fields.recommendations.key}
					name={fields.recommendations.name}
					defaultValue={fields.recommendations.initialValue}
				/>
				<FieldError>{fields.recommendations.errors}</FieldError>
			</Field>

			{/* -------------------------------- features -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.features.name}>خصائص و مميزات المنتج</FieldLabel>
				<TiptapEditor key={fields.features.key} name={fields.features.name} defaultValue={fields.features.initialValue} />
				<FieldError>{fields.features.errors}</FieldError>
			</Field>

			{/* ----------------------------------- phi ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.phi.name}>فترة ما قبل الحصاد</FieldLabel>
				<Input type="number" key={fields.phi.key} name={fields.phi.name} defaultValue={fields.phi.initialValue} />
				<FieldError>{fields.phi.errors}</FieldError>
			</Field>
			{/* ---------------------------------- المصنع ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.factoryId.name}>المصنع</FieldLabel>
				<Select key={fields.factoryId.key} name={fields.factoryId.name} defaultValue={fields.factoryId.initialValue}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{allFactories?.map(({ id, logo, name }) => (
							<SelectItem value={id} key={id} className="flex items-center py-2 gap-2 ">
								{logo && (
									<Image src={logo} alt={"owner"} width={24} height={24} className="object-cover aspect-square" />
								)}
								<h6>{name}</h6>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.factoryId.errors}</FieldError>
			</Field>

			{/* ---------------------------- activeComponents --------------------------- */}
			<MultiSelect
				allSelectedData={allComponents}
				inputName={""}
				label={"المادة الفعالة"}
				errors={fields.activeComponents.errors}
				key={fields.activeComponents.key}
			/>

			{/* --------------------------------- website -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.productUrl.name}>صفحة المنتج </FieldLabel>
				<Input
					type="url"
					key={fields.productUrl.key}
					name={fields.productUrl.name}
					defaultValue={fields.productUrl.initialValue}
				/>
				<FieldError>{fields.productUrl.errors}</FieldError>
			</Field>

			{/* ----------------- price &  stock & discountPercentage ----------------- */}
			<div className="flex items-center gap-4">
				{/* price */}
				<Field>
					<FieldLabel htmlFor={fields.price.name}>السعر</FieldLabel>
					<Input
						type="number"
						key={fields.price.key}
						name={fields.price.name}
						defaultValue={fields.price.initialValue}
					/>
					<FieldError>{fields.price.errors}</FieldError>
				</Field>
				{/* discountPercentage */}
				<Field>
					<FieldLabel htmlFor={fields.discountPercentage.name}>نسبة الخصم</FieldLabel>
					<Input
						type="number"
						placeholder={"% 9"}
						key={fields.discountPercentage.key}
						name={fields.discountPercentage.name}
						defaultValue={fields.discountPercentage.initialValue}
					/>
					<FieldError>{fields.discountPercentage.errors}</FieldError>
				</Field>
				{/* stock */}
				<Field>
					<FieldLabel htmlFor={fields.stock.name}>الكمية</FieldLabel>
					<Input
						type="number"
						key={fields.stock.key}
						name={fields.stock.name}
						defaultValue={fields.stock.initialValue}
					/>
					<FieldError>{fields.stock.errors}</FieldError>
				</Field>
			</div>

			{/* ---------------------------------- mainImage --------------------------------- */}
			<UploadOneImagesDropZone
				errors={fields.mainImage.errors}
				label="صورة المنتج الرئيسية"
				imageKey={fields.mainImage.key}
				imageName={fields.mainImage.name}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				errors={fields.images.errors}
				label="صور المنتج الأخرى"
				imageKey={fields.images.key}
				imageName={fields.images.name}
			/>

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"أضف منتج"} />
		</Form>
	)
}
