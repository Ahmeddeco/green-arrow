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
				bulletList: {
					HTMLAttributes: {
						class: "list-disc pr-6 my-2 space-y-1",
					},
				},
				orderedList: {
					HTMLAttributes: {
						class: "list-decimal pr-6 my-2 space-y-1",
					},
				},
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
			// عند استدعاء هذا الأمر، سيقوم Tiptap تلقائياً بإطلاق حدث onUpdate بالأعلى
			// وبالتالي سيتم تحديث الـ Trigger بشكل غير تزامني وآمن تماماً دون الحاجة لاستدعائه هنا
			editor.commands.setContent(defaultValue)
		}
	}, [defaultValue, editor])

	if (!editor) {
		return (
			<div className="h-[150px] w-full rounded-md border border-input bg-muted/50 animate-pulse flex items-center justify-center text-sm text-muted-foreground">
				جاري تحميل المحرر...
			</div>
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
				className="prose dark:prose-invert max-w-none bg-card text-foreground min-h-[150px]
					[&_.tiptap]:focus:outline-none
					[&_.tiptap_h1]:text-3xl [&_.tiptap_h1]:lg:text-4xl [&_.tiptap_h1]:font-black [&_.tiptap_h1]:mt-6 [&_.tiptap_h1]:mb-4 [&_.tiptap_h1]:text-start
					[&_.tiptap_h2]:text-2xl [&_.tiptap_h2]:lg:text-3xl [&_.tiptap_h2]:font-bold [&_.tiptap_h2]:mt-5 [&_.tiptap_h2]:mb-3 [&_.tiptap_h2]:text-start
					[&_.tiptap_h3]:text-xl [&_.tiptap_h3]:lg:text-2xl [&_.tiptap_h3]:font-semibold [&_.tiptap_h4]:mt-4 [&_.tiptap_h3]:mb-2 [&_.tiptap_h3]:text-start
					[&_.tiptap_h4]:text-lg [&_.tiptap_h4]:lg:text-xl [&_.tiptap_h4]:font-medium [&_.tiptap_h4]:mb-1 [&_.tiptap_h4]:text-start
					[&_.tiptap_h5]:text-base [&_.tiptap_h5]:lg:text-lg [&_.tiptap_h5]:font-normal [&_.tiptap_h5]:mt-2 [&_.tiptap_h5]:mb-1 [&_.tiptap_h5]:text-start
					[&_.tiptap_h6]:text-sm [&_.tiptap_h6]:lg:text-base [&_.tiptap_h6]:font-light [&_.tiptap_h6]:mt-2 [&_.tiptap_h6]:mb-1 [&_.tiptap_h6]:text-start
					[&_.tiptap_p]:text-xs [&_.tiptap_p]:lg:text-sm [&_.tiptap_p]:font-extralight [&_.tiptap_p]:text-muted-foreground [&_.tiptap_p]:leading-relaxed [&_.tiptap_p]:text-start
					[&_.tiptap_blockquote]:border-r-4 [&_.tiptap_blockquote]:border-l-0 [&_.tiptap_blockquote]:border-primary [&_.tiptap_blockquote]:pr-4 [&_.tiptap_blockquote]:italic"
			>
				<EditorContent editor={editor} />
			</div>
		</div>
	)
}
