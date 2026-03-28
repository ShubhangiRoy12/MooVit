import DashboardLayout from "../components/DashboardLayout";
import { dashboardCards } from "../data";

export default function DashboardPage({ themeApi }) {
  return (
    <DashboardLayout themeApi={themeApi}>
      <section className="dashboard-hero">
        <p className="dashboard-kicker">React dashboard</p>
        <h1>Manage the MooVit transport ecosystem from a component-driven control surface.</h1>
        <p>
          The dashboard route now renders from shared React data instead of a large static HTML page. Legacy feature
          modules remain linked while the migration continues incrementally.
        </p>
      </section>

      <section className="dashboard-grid">
        {dashboardCards.map((card) => (
          <a key={card.title} href={card.href} className={`dashboard-card dashboard-card-${card.accent}`}>
            <div className="dashboard-card-top">
              <div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </div>
            <div className="dashboard-card-metrics">
              <span>{card.badge}</span>
              <span>{card.metric}</span>
            </div>
            <div className="dashboard-card-link">Open module</div>
          </a>
        ))}
      </section>
    </DashboardLayout>
  );
}
