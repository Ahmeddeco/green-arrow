import { isAllowedRoles } from "@/auth/isAllowedRoles"
import EmptyCard from "@/components/shared/EmptyCard"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneClient } from "@/dl/clients.data"
import EditClientForm from "@/forms/EditClientForm"
import { CircleChevronLeft, PlusCircle } from "lucide-react"

export default async function EditclientPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles(["admin"])

	const id = (await params).id
	const client = await getOneClient(id)

	return !client ? (
		<EmptyCard href={"/server/clients/add"} linkTitle={"أضف مستخدم جديد"} linkIcon={PlusCircle} />
	) : (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"عدل المستخدم"}
			description={"عدل المستخدم في قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/clients"
		>
			<EditClientForm client={client!} />
		</ServerPageCard>
	)
}
