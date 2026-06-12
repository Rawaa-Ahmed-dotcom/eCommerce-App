
import type { AppDispatch } from "../store";
import { setPage } from "../store/features/productSlice";
import Swal from "sweetalert2";

import { type MutateFunction } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";

export const handlePages = (
  numberOfPages: number,
  page: number,
  dispatch: AppDispatch,
) => {
  return Array.from({ length: numberOfPages }, (_, index) => {
    const pageNumber = index + 1;

    return (
      <button
        key={pageNumber}
        className={`${pageNumber === page ? "bg-[#416465] text-white" : "bg-transparent text-[#131D21]"} cursor-pointer  w-10 h-10 rounded-lg  font-bold font-[Inter] text-[1em] flex items-center justify-center`}
        onClick={() => dispatch(setPage(pageNumber))}
      >
        {pageNumber}
      </button>
    );
  });
};

export function submit<T> (
  data: T,
  mutate: MutateFunction<{ accessToken: string; msg: string }, unknown, T, unknown>,
  navigate : NavigateFunction
)  {
  mutate(data, {
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      Swal.fire({
        title: "Success!",
        text: response.msg,
        icon: "success",
        confirmButtonText: "Ok",
      });
      if(response.msg === "Valid Credentials!") {
        navigate("/");
      }else if(response.msg === "User Created Successfully") {
        navigate("/auth/login");
      }
    },
  });
};