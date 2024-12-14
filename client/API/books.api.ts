import api from "./middleware";

export const getAllBooks = async () => {
    try {
        const { data } = await api.get("/")
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