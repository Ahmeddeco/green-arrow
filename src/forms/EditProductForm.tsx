/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { editProductAction } from "@/actions/product.action"
import ProductSchema from "@/schemas/ProductSchema"
import { getAllComponentsType } from "@/types/components.type"
import TiptapEditor from "@/components/shared/TiptapEditor"
import CategorySchema from "@/generated/zod/inputTypeSchemas/CategorySchema"
import MultiComponentSelect from "@/components/shared/MultiComponentSelect"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllFactoriesForProductPageType } from "@/types/factories.type"
import { getOneProductForEditProductPageType } from "@/types/Product.type"
import { ComponentUnit } from "@/generated/prisma/enums"
import ProductUnitSchema from "@/generated/zod/inputTypeSchemas/ProductUnitSchema"
import { Textarea } from "@/components/ui/textarea"

type Props = {
	allFactories: getAllFactoriesForProductPageType
	allComponents: getAllComponentsType
	oneProduct: getOneProductForEditProductPageType
}

export default function EditProductForm({ allFactories, allComponents, oneProduct }: Props) {
	const [lastResult, action] = useActionState(editProductAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProductSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	const [selectedComponents, setSelectedComponents] = useState<{ id: string; title: string }[]>([])

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6 ">
			<Input type="hidden" name="id" value={oneProduct?.id} />
			{/* --------------------------------- title -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>الإسم</FieldLabel>
				<Input type="text" key={fields.title.key} name={fields.title.name} defaultValue={oneProduct?.title} />
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* ------------------------------- description ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>وصف المنتج</FieldLabel>
				<Textarea
					key={fields.description.key}
					name={fields.description.name}
					defaultValue={oneProduct?.description ?? ""}
				/>
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* -------------------------------- features -------------------------------- */}
			<TiptapEditor
				key={fields.features.key}
				name={fields.features.name}
				defaultValue={oneProduct?.features ?? ""}
				label="خصائص و مميزات المنتج"
				errors={fields.features.errors}
				id={fields.features.id}
			/>

			{/* ----------------------------- recommendations ---------------------------- */}
			<TiptapEditor
				key={fields.recommendations.key}
				name={fields.recommendations.name}
				defaultValue={oneProduct?.recommendations ?? ""}
				label={"التوصيات"}
				errors={fields.recommendations.errors}
				id={fields.recommendations.id}
			/>
			<div className="flex items-center gap-4">
				{/* -------------------------------- category -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.category.name}>نوع المبيد</FieldLabel>
					<Select key={fields.category.key} name={fields.category.name} defaultValue={oneProduct?.category}>
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
					<Select key={fields.factoryId.key} name={fields.factoryId.name} defaultValue={oneProduct?.factoryId}>
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

			{/* ----------------------------------- phi ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.phi.name}>فترة ما قبل الحصاد</FieldLabel>
				<Textarea key={fields.phi.key} name={fields.phi.name} defaultValue={fields.phi.initialValue} />
				<FieldError>{fields.phi.errors}</FieldError>
			</Field>
			{/* ---------------------------- activeComponents --------------------------- */}
			<MultiComponentSelect
				allSelectedData={allComponents}
				label={"المادة الفعالة"}
				errors={fields.activeComponents.errors}
				onSelectionChange={(selected) => setSelectedComponents(selected)}
				defaultValues={oneProduct?.activeComponents}
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

							// البحث عن القيمة المخزنة مسبقاً لهذا العنصر بالتحديد في قاعدة البيانات إن وجدت
							const existingData = oneProduct?.activeComponents?.find(
								(item: any) => item.componentId === currentComp.id,
							)

							return (
								<div
									key={currentComp.id}
									className="flex flex-col gap-2 border-b border-border/40 pb-4 last:border-none last:pb-0"
								>
									<div className="flex items-end justify-center gap-6">
										<Badge variant="outline" className="h-9 px-3 text-sm">
											{currentComp.title}
										</Badge>
										<Input type="hidden" name={`${baseName}.componentId`} value={currentComp.id} />

										{/* حقل إدخال التركيز */}
										<Field className="flex-1">
											<FieldLabel>التركيز</FieldLabel>
											<Input
												type="number"
												name={`${baseName}.concentration`}
												placeholder="أدخل التركيز"
												// نستخدم القيمة القادمة من الـ Database كـ fallback أساسي لضمان ظهور البيانات أثناء التعديل
												defaultValue={existingData?.concentration ?? ""}
												step={"any"}
											/>
										</Field>

										{/* حقل اختيار وحدة القياس */}
										<Field className="flex-1">
											<FieldLabel>وحدة القياس</FieldLabel>
											<Select name={`${baseName}.unit`} defaultValue={existingData?.unit || ComponentUnit.percentage}>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{Object.values(ComponentUnit).map((unit, uIdx) => (
														<SelectItem value={unit} key={uIdx}>
															{unit}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</Field>
									</div>
								</div>
							)
						})}
					</CardContent>
				</Card>
			)}

			{/* ----------------------- size , Unit , productUrl ---------------------- */}
			<div className="flex lg:flex-row items-center flex-col gap-4">
				{/* size */}
				<Field>
					<FieldLabel htmlFor={fields.size.name}>الحجم</FieldLabel>
					<Input type="number" key={fields.size.key} name={fields.size.name} defaultValue={oneProduct?.size} />
					<FieldError>{fields.size.errors}</FieldError>
				</Field>

				{/* Unit */}
				<Field>
					<FieldLabel htmlFor={fields.unit.name}>وحدة القياس</FieldLabel>
					<Select key={fields.unit.key} name={fields.unit.name} defaultValue={oneProduct?.unit}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.values(ProductUnitSchema.Enum).map((unit, index) => (
								<SelectItem value={unit} key={index}>
									{unit}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.unit.errors}</FieldError>
				</Field>

				{/* productUrl */}
				<Field>
					<FieldLabel htmlFor={fields.productUrl.name}>صفحة المنتج </FieldLabel>
					<Input
						type="url"
						key={fields.productUrl.key}
						name={fields.productUrl.name}
						defaultValue={oneProduct?.productUrl ?? ""}
					/>
					<FieldError>{fields.productUrl.errors}</FieldError>
				</Field>
			</div>

			{/* ----------------- price &  stock & discountPercentage ----------------- */}
			<div className="flex lg:flex-row items-center flex-col gap-4">
				{/* price */}
				<Field>
					<FieldLabel htmlFor={fields.price.name}>السعر</FieldLabel>
					<Input type="number" key={fields.price.key} name={fields.price.name} defaultValue={oneProduct?.price} />
					<FieldError>{fields.price.errors}</FieldError>
				</Field>
				{/* discountPercentage */}
				<Field>
					<FieldLabel htmlFor={fields.discountPercentage.name}>نسبة الخصم</FieldLabel>
					<Input
						type="number"
						key={fields.discountPercentage.key}
						name={fields.discountPercentage.name}
						defaultValue={oneProduct?.discountPercentage ?? ""}
					/>
					<FieldError>{fields.discountPercentage.errors}</FieldError>
				</Field>
				{/* stock */}
				<Field>
					<FieldLabel htmlFor={fields.stock.name}>المخزون</FieldLabel>
					<Input type="number" key={fields.stock.key} name={fields.stock.name} defaultValue={oneProduct?.stock} />
					<FieldError>{fields.stock.errors}</FieldError>
				</Field>
			</div>
			{/* ---------------------------------- mainImage --------------------------------- */}
			<UploadOneImagesDropZone
				errors={fields.mainImage.errors}
				label="صورة المنتج الرئيسية"
				imageKey={fields.mainImage.key}
				imageName={fields.mainImage.name}
				dbImage={oneProduct?.mainImage}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				errors={fields.images.errors}
				label="صور المنتج الأخرى"
				imageKey={fields.images.key}
				imageName={fields.images.name}
				dbImages={oneProduct?.images}
			/>

			{/* عرض الأخطاء العامة للفورم إن وجدت */}
			{form.errors && <FieldError>{form.errors}</FieldError>}

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"عدل المنتج"} />
		</Form>
	)
}
