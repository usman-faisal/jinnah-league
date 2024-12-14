import { AddBookData } from "@/types/type";
import api from "./middleware";

export const getAllBooks = async () => {
    try {
        const { data } = await api.get("/books")
        if (data.success) {
            return {
                success: true,
                data: data.data
            }
        }

        return {
            success: false,
            data: "Something went wrong"
        }
    } catch (err) {
        return {
            success: false,
            data: "Something went wrong"
        }
    }
}

export const addBook = async(bookData: AddBookData) => {
    try {
        const { data } = await api.post("/books", {...bookData})
        console.log(data)
        if (data.success) {
            return {
                success: true,
                data: data.data
            }
        }
        return {
            success: false,
            data: "Something went wrong"
        }
    } catch (err) {
        return {
            success: false,
            data: "Something went wrong"
        }
    }
}