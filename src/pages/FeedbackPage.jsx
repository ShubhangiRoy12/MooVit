import { useState } from "react";
import AuthModalLayer from "../components/AuthModalLayer";
import TransportLayout from "../components/TransportLayout";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function FeedbackPage({ themeApi }) {
  const [modal, setModal] = useState(null);
  const [formValues, setFormValues] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setFormValues(initialForm);
  }

  return (
    <>
      <TransportLayout
        themeApi={themeApi}
        activePath="#/feedback"
        footerCta="Feedback route migrated to React with local state management."
        onOpenLogin={() => setModal("login")}
        onOpenSignup={() => setModal("signup")}
      >
        <section className="transport-feedback-shell">
          <div className="transport-section-heading transport-section-heading-center">
            <p className="transport-eyebrow">Feedback</p>
            <h1>Share suggestions, report issues, or tell us what should improve next.</h1>
            <p className="transport-hero-text">
              This page now uses a React-managed form and success state instead of inline scripts and duplicated modal
              markup.
            </p>
          </div>

          <form className="transport-feedback-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formValues.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formValues.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Write your feedback here..."
              value={formValues.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="transport-primary-button">
              Submit feedback
            </button>
          </form>

          {submitted && (
            <div className="transport-feedback-success" role="status">
              <strong>Thank you.</strong>
              <span>Your feedback has been recorded in the new React flow.</span>
            </div>
          )}
        </section>
      </TransportLayout>
      <AuthModalLayer modal={modal} onClose={() => setModal(null)} onSwitch={setModal} />
    </>
  );
}
