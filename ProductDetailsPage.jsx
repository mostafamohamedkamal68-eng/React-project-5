import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Heart, ShieldCheck, Truck } from "lucide-react";
import ProductImage from "./ProductImage.jsx";
import { useShopStore } from "../zustand/Zustand.jsx";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const defaultSizes = ["S", "M", "L", "XL", "XXL"];
const defaultColors = [
  { name: "Black", hex: "#202020" },
  { name: "White", hex: "#f0eee9" },
  { name: "Navy", hex: "#26354b" },
];

function ProductDetails({ productId }) {
  const navigate = useNavigate();
  const product = useShopStore((state) => state.products.find((item) => item.id === productId));
  const addToCart = useShopStore((state) => state.addToCart);
  const reserveProduct = useShopStore((state) => state.reserveProduct);
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);
  const favorites = useShopStore((state) => state.favorites);
  const sizes = product?.sizes?.length ? product.sizes : product?.category === "Accessories" ? ["One size"] : defaultSizes;
  const colors = product?.colors?.length ? product.colors : defaultColors;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const isFavorite = product ? favorites.includes(product.id) : false;
  const hasSelection = Boolean(selectedSize && selectedColor);

  if (!product) {
    return <div className="product-not-found"><span className="section-label">NOT IN THIS EDIT</span><h1>That piece has moved on.</h1><Link className="button button--dark" to="/shop">Back to the collection</Link></div>;
  }

  const selection = { size: selectedSize, color: selectedColor, quantity };

  function addToBag() {
    if (!hasSelection) return;
    addToCart(product.id, selection);
    setNotice("Added to your bag.");
  }

  function buyNow() {
    if (!hasSelection) return;
    addToCart(product.id, selection);
    navigate("/cart");
  }

  function reserve() {
    if (!hasSelection) return;
    if (reserveProduct(product.id, selection)) setNotice("Your piece is held for you.");
  }

  return (
    <section className="product-detail-page">
      <div className="product-breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/shop">The collection</Link><span>/</span><strong>{product.name}</strong></div>
      <div className="product-detail">
        <div className="product-detail__visual">
          <ProductImage product={product} className="product-detail__image" />
          <span className="product-detail__visual-label">NAWA / PRODUCT NO. {String(product.id).slice(-2)}</span>
        </div>
        <div className="product-detail__info">
          <span className="section-label">{product.category} · {product.collection || "THE NAWA EDIT"}</span>
          <h1>{product.name}</h1>
          <p className="product-rating"><span>★★★★★</span> {product.rating || "5.0"} / 5</p>
          <div className="product-detail__price"><strong>{money.format(product.price)}</strong>{product.originalPrice > product.price && <del>{money.format(product.originalPrice)}</del>}{product.originalPrice > product.price && <span className="sale-pill">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}</div>
          <p className="product-detail__description">{product.description || "A considered everyday piece, made to find its way into your regular rotation."}</p>

          <div className="detail-option">
            <div className="detail-option__title"><span>Choose a color</span><strong>{selectedColor || "Select one"}</strong></div>
            <div className="swatch-list">
              {colors.map((color) => (
                <button key={color.name} type="button" className={"swatch" + (selectedColor === color.name ? " is-selected" : "")} style={{ "--swatch": color.hex }} onClick={() => { setSelectedColor(color.name); setNotice(""); }} aria-label={color.name} aria-pressed={selectedColor === color.name} title={color.name} />
              ))}
            </div>
          </div>

          <div className="detail-option">
            <div className="detail-option__title"><span>Choose a size</span><button className="size-guide-button" type="button" onClick={() => setSizeGuideOpen(true)}>Size notes ↗</button></div>
            <div className="size-list">
              {sizes.map((size) => <button key={size} type="button" className={"size-chip" + (selectedSize === size ? " is-selected" : "")} onClick={() => { setSelectedSize(size); setNotice(""); }} aria-pressed={selectedSize === size}>{size}</button>)}
            </div>
          </div>

          <div className="detail-buy-row">
            <label className="quantity-select">Qty<input type="number" min="1" max="20" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(20, Number(event.target.value) || 1)))} /></label>
            <button className="button button--dark" type="button" disabled={!hasSelection} onClick={addToBag}>Add to bag <ArrowUpRight size={16} /></button>
            <button className={"product-save" + (isFavorite ? " is-saved" : "")} type="button" aria-label="Save piece" aria-pressed={isFavorite} onClick={() => toggleFavorite(product.id)}><Heart size={18} fill={isFavorite ? "currentColor" : "none"} /></button>
          </div>
          <button className="buy-now-button" type="button" disabled={!hasSelection} onClick={buyNow}>Buy now</button>
          <button className="reserve-button" type="button" disabled={!hasSelection} onClick={reserve}>Hold this piece for me</button>
          {notice && <div className="detail-notice" role="status">{notice} {notice.includes("bag") ? <Link to="/cart">Open bag <ArrowLeft size={13} /></Link> : <Link to="/reservations">View hold <ArrowLeft size={13} /></Link>}</div>}
          {!hasSelection && <p className="selection-hint">Choose your size and color to continue.</p>}
          <div className="service-notes"><span><Truck size={16} /> Complimentary delivery over $150</span><span><ShieldCheck size={16} /> A considered checkout, no surprises</span></div>
          <Link className="back-to-shop" to="/shop">← Back to the collection</Link>
        </div>
      </div>

      {sizeGuideOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSizeGuideOpen(false); }}>
          <section className="size-guide-dialog" role="dialog" aria-modal="true" aria-labelledby="size-title">
            <span className="section-label">FIT NOTES</span><button className="modal-close" type="button" onClick={() => setSizeGuideOpen(false)} aria-label="Close">×</button>
            <h2 id="size-title">A little help with fit.</h2><p>Available sizes for {product.name}:</p><div className="size-guide-list">{sizes.map((size) => <span key={size}>{size}</span>)}</div><p className="muted-note">Between sizes? Go one up for a relaxed fit.</p>
          </section>
        </div>
      )}
    </section>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  return <ProductDetails key={id} productId={id} />;
}
