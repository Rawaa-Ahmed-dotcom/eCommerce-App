import {supabase} from "../lib/supabase.js";
export const getAllProducts = async () =>{
    const { data, error } = await supabase.from("products").select();
    if(error) throw error;
    return data;
}
export const getCategoryProducts = async(category:string) => {
    const {data,error} = await supabase.from("products").select("*").eq("cat_prefix",category);
    if(error) throw error;
    return data;
}