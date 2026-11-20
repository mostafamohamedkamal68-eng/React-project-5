import { useState } from "react";
import { useCreateProduct } from "./useProducts.js";

const emptyProduct = {
  name: "",
  category: "T-shirts",
  collection: "New Arrivals",
  price: "",
  originalPrice: "",
  image: "",
  description: "",
};

export default function AddProductForm({ onCancel, onDone }) {
  const createProduct = useCreateProduct();
  const [product, setProduct] = useState(emptyProduct);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await createProduct.mutateAsync(product);
      setProduct(emptyProduct);
      onDone?.();
    } catch (mutationError) {
      setError(mutationError.message);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>Piece name<input name="name" value={product.name} onChange={handleChange} required maxLength={80} placeholder="e.g. The weekend shirt" /></label>
      <div className="product-form__row">
        <label>Category
          <select name="category" value={product.category} onChange={handleChange}>
            {["T-shirts", "Graphic Tees", "Shirts", "Jeans", "Shoes", "Knitwear", "Outerwear", "Accessories", "Dresses", "Skirts", "Blazers", "Activewear", "Loungewear", "Jumpsuits", "Coats"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>Collection
          <select name="collection" value={product.collection} onChange={handleChange}>
            <option>New Arrivals</option><option>Top Selling</option>
          </select>
        </label>
      </div>
      <div className="product-form__row">
        <label>Price (USD)<input name="price" type="number" value={product.price} onChange={handleChange} min="1" step="1" required /></label>
        <label>Previous price (optional)<input name="originalPrice" type="number" value={product.originalPrice} onChange={handleChange} min="0" step="1" /></label>
      </div>
      <label>Image URL<input name="image" type="url" value={product.image} onChange={handleChange} placeholder="https://…" /></label>
      <label>Short description<textarea name="description" value={product.description} onChange={handleChange} rows="3" maxLength="240" placeholder="What makes this piece worth keeping?" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="product-form__actions">
        <button className="button button--dark" type="submit" disabled={createProduct.isPending}>{createProduct.isPending ? "Saving…" : "Add to collection"}</button>
        <button className="button button--light" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
