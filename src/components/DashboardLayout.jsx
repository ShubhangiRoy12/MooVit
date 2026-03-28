import { NavLink } from "react-router-dom";

function DashboardThemeToggle({ themeApi }) {
  return (
    <button type="button" className="dashboard-theme-toggle" onClick={themeApi.toggleTheme}>
      {themeApi.theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}

export default function DashboardLayout({ themeApi, children }) {
  return (
    <div className={`dashboard-page dashboard-theme-${themeApi.theme}`}>
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <NavLink to="/" className="dashboard-brand">
            <span className="dashboard-brand-badge">MV</span>
            <span>MooVit Dashboard</span>
          </NavLink>
          <nav className="dashboard-nav" aria-label="Dashboard navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/feedback">Feedback</NavLink>
            <a href="login.html">Logout</a>
            <DashboardThemeToggle themeApi={themeApi} />
          </nav>
        </div>
      </header>

      <main className="dashboard-main">{children}</main>

      <footer className="dashboard-footer">
        <div className="dashboard-footer-grid">
          <section>
            <h3>MooVit Transport</h3>
            <p>
              A React-based control surface for the project's transport, mobility, safety, and accessibility modules.
            </p>
          </section>
          <section>
            <h3>Explore</h3>
            <a href="about.html">About</a>
            <a href="services.html">Services</a>
            <a href="privacy.html">Privacy</a>
          </section>
          <section>
            <h3>Community</h3>
            <a href="https://github.com/ShubhangiRoy12">GitHub</a>
            <a href="https://www.linkedin.com/in/shubhangi-roy-762a3427a/">LinkedIn</a>
          </section>
        </div>
        <p className="dashboard-footer-note">(c) 2026 MooVit. Connecting mobility, safety, and accessibility.</p>
      </footer>
    </div>
  );
}
