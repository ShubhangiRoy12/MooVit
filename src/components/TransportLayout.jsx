import { NavLink } from "react-router-dom";
import { navLinks } from "../data";

function ThemeToggle({ themeApi }) {
  const isLight = themeApi.theme === "light";

  return (
    <button
      type="button"
      className="transport-theme-toggle"
      onClick={themeApi.toggleTheme}
      aria-label="Toggle color theme"
      aria-pressed={isLight}
    >
      {isLight ? "Dark mode" : "Light mode"}
    </button>
  );
}

export default function TransportLayout({
  themeApi,
  activePath,
  children,
  footerCta,
  onOpenLogin,
  onOpenSignup,
}) {
  return (
    <div className={`transport-app transport-theme-${themeApi.theme}`}>
      <header className="transport-header">
        <div className="transport-header-inner">
          <NavLink to="/" className="transport-brand">
            <span className="transport-brand-mark">MV</span>
            <span className="transport-brand-text">MooVit</span>
          </NavLink>

          <nav className="transport-nav" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isCurrent = link.href === activePath;
              const isHashRoute = link.href.startsWith("#/");

              if (isHashRoute) {
                const routePath = link.href.replace("#", "");
                return (
                  <NavLink
                    key={link.label}
                    to={routePath}
                    className={({ isActive }) =>
                      isActive || isCurrent ? "transport-link transport-link-active" : "transport-link"
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={isCurrent ? "transport-link transport-link-active" : "transport-link"}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="transport-header-actions">
            <ThemeToggle themeApi={themeApi} />
            <button type="button" className="transport-text-button" onClick={onOpenLogin}>
              Login
            </button>
            <button type="button" className="transport-primary-button" onClick={onOpenSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="transport-footer">
        <div className="transport-footer-grid">
          <section>
            <h3>MooVit</h3>
            <p>
              AI-assisted transport, logistics, safety, and accessibility tools brought together in a single frontend.
            </p>
          </section>
          <section>
            <h3>Quick Links</h3>
            <div className="transport-footer-links">
              <a href="about.html">About</a>
              <a href="services.html">Services</a>
              <a href="contact.html">Contact</a>
              <a href="privacy.html">Privacy</a>
            </div>
          </section>
          <section>
            <h3>Contact</h3>
            <p>shubhangi.23bai11165@vitbhopal.ac.in</p>
            <p>VIT Bhopal, Madhya Pradesh, India</p>
          </section>
        </div>
        <div className="transport-footer-bottom">
          <span>(c) 2026 MooVit</span>
          <span>{footerCta}</span>
        </div>
      </footer>
    </div>
  );
}
