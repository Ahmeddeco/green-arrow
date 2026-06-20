"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState, useState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import { Input } from "@/components/ui/input"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { addProductAction } from "@/actions/product.action"
import ProductSchema from "@/schemas/ProductSchema"
import { getAllComponentsType } from "@/types/components.type"
import TiptapEditor from "@/components/shared/TiptapEditor"
import CategorySchema from "@/generated/zod/inputTypeSchemas/CategorySchema"
import MultiComponentSelect from "@/components/shared/MultiComponentSelect"
import { Unit } from "@/generated/prisma/enums"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllFactoriesForProductPageType } from "@/types/factories.type"

type Props = {
	allFactories: getAllFactoriesForProductPageType
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

	// تتبع الـ components المختارة لإنشاء مدخلات التركيز والوحدة لها
	const [selectedComponents, setSelectedComponents] = useState<{ id: string; title: string }[]>([])

	// 1. استخراج الـ field list الخاص بالمواد الفعالة لـ Conform
	const componentList = fields.activeComponents.getFieldList()

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6 ">
			{/* --------------------------------- title -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>الإسم</FieldLabel>
				<Input type="text" key={fields.title.key} name={fields.title.name} defaultValue={fields.title.initialValue} />
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* ------------------------------- description ------------------------------ */}
			<TiptapEditor
				editorKey={fields.description.key}
				name={fields.description.name}
				defaultValue={fields.description.initialValue}
				label={"وصف المنتج"}
				errors={fields.description.errors}
				id={fields.description.id}
			/>

			{/* ----------------------------- recommendations ---------------------------- */}
			<TiptapEditor
				key={fields.recommendations.key}
				name={fields.recommendations.name}
				defaultValue={fields.recommendations.initialValue}
				label={"التوصيات"}
				errors={fields.recommendations.errors}
				id={fields.recommendations.id}
			/>

			{/* -------------------------------- features -------------------------------- */}
			<TiptapEditor
				key={fields.features.key}
				name={fields.features.name}
				defaultValue={fields.features.initialValue}
				label="خصائص و مميزات المنتج"
				errors={fields.features.errors}
				id={fields.features.id}
			/>

			<div className="flex items-center gap-4">
				{/* ----------------------------------- phi ---------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.phi.name}>فترة ما قبل الحصاد</FieldLabel>
					<Input type="number" key={fields.phi.key} name={fields.phi.name} defaultValue={fields.phi.initialValue} />
					<FieldError>{fields.phi.errors}</FieldError>
				</Field>

				{/* -------------------------------- category -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.category.name}>نوع المبيد</FieldLabel>
					<Select key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.values(CategorySchema.Enum).map((category, index) => (
								<SelectItem value={category} key={index}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.category.errors}</FieldError>
				</Field>

				{/* ---------------------------------- factory ---------------------------------- */}
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
										<Image
											src={logo}
											alt={"owner"}
											width={24}
											height={24}
											className="object-cover aspect-square rounded-sm"
										/>
									)}
									<h6>{name}</h6>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.factoryId.errors}</FieldError>
				</Field>
			</div>

			{/* ---------------------------- activeComponents --------------------------- */}
			<MultiComponentSelect
				allSelectedData={allComponents}
				label={"المادة الفعالة"}
				errors={fields.activeComponents.errors}
				onSelectionChange={(selected) => setSelectedComponents(selected)}
			/>

			{/* تحديد تركيز ووحدات المواد الفعالة المختارة */}
			{selectedComponents.length > 0 && (
				<Card className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
					<CardHeader>
						<CardTitle>تحديد تركيز ووحدات المواد الفعالة المختارة</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-6">
						{selectedComponents.map((currentComp, index) => {
							const baseName = `${fields.activeComponents.name}[${index}]`
							const currentFieldConfig = componentList[index]?.getFieldset()

							return (
								<div
									key={currentComp.id}
									className="flex flex-col gap-2 border-b border-border/40 pb-4 last:border-none last:pb-0"
								>
									<div className="flex items-end justify-center gap-6">
										<Badge>{currentComp.title}</Badge>
										<Input type="hidden" name={`${baseName}.componentId`} value={currentComp.id} />

										{/* حقل إدخال التركيز */}
										<Field className="flex-1">
											<FieldLabel>التركيز</FieldLabel>
											<Input
												type="number"
												name={`${baseName}.concentration`}
												placeholder="أدخل التركيز"
												defaultValue={currentFieldConfig?.concentration?.initialValue}
											/>
											<FieldError>{currentFieldConfig?.concentration?.errors}</FieldError>
										</Field>

										{/* حقل اختيار وحدة القياس */}
										<Field className="flex-1">
											<FieldLabel>وحدة القياس</FieldLabel>
											<Select
												name={`${baseName}.unit`}
												defaultValue={currentFieldConfig?.unit?.initialValue || Unit.percentage}
											>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{Object.values(Unit).map((unit, uIdx) => (
														<SelectItem value={unit} key={uIdx}>
															{unit}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FieldError>{currentFieldConfig?.unit?.errors}</FieldError>
										</Field>
									</div>
								</div>
							)
						})}
					</CardContent>
				</Card>
			)}

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

			{/* عرض الأخطاء العامة للفورم إن وجدت */}
			{form.errors && (
				<div className="text-destructive text-sm font-bold bg-destructive/10 p-3 rounded">{form.errors}</div>
			)}

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"أضف منتج"} />
		</Form>
	)
}
