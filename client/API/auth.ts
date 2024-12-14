import api from "./middleware";

export const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: string;
}) => {
    try {
        const response = await api.post('auth/register', userData);
        return response.data;
    }
    catch (error) {
        throw new Error("An error occured during the registration");
    }
}

export const loginUser = async (userData: {
    email: string;
    password: string;
}) => {
    try {
        const response = await api.post('auth/login', userData);
        return response.data;
    }
    catch (error) {
        throw new Error("An error occured during the registration");
    }
}

export const getUser = async () => {
    const { data } = await api.get('auth/current-user', {
        withCredentials: true
    });
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
}