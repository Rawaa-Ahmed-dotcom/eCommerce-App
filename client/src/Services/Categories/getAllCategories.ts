import axios from "axios";

export const getAllCategories = async () => {
    try {
        const res  = await axios.get("http://localhost:5000/api/categories");
        const categories = await res.data
        return categories;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message, { cause: err });
        }

        throw new Error("An unknown error occurred while fetching categories.", { cause: err });
    }
}