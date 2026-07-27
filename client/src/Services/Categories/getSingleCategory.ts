import api from "../../api/config";

export const getSignleCategory = async (slug: string) => {
    if (typeof slug !== "string" || !isNaN(Number(slug)))
        throw new Error("Slug must be string");
    try {
    const res = await api.get(
        `/categories/${slug}`,
    );
    return res.data;
    } catch (err) {
        throw new Error("Failed to fetch category", { cause: err });
    }
};
