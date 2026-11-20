import { useDeleteProduct } from "./useProducts.js";

export default function DeleteProductButton({ productId }) {
  const deleteProduct = useDeleteProduct();

  async function handleDelete() {
    if (!window.confirm("Remove this piece from the NAWA collection?")) return;
    try {
      await deleteProduct.mutateAsync(productId);
    } catch {
      window.alert("The product could not be deleted. Please try again.");
    }
  }

  return (
    <button className="round-action round-action--danger" type="button" onClick={handleDelete} disabled={deleteProduct.isPending} aria-label="Delete product">
      <span>{deleteProduct.isPending ? "…" : "×"}</span>
    </button>
  );
}
