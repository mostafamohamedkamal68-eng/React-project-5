import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Pencil, Plus, Trash2 } from "lucide-react";
import ProductImage from "../Product/ProductImage.jsx";
import AddProductForm from "./AddApi.jsx";
import DeleteProductButton from "./DeleteApi.jsx";
import UpdateProductForm from "./UpdateApi.jsx";
import { useShopStore } from "../zustand/Zustand.jsx";
import { useProducts } from "./useProducts.js";

const categories = ["T-shirts", "Graphic Tees", "Shirts", "Jeans", "Shoes", "Knitwear", "Outerwear", "Accessories", "Dresses", "Skirts", "Blazers", "Activewear", "Loungewear", "Jumpsuits", "Coats"];
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function ProductCard({ product, isFavorite, isManaging, onEdit }) {
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);
  const path = "/products/" + product.id;

  return (
    <article className="nawa-product-card">
      <div className="nawa-product-card__visual">
        <Link to={path} className="nawa-product-card__image-link" aria-label={"View " + product.name}>
          <ProductImage product={product} className="nawa-product-card__image" />
        </Link>
        <span className="nawa-product-card__tag">{product.collection === "Top Selling" ? "NAWA FAVOURITE" : "JUST LANDED"}</span>
        <button className={"nawa-heart" + (isFavorite ? " is-saved" : "")} type="button" onClick={() => toggleFavorite(product.id)} aria-label={isFavorite ? "Remove from saved pieces" : "Save this piece"} aria-pressed={isFavorite}>
          <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        {product.originalPrice > product.price && <span className="nawa-product-card__sale">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
      </div>
      <div className="nawa-product-card__details">
        <div className="nawa-product-card__line"><span>{product.category}</span><span className="nawa-rating">★ {product.rating || "5.0"}</span></div>
        <Link to={path}><h3>{product.name}</h3></Link>
        <div className="nawa-product-card__bottom">
          <div className="nawa-price"><strong>{money.format(Number(product.price) || 0)}</strong>{product.originalPrice > product.price && <del>{money.format(product.originalPrice)}</del>}</div>
          {isManaging ? (
            <div className="nawa-manage-actions">
              <button className="round-action" type="button" onClick={onEdit} aria-label="Edit product"><Pencil size={15} /></button>
              <DeleteProductButton productId={product.id} />
            </div>
          ) : (
            <Link className="nawa-add-link" to={path}>Choose <ArrowUpRight size={14} /></Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProductsApi({ view = "all", query = "", category = "", limit }) {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const favorites = useShopStore((state) => state.favorites);
  const [activeCategory, setActiveCategory] = useState(category || "All");
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    setActiveCategory(category || "All");
  }, [category]);

  const filterCategories = useMemo(
    () => ["All", ...new Set([...categories, ...products.map((product) => product.category)])],
    [products],
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    let result = products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesFavorite = view !== "favorites" || favorites.includes(product.id);
      const matchesQuery = !normalizedQuery || [product.name, product.category, product.description]
        .some((value) => String(value || "").toLowerCase().includes(normalizedQuery));
      const matchesCollection = view !== "home" || product.collection === "New Arrivals";
      return matchesCategory && matchesFavorite && matchesQuery && matchesCollection;
    });
    if (Number.isFinite(limit)) result = result.slice(0, limit);
    return result;
  }, [activeCategory, favorites, limit, products, query, view]);

  const isManaging = view === "manage";
  const isHome = view === "home";
  const title = view === "favorites"
    ? "Saved for later"
    : isManaging
      ? "The product studio"
      : query.trim()
        ? "A good match for “" + query.trim() + "”"
        : view === "favorites"
          ? "Saved pieces"
          : "The full collection";

  function renderProducts(items) {
    return items.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        isFavorite={favorites.includes(product.id)}
        isManaging={isManaging}
        onEdit={() => setEditingProduct(product)}
      />
    ));
  }

  return (
    <section className={"nawa-products" + (isHome ? " nawa-products--home" : "")} aria-labelledby="products-title">
      {!isHome && (
        <div className="collection-heading">
          <div>
            <span className="section-label">{isManaging ? "NAWA / BACK OFFICE" : view === "favorites" ? "YOUR PERSONAL EDIT" : "CLOTHES FOR THE LONG RUN"}</span>
            <h1 id="products-title">{title}</h1>
            <p>{isManaging ? "Keep the collection considered. Add, edit, or remove a piece." : view === "favorites" ? "Everything you have your eye on, all in one place." : "Easy pieces, thoughtful details, and room to make them yours."}</p>
          </div>
          <div className="collection-heading__actions">
            {isManaging && <button className="button button--lime" type="button" onClick={() => setAddingProduct(true)}><Plus size={16} /> Add a piece</button>}
            {isManaging ? <Link className="button button--outline" to="/shop">View storefront</Link> : <span className="item-count">{visibleProducts.length.toString().padStart(2, "0")} PIECES</span>}
          </div>
        </div>
      )}

      {view !== "favorites" && !isHome && !isManaging && (
        <div className="nawa-category-filters" aria-label="Filter by category">
          {filterCategories.map((item) => (
            <button key={item} type="button" className={activeCategory === item ? "is-active" : ""} onClick={() => setActiveCategory(item)}>{item}</button>
          ))}
        </div>
      )}

      {isError && <div className="inline-error" role="alert">{error.message}</div>}
      {isLoading ? <div className="collection-empty">Loading the collection…</div> : (
        <div className={"nawa-product-grid" + (isHome ? " nawa-product-grid--home" : "")}>
          {renderProducts(visibleProducts)}
          {!visibleProducts.length && <div className="collection-empty">{view === "favorites" ? "No saved pieces yet. Tap the heart on anything you like." : query ? "No pieces found. Try a different search." : "There are no pieces in this edit yet."}</div>}
        </div>
      )}

      {(addingProduct || editingProduct) && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) { setAddingProduct(false); setEditingProduct(null); }
        }}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
            <div className="product-modal__heading">
              <div><span className="section-label">NAWA / STUDIO</span><h2 id="product-modal-title">{editingProduct ? "Edit this piece" : "Add a new piece"}</h2></div>
              <button className="modal-close" type="button" aria-label="Close product form" onClick={() => { setAddingProduct(false); setEditingProduct(null); }}>×</button>
            </div>
            {editingProduct ? (
              <UpdateProductForm key={editingProduct.id} product={editingProduct} onCancel={() => setEditingProduct(null)} onDone={() => setEditingProduct(null)} />
            ) : (
              <AddProductForm onCancel={() => setAddingProduct(false)} onDone={() => setAddingProduct(false)} />
            )}
          </section>
        </div>
      )}
    </section>
  );
}
