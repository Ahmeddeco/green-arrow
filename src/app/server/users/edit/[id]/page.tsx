import { isAllowedRoles } from "@/auth/isAllowedRoles"
import EmptyCard from "@/components/shared/EmptyCard"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneUser } from "@/dl/users.data"
import EditUserForm from "@/forms/EditUserForm"
import { CircleChevronLeft, PlusCircle } from "lucide-react"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles(["admin"])

	const id = (await params).id
	const user = await getOneUser(id)

	return !user ? (
		<EmptyCard href={"/server/clients/add"} linkTitle={"أضف مستخدم جديد"} linkIcon={PlusCircle} />
	) : (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"عدل المستخدم"}
			description={"عدل المستخدم في قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/clients"
		>
			<EditUserForm user={user!} />
		</ServerPageCard>
	)
}
