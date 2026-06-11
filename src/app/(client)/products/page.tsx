type Props = {
	searchParams: Promise<{ category: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
	const SearchParam = (await searchParams).category
	return <h1>Welcome to Productspage! {SearchParam}</h1>
}
