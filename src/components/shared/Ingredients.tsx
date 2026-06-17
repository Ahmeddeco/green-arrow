"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { splitItems } from "@/logic/splitThings"

type Props = {
	dbIngredients?: string[]
	label?: string
	initialValue?: string
	name: string
	key: string | undefined
	errors: string[] | undefined
}

export default function Ingredients({ errors, key, name, initialValue, dbIngredients, label = "Ingredients" }: Props) {
	const [ingredients, setIngredients] = useState<string[]>(dbIngredients || [""])
	// const dbSplittedIngrediants = splitItems(ingredients)
	function handleAdd() {
		console.log("add pressed!")
	}

	return (
		<Card className="w-full">
			<CardContent>{ingredients.length > 0 && ingredients.join(", ")}</CardContent>
			<CardFooter>
				<Field>
					<FieldLabel htmlFor={name}>{label}</FieldLabel>
					<div className="flex items-center gap-4">
						<Input type="text" key={key} name={name} defaultValue={initialValue} value={ingredients ?? ""} />
						<Button type="button" size={"lg"} onClick={handleAdd}>
							add
						</Button>
					</div>
					<FieldError>{errors}</FieldError>
				</Field>
			</CardFooter>
		</Card>
	)
}
