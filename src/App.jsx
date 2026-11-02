import { useState } from 'react';
import { BUSINESS, PRODUCTS } from './config.js';
import { Coconut, HalfCoconut, TenderCoconut, PalmScene } from './components/CoconutArt.jsx';
import FallingCoconut from './components/FallingCoconut.jsx';

function ProductArt({ art }) {
  if (art === 'tender') return <TenderCoconut size={120} />;
  if (art === 'half') return <HalfCoconut size={140} />;
  if (art === 'husk')
    return (
      <svg width="130" height="110" viewBox="0 0 130 110" aria-hidden="true">
        <path d="M10 90 C 30 40, 60 30, 70 20 C 80 40, 110 60, 120 90 Z" fill="#B68552" />
        <g stroke="#7A4E24" strokeWidth="2.5" strokeLinecap="round">
          <path d="M30 86 C 40 60, 55 45, 66 30" /><path d="M48 88 C 56 64, 64 50, 70 34" />
          <path d="M66 88 C 70 66, 74 52, 74 36" /><path d="M86 88 C 84 66, 80 52, 76 38" />
          <path d="M104 88 C 96 68, 88 54, 80 40" />
        </g>
      </svg>
    );
  return <Coconut size={110} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a href="#top" className="brand" onClick={close}>
          <Coconut size={40} />
          <span>
            <strong>Mummorthy</strong>
            <small>Coconut Traders</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'}>
          <a href="#products" onClick={close}>Products</a>
          <a href="#why" onClick={close}>Why us</a>
          <a href="#order" onClick={close}>How to order</a>
          <a href="#contact" className="btn btn--dark" onClick={close}>Get a quote</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">Wholesale &amp; retail coconut supply in {BUSINESS.town}</p>
          <h1>Coconuts, fresh off the palm.</h1>
          <p className="hero__lead">
            Tender coconuts, mature coconuts and copra for shops, hotels, oil mills and households.
            Graded, fairly weighed and delivered on time.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--sun">Request today’s price</a>
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="btn btn--ghost">Call {BUSINESS.phone}</a>
          </div>
          <p className="hero__hint">Scroll down — one of our coconuts is about to drop.</p>
        </div>
        <div className="hero__art">
          <PalmScene className="hero__palm" />
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="section">
      <div className="wrap">
        <h2 className="section__title">Every kind of coconut your business needs</h2>
        <div className="products">
          {PRODUCTS.map((p) => (
            <article key={p.id} className={`product product--${p.id}`}>
              <div className="product__art"><ProductArt art={p.art} /></div>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <p className="product__price">{p.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    ['Direct from farms', `We buy straight from growers in ${BUSINESS.region}, so nuts reach you fresh.`],
    ['Graded by size', 'Choose the grade you need. Every load is sorted before it leaves the yard.'],
    ['Bulk or small orders', 'From a few dozen nuts to full truck loads.'],
    ['Delivery available', `Door delivery across ${BUSINESS.deliveryArea}, or pick up from our yard.`],
  ];
  return (
    <section id="why" className="section section--husk">
      <div className="wrap why">
        <div className="why__intro">
          <h2 className="section__title">Honest weight. Steady supply. Fair price.</h2>
          <p>Serving customers since {BUSINESS.since}. Ask any of our regular buyers — we weigh in front of you.</p>
          <HalfCoconut size={220} className="why__art" />
        </div>
        <ul className="why__list">
          {points.map(([h, t]) => (
            <li key={h}>
              <h3>{h}</h3>
              <p>{t}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowToOrder() {
  const steps = [
    ['Call or WhatsApp us', 'Tell us the product, grade and quantity you need.'],
    ['Get today’s rate', 'Coconut prices change daily, so we confirm the current rate before you order.'],
    ['Pickup or delivery', 'Collect from our yard or have it delivered to your door.'],
  ];
  return (
    <section id="order" className="section">
      <div className="wrap">
        <h2 className="section__title section__title--center">Ordering is simple</h2>
        <ol className="steps">
          {steps.map(([h, t], i) => (
            <li key={h}>
              <span className="steps__num">{i + 1}</span>
              <h3>{h}</h3>
              <p>{t}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', product: PRODUCTS[0].name, details: '' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const send = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Add your name and phone number so we can call you back.');
      return;
    }
    setError('');
    const msg =
      `Hello ${BUSINESS.name},%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Product: ${encodeURIComponent(form.product)}%0A` +
      `Details: ${encodeURIComponent(form.details)}`;
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${msg}`, '_blank', 'noopener');
  };

  return (
    <section id="contact" className="contact">
      <div className="wrap contact__inner">
        <div className="contact__info">
          <h2 className="section__title">Get a quote today</h2>
          <p>Send us your requirement on WhatsApp and we’ll reply with today’s best price.</p>
          <dl>
            <dt>Phone / WhatsApp</dt><dd><a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}>{BUSINESS.phone}</a></dd>
            <dt>Email</dt><dd><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></dd>
            <dt>Yard</dt><dd>{BUSINESS.address}</dd>
            <dt>Open</dt><dd>{BUSINESS.hours}</dd>
          </dl>
        </div>
        <form className="quote" onSubmit={send} noValidate>
          <label htmlFor="q-name">Your name</label>
          <input id="q-name" value={form.name} onChange={set('name')} autoComplete="name" />
          <label htmlFor="q-phone">Phone number</label>
          <input id="q-phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
          <label htmlFor="q-product">Product</label>
          <select id="q-product" value={form.product} onChange={set('product')}>
            {PRODUCTS.map((p) => <option key={p.id}>{p.name}</option>)}
          </select>
          <label htmlFor="q-details">Quantity and delivery location</label>
          <textarea id="q-details" rows="3" value={form.details} onChange={set('details')} />
          {error && <p className="quote__error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--husk">Send enquiry on WhatsApp</button>
        </form>
      </div>
      <div className="landing-pile" aria-hidden="true">
        <Coconut size={64} /><Coconut size={80} /><Coconut size={58} />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a href="#products" className="skip-link">Skip to products</a>
      <Header />
      <main>
        <Hero />
        <Products />
        <WhyUs />
        <HowToOrder />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <p>© {new Date().getFullYear()} {BUSINESS.name}</p>
          <p>{BUSINESS.town}</p>
        </div>
      </footer>
      <FallingCoconut />
    </>
  );
}
