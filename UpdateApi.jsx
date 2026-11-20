import { useState } from "react";
import { useUpdateProduct } from "./useProducts.js";

export default function UpdateProductForm({ product: originalProduct, onCancel, onDone }) {
  const updateProduct = useUpdateProduct();
  const [product, setProduct] = useState(originalProduct);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await updateProduct.mutateAsync({ id: originalProduct.id, values: product });
      onDone?.();
    } catch (mutationError) {
      setError(mutationError.message);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>Piece name<input name="name" value={product.name} onChange={handleChange} required maxLength={80} /></label>
      <div className="product-form__row">
        <label>Category
          <select name="category" value={product.category} onChange={handleChange}>
            {["T-shirts", "Graphic Tees", "Shirts", "Jeans", "Shoes", "Knitwear", "Outerwear", "Accessories", "Dresses", "Skirts", "Blazers", "Activewear", "Loungewear", "Jumpsuits", "Coats"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>Collection
          <select name="collection" value={product.collection || "New Arrivals"} onChange={handleChange}>
            <option>New Arrivals</option><option>Top Selling</option>
          </select>
        </label>
      </div>
      <div className="product-form__row">
        <label>Price (USD)<input name="price" type="number" value={product.price} onChange={handleChange} min="1" step="1" required /></label>
        <label>Previous price<input name="originalPrice" type="number" value={product.originalPrice ?? ""} onChange={handleChange} min="0" step="1" /></label>
      </div>
      <label>Image URL<input name="image" type="url" value={product.image ?? ""} onChange={handleChange} placeholder="https://…" /></label>
      <label>Short description<textarea name="description" value={product.description ?? ""} onChange={handleChange} rows="3" maxLength="240" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="product-form__actions">
        <button className="button button--dark" type="submit" disabled={updateProduct.isPending}>{updateProduct.isPending ? "Saving…" : "Save changes"}</button>
        <button className="button button--light" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
