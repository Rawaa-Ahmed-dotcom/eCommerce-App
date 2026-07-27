import api from "../../api/config";
export const getAllCategories = async () => {
    try {
        const res  = await api.get("/categories");
        const categories = await res.data
        return categories;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err);
            throw new Error(err.message, { cause: err });
        }

        throw new Error("An unknown error occurred while fetching categories.", { cause: err });
    }
}