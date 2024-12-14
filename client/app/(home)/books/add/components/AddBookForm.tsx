'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Categories } from "@/lib/data"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { addBook } from "@/API/books.api"

export default function AddBookForm() {
    const [image, setImage] = useState<null | File>(null)
    const [pdf, setPdf] = useState<null | File>(null)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCategory] = useState(Categories[0])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!image || !pdf) {
            toast("Please select both an image and a pdf file")
            return
        }
        const data = new FormData()
        data.append("title", title)
        data.append("author", author)
        data.append("image", image)
        data.append("pdf", pdf)
        data.append("category", category)

        const response = await addBook(data)

        if (!response.success) {
            toast('Something went wrong')
            return;
        }

        toast('Book added successfully')
    }
    return (
        <form className="w-[80%] mx-auto p-8 border flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Author</Label>
                <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select onValueChange={(value) => { setCategory(value) }} value={category}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    <SelectLabel>{category}</SelectLabel>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Image</Label>
                <input type="file" onChange={(e) => setImage((e.target.files as any)[0] ?? null)} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>PDF</Label>
                <input type="file" onChange={(e) => setPdf((e.target.files as any)[0])} />
            </div>
            <div>
                <Button type="submit">Add Book</Button>
            </div>
        </form>
    )
}