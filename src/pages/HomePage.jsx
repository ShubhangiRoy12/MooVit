import { useState } from "react";
import AuthModalLayer from "../components/AuthModalLayer";
import TransportLayout from "../components/TransportLayout";
import { brandLogos, premiumServices } from "../data";

export default function HomePage({ themeApi }) {
  const [modal, setModal] = useState(null);

  return (
    <>
      <TransportLayout
        themeApi={themeApi}
        activePath="#/"
        footerCta="Built with React for a more maintainable frontend."
        onOpenLogin={() => setModal("login")}
        onOpenSignup={() => setModal("signup")}
      >
        <section className="transport-hero">
          <div className="transport-hero-copy">
            <p className="transport-eyebrow">React migration in progress</p>
            <h1>Transport intelligence, safety tools, and logistics workflows in one frontend.</h1>
            <p className="transport-hero-text">
              MooVit now starts from a React app shell so shared UI can be reused instead of duplicated across static
              pages. The landing, dashboard, and feedback experiences are now component-based routes.
            </p>
            <div className="transport-hero-actions">
              <button type="button" className="transport-primary-button" onClick={() => setModal("signup")}>
                Get Started
              </button>
              <a href="#/dashboard" className="transport-secondary-button">
                Open Dashboard
              </a>
            </div>
          </div>
          <div className="transport-hero-panel">
            <div className="transport-stat-card">
              <span>Modules Connected</span>
              <strong>12</strong>
            </div>
            <div className="transport-stat-card">
              <span>Shared UI Components</span>
              <strong>8</strong>
            </div>
            <div className="transport-stat-card">
              <span>Frontend Theme Modes</span>
              <strong>2</strong>
            </div>
          </div>
        </section>

        <section className="transport-brand-strip">
          <p>Trusted by modern mobility teams</p>
          <div className="transport-brand-grid">
            {brandLogos.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </section>

        <section className="transport-services">
          <div className="transport-section-heading">
            <p className="transport-eyebrow">Services</p>
            <h2>Reusable service cards instead of hand-maintained HTML duplicates.</h2>
          </div>
          <div className="transport-service-grid">
            {premiumServices.map((service) => (
              <article key={service.title} className="transport-service-card">
                <div className="transport-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>
      </TransportLayout>
      <AuthModalLayer modal={modal} onClose={() => setModal(null)} onSwitch={setModal} />
    </>
  );
}
