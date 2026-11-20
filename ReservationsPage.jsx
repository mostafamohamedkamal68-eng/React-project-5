import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarCheck, CircleX } from "lucide-react";
import ProductImage from "../Product/ProductImage.jsx";
import { useShopStore } from "../zustand/Zustand.jsx";
import { useProducts } from "../Api/useProducts.js";

export default function ReservationsPage() {
  const reservations = useShopStore((state) => state.reservations);
  const cancelReservation = useShopStore((state) => state.cancelReservation);
  const products = useProducts().data || [];

  return (
    <section className="reservation-page">
      <div className="collection-heading">
        <div><span className="section-label">HOLDING YOUR PLACE</span><h1>Pieces on pause.</h1><p>Your reservations stay here while you decide.</p></div>
        <CalendarCheck className="reservation-heading-icon" size={32} />
      </div>
      {!reservations.length ? (
        <div className="cart-empty"><CalendarCheck size={34} /><h2>Nothing on hold right now.</h2><p>Reserve a size from any piece page and find it here.</p><Link className="button button--dark" to="/shop">Browse pieces <ArrowUpRight size={15} /></Link></div>
      ) : (
        <div className="reservation-grid">
          {reservations.map((reservation) => {
            const product = products.find((item) => item.id === reservation.productId);
            if (!product) return null;
            return (
              <article className="reservation-card" key={reservation.id}>
                <Link to={"/products/" + product.id} className="reservation-card__image"><ProductImage product={product} /></Link>
                <div className="reservation-card__body">
                  <span className="section-label">{product.category}</span>
                  <Link to={"/products/" + product.id}><h2>{product.name}</h2></Link>
                  <p>{reservation.size ? "Size " + reservation.size : "One size"} · {reservation.color || "Selected color"}</p>
                  <div className="reservation-card__actions"><Link to={"/products/" + product.id}>View piece <ArrowUpRight size={14} /></Link><button type="button" onClick={() => cancelReservation(reservation.id)}><CircleX size={14} /> Release hold</button></div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
