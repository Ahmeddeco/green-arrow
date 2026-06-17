import { ImageOff, Link2, MoreVertical, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Form from "next/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import React from "react"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { getAllFactoriesType } from "@/types/factories.type"
import { getAllFactories } from "@/dl/factories.data"
import { deleteFactoryAction } from "@/actions/factory.action"

export default async function FactoriesServerPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	await isAllowedRoles(["admin"])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const Factories: getAllFactoriesType = await getAllFactories(pageSize, pageNumber)

	return (
		<ServerPageCard
			icon={PlusCircle}
			title={"جميع المصانع"}
			description={"جميع المصانع في قاعدة البيانات."}
			btnTitle={"أضف مصنع"}
			href={"/server/factories/add"}
		>
			<div className="flex flex-col gap-6">
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>اللوجو</TableHead>
							<TableHead>اسم المصنع</TableHead>
							<TableHead>الإيميل</TableHead>
							<TableHead>الهاتف</TableHead>
							<TableHead>الموقع الإلكتروني</TableHead>
							<TableHead>المالك</TableHead>
							<TableHead className="text-left">الإعدادات</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{Factories?.data.map(({ email, logo, name, owner, tel, website, id }) => (
							<TableRow key={id}>
								<TableCell>
									{logo ? (
										<Image src={logo} alt={"user"} width={50} height={50} className="rounded-lg object-cover" />
									) : (
										React.createElement(ImageOff)
									)}
								</TableCell>
								<TableCell className="capitalize">{name}</TableCell>
								<TableCell className="lowercase">{email} </TableCell>
								<TableCell>{tel} </TableCell>
								<TableCell>
									<Button asChild variant={"link"} size={"sm"}>
										<Link href={website ?? "#"} target="_blank">
											<Link2 />
											إذهب الى الموقع
										</Link>
									</Button>
								</TableCell>
								<TableCell>
									<Badge>{owner.name}</Badge>
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<TableCell className="text-left col-span-1">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant={"outline"} size={"icon"}>
												<MoreVertical />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start" className="space-y-2 p-2">
											{/* ----------------------------- edit ---------------------------- */}
											<DropdownMenuItem asChild>
												<Button variant={"outline"} size={"full"} asChild>
													<Link href={`/server/factories/edit/${id}`}>تعديل</Link>
												</Button>
											</DropdownMenuItem>
											{/* ---------------------------- delete --------------------------- */}
											<DropdownMenuItem asChild>
												<Dialog>
													<DialogTrigger asChild>
														<Button variant={"destructive"} size={"full"}>
															حذف
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>هل أنت متأكد من رغبتك في حذف هذا المصنع ؟</DialogTitle>
															<DialogDescription>
																لا يمكن التراجع عن هذا الإجراء. سيؤدي ذلك إلى حذف هذا المنتج نهائيًا وإزالة بياناته من
																خوادمنا.
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between ">
															<Button asChild variant={"default"}>
																<DialogClose>إلغاء الحذف</DialogClose>
															</Button>
															<Form action={deleteFactoryAction}>
																<Input type="hidden" name="id" value={id} />
																<Button type="submit" variant={"destructive"}>
																	الحذف نهائيا
																</Button>
															</Form>
														</div>
													</DialogContent>
												</Dialog>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									{/* --------------------------- Previous --------------------------- */}
									{pageNumber > 1 && <PaginationPrevious href={`?size=${pageSize}&page=${pageNumber - 1}`} />}
								</PaginationItem>
								{/* ------------------------- PaginationLink ------------------------ */}
								{Array.from({ length: Factories!.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < Factories!.totalPages && (
										<PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</TableCaption>
				</Table>
			</div>
		</ServerPageCard>
	)
}
