import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shopApi } from "./shopApi.js";
import { useShopStore } from "../zustand/Zustand.jsx";

export const productQueryKey = ["products"];

export function useProducts() {
  const products = useShopStore((state) => state.products);
  return useQuery({
    queryKey: productQueryKey,
    queryFn: shopApi.getProducts,
    initialData: products,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shopApi.createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productQueryKey }),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shopApi.updateProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productQueryKey }),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shopApi.deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productQueryKey }),
  });
}
