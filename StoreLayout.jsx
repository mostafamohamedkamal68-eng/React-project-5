import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ArrowUpRight, Heart, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useShopStore } from "./zustand/Zustand.jsx";

export default function StoreLayout() {
  const navigate = useNavigate();
  const cart = useShopStore((state) => state.cart);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  function handleSearch(event) {
    event.preventDefault();
    const value = search.trim();
    navigate(value ? "/shop?q=" + encodeURIComponent(value) : "/shop");
    setMenuOpen(false);
  }

  return (
    <div className="nawa-site">
      <div className="announcement-bar">
        <span>Complimentary delivery on orders over $150</span>
        <span className="announcement-bar__right">Thoughtfully made. Worn on repeat. <ArrowUpRight size={13} /></span>
      </div>
      <header className="site-header">
        <button className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link className="brand-lockup" to="/" aria-label="NAWA home">
          <span className="brand-lockup__mark">N</span>
          <span><strong>NAWA</strong><small>DAILY FORM, REFINED</small></span>
        </Link>
        <nav className={"main-nav" + (menuOpen ? " main-nav--open" : "")} aria-label="Main navigation">
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <a href="/#new-in" onClick={() => setMenuOpen(false)}>New in</a>
          <a href="/#the-edit" onClick={() => setMenuOpen(false)}>The edit</a>
          <NavLink to="/admin/products" onClick={() => setMenuOpen(false)}>Studio</NavLink>
        </nav>
        <div className="header-tools">
          <form className={"header-search" + (searchOpen ? " header-search--open" : "")} onSubmit={handleSearch}>
            <button className="header-search__trigger" type="button" aria-label="Open search" onClick={() => setSearchOpen((open) => !open)}><Search size={16} /></button>
            <input aria-label="Search products" placeholder="Search the edit" value={search} onChange={(event) => setSearch(event.target.value)} />
          </form>
          <Link className="header-icon" to="/favorites" aria-label="Saved pieces"><Heart size={18} /></Link>
          <Link className="header-cart" to="/cart" aria-label={"Bag with " + cartCount + " items"}>
            <ShoppingBag size={18} /><span>Bag</span><b>{cartCount}</b>
          </Link>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="site-footer">
        <div className="site-footer__main">
          <div>
            <Link className="brand-lockup brand-lockup--footer" to="/">
              <span className="brand-lockup__mark">N</span>
              <span><strong>NAWA</strong><small>DAILY FORM, REFINED</small></span>
            </Link>
            <p>Considered pieces for the everyday. Less noise, better things, made to stay in rotation.</p>
          </div>
          <div className="site-footer__links">
            <div><strong>Explore</strong><Link to="/shop">Shop all</Link><Link to="/favorites">Saved pieces</Link><Link to="/reservations">Reservations</Link></div>
            <div><strong>Studio</strong><Link to="/admin/products">Manage collection</Link><a href="mailto:hello@nawa.studio">Contact</a><a href="/#the-edit">Our approach</a></div>
          </div>
        </div>
        <div className="site-footer__bottom"><span>© 2026 NAWA Studio</span><span>Designed for a longer wardrobe.</span><span>Instagram ↗</span></div>
      </footer>
    </div>
  );
}
