import { ArrowDownRight, ArrowRight, ArrowUpRight, Leaf, MoveUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductsApi from "./Api/ProductsApi.jsx";

const categories = [
  { name: "T-shirts", no: "01", note: "The everyday layer" },
  { name: "Shirts", no: "02", note: "Easy structure" },
  { name: "Jeans", no: "03", note: "Made to move" },
  { name: "Outerwear", no: "04", note: "A better last layer" },
];

export default function Storefront() {
  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <div className="hero__kicker"><span className="kicker-line" /> THE NAWA UNIFORM / 06</div>
          <h1>Wear what<br />feels like <em>you.</em></h1>
          <p>Thoughtful essentials with a little more character. Designed to move through real life, and made to stay in your rotation.</p>
          <div className="hero__actions">
            <Link className="button button--lime" to="/shop">Explore the collection <ArrowUpRight size={17} /></Link>
            <a className="hero__text-link" href="#the-edit">Discover our point of view <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero__proof"><span>01 / 03</span><i /><span>New season, same good instincts</span></div>
        </div>
        <div className="hero__visual">
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=88" alt="Model wearing a modern neutral outfit" />
          <div className="hero__image-note"><span>NOW IN ROTATION</span><strong>Soft forms.<br />Strong point of view.</strong><Link to="/shop">Shop the edit <ArrowUpRight size={14} /></Link></div>
          <span className="hero__stamp">N<br />—<br />W</span>
        </div>
        <div className="hero__vertical">OBJECTS OF EVERYDAY WEAR · CAIRO / EVERYWHERE</div>
        <div className="hero__grain" />
      </section>

      <div className="ticker" aria-label="NAWA design values">
        <div>GOOD CLOTHES, LONGER <span>✳</span> MADE FOR REAL DAYS <span>✳</span> LESS, BUT BETTER <span>✳</span> GOOD CLOTHES, LONGER <span>✳</span> MADE FOR REAL DAYS <span>✳</span></div>
      </div>

      <section className="category-row">
        <div className="section-intro"><span className="section-label">SHOP BY MOOD</span><h2>Start with a feeling.</h2></div>
        <div className="category-list">
          {categories.map((item) => (
            <Link key={item.no} to={"/shop?category=" + encodeURIComponent(item.name)} className="category-link">
              <span className="category-link__number">{item.no}</span>
              <strong>{item.name}</strong>
              <span className="category-link__note">{item.note}</span>
              <ArrowUpRight className="category-link__arrow" size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="new-in-section" id="new-in">
        <div className="section-heading section-heading--inverse">
          <div><span className="section-label">FRESH FROM THE STUDIO / 06</span><h2>New in, naturally.</h2><p>A small collection of pieces worth getting dressed for.</p></div>
          <Link className="link-arrow" to="/shop">See everything <ArrowRight size={16} /></Link>
        </div>
        <ProductsApi view="home" limit={4} />
      </section>

      <section className="story-section" id="the-edit">
        <div className="story-section__visual">
          <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85" alt="Editorial portrait in a timeless outfit" loading="lazy" />
          <span className="story-section__label">A LITTLE LESS, A LOT MORE YOU</span>
        </div>
        <div className="story-section__copy">
          <span className="section-label">OUR POINT OF VIEW / 01</span>
          <h2>Good style<br />is a <em>quiet</em><br />kind of confidence.</h2>
          <p>NAWA is a wardrobe in progress: familiar shapes, considered details, and room to make them your own. We believe the pieces you reach for most should feel like they already belong to you.</p>
          <Link className="story-link" to="/shop">Find your everyday <MoveUpRight size={17} /></Link>
          <div className="story-footnote"><Leaf size={15} /> Made with intention, chosen to last.</div>
        </div>
        <Sparkles className="story-spark" size={24} />
      </section>

      <section className="closing-cta">
        <span className="section-label">THE LONG GAME LOOKS GOOD</span>
        <h2>Make room for<br /><em>better basics.</em></h2>
        <Link className="button button--dark" to="/shop">Shop all pieces <ArrowUpRight size={16} /></Link>
        <span className="closing-cta__mark">N.</span>
      </section>
    </>
  );
}
