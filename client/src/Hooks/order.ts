import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { orderData } from "../utils/Types";
import {
  getOrderStatusCounts,
  handleCreateOrder,
  handleGetAllOrders,
  handleGetOrderDetails,
  handleGetUserOrders,
  updateOrderToBeDelivered,
  updateOrderToPaid,
} from "../Services/Orders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: orderData) => handleCreateOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      Swal.fire({
        title: "Order Confirmed Successfully",
        text: "You can track your order status from your profile.",
        icon: "success",
        confirmButtonText: "View My Orders",
      }).then((result) => {
        if(result.isConfirmed) {
            navigate("/profile/ordershistory", {replace : true});
        }
      });

      
    },
  });
  return mutation;
};

export const useGetAllOrders = () => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn:  handleGetAllOrders,
  });
  return query;
};

export const useGetOrderDetails = (id: string, ) => {
  const query = useQuery({
    queryKey: ["orders", id],
    queryFn: () => handleGetOrderDetails(id),
  });
  return query;
};

export const useGetUserOrders = (status: string) => {
  const query = useQuery({
    queryKey: ["orders", status],
    queryFn: () => handleGetUserOrders(status)
  });
  return query;
};

export const useUpdateOrderToDelivered = ( id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => updateOrderToBeDelivered( id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
  return mutation;
};

export const useUpdateOrderToPaid = ( id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => updateOrderToPaid( id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
  return mutation;
};


export const useStatusCounts = () => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: getOrderStatusCounts
  });
  return query;
}