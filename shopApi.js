import { useShopStore } from "../zustand/Zustand.jsx";

export const shopApi = {
  async getProducts() {
    return useShopStore.getState().products;
  },
  async createProduct(values) {
    return useShopStore.getState().addProduct(values);
  },
  async updateProduct({ id, values }) {
    useShopStore.getState().updateProduct(id, values);
    return useShopStore.getState().products.find((product) => product.id === id);
  },
  async deleteProduct(id) {
    useShopStore.getState().deleteProduct(id);
    return id;
  },
};
