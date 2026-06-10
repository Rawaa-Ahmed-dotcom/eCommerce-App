import axios from "axios";
import type { RegisterForm } from "../utils/Types";

export const handleRegister = async (data: RegisterForm) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      data,
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errorMessage: string = err.response?.data?.msg;
    const fallbackError: string = "UnExpected Error!";

    throw new Error(errorMessage || fallbackError , {cause : err});
  }
};
