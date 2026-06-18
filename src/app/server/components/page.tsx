import { MoreVertical, PlusCircle } from "lucide-react"
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
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { getAllComponentsForUsersServerPageType } from "@/types/components.type"
import { getAllComponentsForComponentsServerPage } from "@/dl/components.data"
import { deleteComponentAction } from "@/actions/component.action"

export default async function ComponentsServerPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	await isAllowedRoles(["admin"])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const components: getAllComponentsForUsersServerPageType = await getAllComponentsForComponentsServerPage(
		pageSize,
		pageNumber,
	)

	return (
		<ServerPageCard
			icon={PlusCircle}
			title={"جميع المواد الفعالة"}
			description={"جميع المواد الفعالة في قاعدة البيانات."}
			btnTitle={"أضف  مادة فعالة"}
			href={"/server/components/add"}
		>
			<div className="flex flex-col gap-6">
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>الاسم</TableHead>
							<TableHead className="text-left">الإعدادات</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{components?.data.map(({ title, id }) => (
							<TableRow key={id}>
								<TableCell>{title}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<TableCell className="text-left col-span-1">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant={"ghost"} size={"icon"}>
												<MoreVertical />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start" className="space-y-2 p-2">
											{/* ----------------------------- edit ---------------------------- */}
											<DropdownMenuItem asChild>
												<Button variant={"outline"} size={"full"} asChild>
													<Link href={`/server/components/edit/${id}`}>تعديل</Link>
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
															<DialogTitle>هل أنت متأكد من رغبتك في حذف هذه المادة الفعالة؟</DialogTitle>
															<DialogDescription>
																لا يمكن التراجع عن هذا الإجراء. سيؤدي ذلك إلى حذف هذه المادة الفعالة نهائيًا وإزالة
																بياناته من خوادمنا.
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between ">
															<Button asChild variant={"default"}>
																<DialogClose>إلغاء الحذف</DialogClose>
															</Button>
															<Form action={deleteComponentAction}>
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
								{Array.from({ length: components!.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < components!.totalPages && (
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
