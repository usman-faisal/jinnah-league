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

export const addBook = async (formData: FormData) => {
    try {
        const { data } = await api.post("/books", formData, {
            withCredentials: true,
        })
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