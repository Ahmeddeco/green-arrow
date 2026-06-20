"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toggle } from "@/components/ui/toggle"
import {
	Bold,
	Italic,
	Heading2,
	List,
	ListOrdered,
	Quote,
	Undo,
	Redo,
	Heading,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import { Card, CardHeader, CardTitle } from "../ui/card"

interface TiptapEditorProps {
	name: string
	editorKey?: string
	defaultValue?: string
	onChange?: (value: string) => void
}

export default function TiptapEditor({ name, editorKey, defaultValue = "", onChange }: TiptapEditorProps) {
	const [, setUpdateTrigger] = useState(0)

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { HTMLAttributes: {} },
				bulletList: {},
				orderedList: {},
			}),
		],
		content: defaultValue,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			if (onChange) onChange(html)
			// يتكفل بتحديث التوجلز بأمان عند الكتابة أو عند استدعاء setContent
			setUpdateTrigger((prev) => prev + 1)
		},
		onSelectionUpdate: () => {
			setUpdateTrigger((prev) => prev + 1)
		},
		editorProps: {
			attributes: {
				class: "focus:outline-none min-h-[150px] p-3 text-sm ring-offset-background placeholder:text-muted-foreground",
			},
		},
	})

	// مزامنة القيمة القادمة من الخارج بأمان
	useEffect(() => {
		if (editor && defaultValue !== editor.getHTML()) {
			editor.commands.setContent(defaultValue)
		}
	}, [defaultValue, editor])

	if (!editor) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>جاري تحميل المحرر</CardTitle>
				</CardHeader>
			</Card>
		)
	}

	return (
		<div className="w-full rounded-md border border-input bg-background text-foreground overflow-hidden shadow-sm">
			<input type="hidden" key={editorKey} name={name} value={editor.getHTML()} />

			{/* --------------------------------- Toolbar -------------------------------- */}
			<div className="flex flex-wrap items-center gap-1 p-2 bg-card/95 border-b border-input" dir="rtl">
				<Toggle
					size="sm"
					pressed={editor.isActive("bold")}
					onPressedChange={() => editor.chain().focus().toggleBold().run()}
					aria-label="Toggle bold"
				>
					<Bold />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("italic")}
					onPressedChange={() => editor.chain().focus().toggleItalic().run()}
					aria-label="Toggle italic"
				>
					<Italic />
				</Toggle>

				<Separator orientation="vertical" />

				{/* --------------------------------- Headings -------------------------------- */}
				<Toggle
					size="sm"
					pressed={editor.isActive("heading", { level: 1 })}
					onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					aria-label="Toggle heading 1"
				>
					<Heading />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("heading", { level: 2 })}
					onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					aria-label="Toggle heading 2"
				>
					<Heading2 />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("heading", { level: 3 })}
					onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					aria-label="Toggle heading 3"
				>
					<Heading3 />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("heading", { level: 4 })}
					onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					aria-label="Toggle heading 4"
				>
					<Heading4 />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("heading", { level: 5 })}
					onPressedChange={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
					aria-label="Toggle heading 5"
				>
					<Heading5 />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("heading", { level: 6 })}
					onPressedChange={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
					aria-label="Toggle heading 6"
				>
					<Heading6 />
				</Toggle>

				<Separator orientation="vertical" />

				{/* --------------------------- Lists & Formats --------------------------- */}
				<Toggle
					size="sm"
					pressed={editor.isActive("bulletList")}
					onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
					aria-label="Toggle bullet list"
				>
					<List />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("orderedList")}
					onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
					aria-label="Toggle ordered list"
				>
					<ListOrdered />
				</Toggle>

				<Toggle
					size="sm"
					pressed={editor.isActive("blockquote")}
					onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
					aria-label="Toggle blockquote"
				>
					<Quote />
				</Toggle>

				<Separator orientation="vertical" />

				{/* --------------------------------- History -------------------------------- */}
				<Toggle
					size="sm"
					disabled={!editor.can().undo()}
					onPressedChange={() => editor.chain().focus().undo().run()}
					aria-label="Undo"
				>
					<Undo />
				</Toggle>

				<Toggle
					size="sm"
					disabled={!editor.can().redo()}
					onPressedChange={() => editor.chain().focus().redo().run()}
					aria-label="Redo"
				>
					<Redo />
				</Toggle>
			</div>

			{/* --------------------------- Workspace Container --------------------------- */}
			<div
				dir="rtl"
				className="prose dark:prose-invert max-w-none bg-card text-foreground min-h-[100px] p-3 focus-within:outline-none"
			>
				<EditorContent editor={editor} />
			</div>
		</div>
	)
}
