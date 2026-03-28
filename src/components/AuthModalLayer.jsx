const defaultMessages = {
  login: {
    title: "Login",
    description: "Access your dashboard and continue tracking transport activity.",
    action: "Login",
  },
  signup: {
    title: "Create account",
    description: "Join MooVit to start using transport, safety, and accessibility tools.",
    action: "Create account",
  },
};

export default function AuthModalLayer({ modal, onClose, onSwitch }) {
  if (!modal) {
    return null;
  }

  const content = defaultMessages[modal];

  return (
    <div className="transport-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="transport-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transport-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="transport-modal-close" onClick={onClose} aria-label="Close dialog">
          x
        </button>
        <h2 id="transport-modal-title">{content.title}</h2>
        <p>{content.description}</p>
        <form className="transport-modal-form" onSubmit={(event) => event.preventDefault()}>
          {modal === "signup" && <input type="text" placeholder="Full name" required />}
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          {modal === "signup" && <input type="password" placeholder="Confirm password" required />}
          <button type="submit" className="transport-primary-button">
            {content.action}
          </button>
        </form>
        <div className="transport-modal-switch">
          {modal === "login" ? (
            <button type="button" onClick={() => onSwitch("signup")}>
              Need an account?
            </button>
          ) : (
            <button type="button" onClick={() => onSwitch("login")}>
              Already registered?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
