import { useState } from 'react';
import { BUSINESS, PRODUCTS } from './config.js';
import { Coconut, HalfCoconut, TenderCoconut, HuskPile, PalmScene } from './components/CoconutArt.jsx';
import TapCrack from './components/TapCrack.jsx';
import { isMuted, setMuted } from './crackSound.js';
import FallingCoconut from './components/FallingCoconut.jsx';

function ProductArt({ art }) {
  if (art === 'tender') return <TenderCoconut size={130} />;
  if (art === 'half') return <HalfCoconut size={140} />;
  if (art === 'husk') return <HuskPile size={140} />;
  return <Coconut size={110} />;
}

function SoundToggle() {
  const [off, setOff] = useState(isMuted());
  return (
    <button
      type="button"
      className="sound-toggle"
      aria-pressed={!off}
      onClick={() => { setMuted(!off); setOff(!off); }}
    >
      {off ? 'Sound off' : 'Sound on'}
    </button>
  );
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
        <SoundToggle />
        <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'}>
          <a href="#fresh" onClick={close}>Fresh stock</a>
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
          <p className="hero__hint">Tap anywhere to crack a coconut. Scroll down and watch one drop.</p>
        </div>
        <div className="hero__art">
          <HeroPhoto />
        </div>
      </div>
    </section>
  );
}

function HeroPhoto() {
  const [failed, setFailed] = useState(false);
  if (failed) return <PalmScene className="hero__palm" />;
  return (
    <figure className="hero__photo">
      <img
        src="/media/pollachi-coconut-farm.jpg"
        alt="Tall coconut palms in a sunlit farm in Pollachi"
        width="400"
        height="500"
        onError={() => setFailed(true)}
      />
    </figure>
  );
}

function FreshStock() {
  const tel = `tel:${BUSINESS.phone.replace(/\s/g, '')}`;
  const wa = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hello, I want to know today’s coconut rate.')}`;
  const [videoFailed, setVideoFailed] = useState(false);
  return (
    <section id="fresh" className="fresh">
      <div className="wrap fresh__inner">
        <div className="fresh__media">
          {videoFailed ? (
            <PalmScene className="fresh__fallback" />
          ) : (
            <video
              className="fresh__video"
              src="/media/promo.mp4"
              poster="/media/promo-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              onError={() => setVideoFailed(true)}
            >
              Fresh coconuts available. We buy and sell. Call {BUSINESS.phone}.
            </video>
          )}
        </div>
        <div className="fresh__copy">
          <h2 className="section__title">Fresh coconuts available today</h2>
          <p className="fresh__lead">
            Straight from the farm, ready for pickup or delivery. We sell to shops, hotels and homes,
            and we buy coconuts from farmers at a fair rate.
          </p>
          <div className="fresh__cards">
            <div className="fresh__card">
              <h3>Want to buy?</h3>
              <p>Tender coconuts, mature coconuts and copra in any quantity.</p>
            </div>
            <div className="fresh__card">
              <h3>Want to sell?</h3>
              <p>Farmers, call us with your quantity. We collect from the farm.</p>
            </div>
          </div>
          <a className="fresh__phone" href={tel}>{BUSINESS.phone}</a>
          <div className="fresh__actions">
            <a href={tel} className="btn btn--sun">Call now</a>
            <a href={wa} className="btn btn--wa" target="_blank" rel="noopener">WhatsApp us</a>
          </div>
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
        <FreshStock />
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
      <TapCrack />
    </>
  );
}
