import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import ProductImage from "../Product/ProductImage.jsx";
import { useShopStore } from "../zustand/Zustand.jsx";
import { useProducts } from "../Api/useProducts.js";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);
  const setCartQuantity = useShopStore((state) => state.setCartQuantity);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const checkout = useShopStore((state) => state.checkout);
  const { data: products = [] } = useProducts();
  const [customer, setCustomer] = useState({ name: "", address: "" });
  const [order, setOrder] = useState(null);

  const items = useMemo(() => cart.map((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? { ...product, ...line, cartItemId: line.cartItemId || line.productId + "::" + (line.size || "") + "::" + (line.color || "") } : null;
  }).filter(Boolean), [cart, products]);
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  function submitOrder(event) {
    event.preventDefault();
    setOrder(checkout(customer));
  }

  if (order) {
    return (
      <section className="cart-page order-confirmation">
        <div className="order-confirmation__mark">✓</div>
        <span className="section-label">A GOOD CHOICE</span>
        <h1>Your order is in motion.</h1>
        <p>Thanks, {order.customer.name}. Your demo order number is <strong>{order.id}</strong>.</p>
        <p className="muted-note">This is a preview checkout. No payment was collected.</p>
        <Link className="button button--dark" to="/shop">Back to the collection <ArrowLeft size={16} /></Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="collection-heading">
        <div><span className="section-label">YOUR NAWA BAG / {String(items.length).padStart(2, "0")} PIECES</span><h1>Good things, gathered.</h1><p>Review your pieces before they find their way to you.</p></div>
        <Link className="button button--outline" to="/shop">Keep exploring <ArrowLeft size={15} /></Link>
      </div>

      {!items.length ? (
        <div className="cart-empty"><ShoppingBag size={34} /><h2>Your bag is taking a breather.</h2><p>There is plenty of room for something considered.</p><Link className="button button--dark" to="/shop">Explore the edit <ArrowLeft size={15} /></Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {items.map((item) => (
              <article className="cart-line" key={item.cartItemId}>
                <Link to={"/products/" + item.id} className="cart-line__image"><ProductImage product={item} className="cart-line__photo" /></Link>
                <div className="cart-line__details">
                  <span className="section-label">{item.category}</span>
                  <Link to={"/products/" + item.id}><h2>{item.name}</h2></Link>
                  <p>{item.size ? "Size " + item.size : "One size"}{item.color ? " · " + item.color : ""}</p>
                  <strong>{money.format(item.price)}</strong>
                </div>
                <div className="cart-line__controls">
                  <div className="quantity-stepper" aria-label={"Quantity for " + item.name}>
                    <button type="button" aria-label="Decrease quantity" onClick={() => setCartQuantity(item.cartItemId, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setCartQuantity(item.cartItemId, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                  <button className="remove-line" type="button" onClick={() => removeFromCart(item.cartItemId)}><Trash2 size={14} /> Remove</button>
                </div>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <span className="section-label">THE SMALL PRINT</span>
            <h2>Order summary</h2>
            <div className="summary-row"><span>Pieces ({items.reduce((n, item) => n + item.quantity, 0)})</span><strong>{money.format(total)}</strong></div>
            <div className="summary-row"><span>Delivery</span><strong>{total >= 150 ? "On us" : "$12"}</strong></div>
            <div className="summary-total"><span>Total</span><strong>{money.format(total + (total >= 150 ? 0 : 12))}</strong></div>
            <form className="checkout-form" onSubmit={submitOrder}>
              <label>Your name<input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} required maxLength={80} placeholder="Name for the delivery" /></label>
              <label>Delivery address<textarea value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} required maxLength={240} rows={3} placeholder="Street, area, city" /></label>
              <button className="button button--lime button--full" type="submit">Place a demo order <ArrowLeft size={15} /></button>
              <p className="checkout-note">Secure checkout preview · no payment is collected.</p>
            </form>
          </aside>
        </div>
      )}
    </section>
  );
}
