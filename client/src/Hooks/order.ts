import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { orderData } from "../utils/Types";
import {
  handleCreateOrder,
  handleGetAllOrders,
  handleGetOrderDetails,
  handleGetUserOrders,
  updateOrderToBeDelivered,
  updateOrderToPaid,
} from "../Services/Orders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const useCreateOrder = (token: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: orderData) => handleCreateOrder(data, token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      Swal.fire({
        title: "Order Confirmed Successfully",
        text: "You can track your order status from your profile.",
        icon: "success",
        confirmButtonText: "View My Orders",
      }).then((result) => {
        if(result.isConfirmed) {
            navigate("/profile/orders", {replace : true});
        }
      });

      
    },
  });
  return mutation;
};

export const useGetAllOrders = (token: string) => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: () => handleGetAllOrders(token),
  });
  return query;
};

export const useGetOrderDetails = (id: string, token: string) => {
  const query = useQuery({
    queryKey: ["orders", id],
    queryFn: () => handleGetOrderDetails(id, token),
  });
  return query;
};

export const useGetUserOrders = (token: string) => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: () => handleGetUserOrders(token),
  });
  return query;
};

export const useUpdateOrderToDelivered = (token: string, id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => updateOrderToBeDelivered(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
  return mutation;
};

export const useUpdateOrderToPaid = (token: string, id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => updateOrderToPaid(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
  return mutation;
};
