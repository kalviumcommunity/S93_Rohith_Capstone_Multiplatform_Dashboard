import "./GoogleLogin.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { API_URL } from "../config/api";

function GoogleLoginPage({ onLogin }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      setError("");

      const result = await fetch(
        `${API_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: response.credential,
          }),
        }
      );

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || "Google login failed");
      }

      localStorage.setItem("authToken", data.token);
      onLogin(data.user);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Could not connect to the server. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-login-page">
      <section className="login-showcase">
        <a className="login-brand" href="/" aria-label="Socially home">
          <span className="login-brand-mark">S</span>
          socially
        </a>
        <div className="login-showcase-copy">
          <p className="login-kicker">THE CREATOR WORKSPACE</p>
          <h1>Your social presence, in one clear view.</h1>
          <p>
            Bring your channels together and get a more focused look at your
            content performance.
          </p>
          <div className="login-feature">
            <span className="login-feature-mark">↗</span>
            <span>
              <strong>See the bigger picture</strong>
              <small>Keep your audience and activity in view.</small>
            </span>
          </div>
          <div className="login-decoration" aria-hidden="true">
            <span className="decoration-orbit orbit-one" />
            <span className="decoration-orbit orbit-two" />
            <span className="decoration-orbit orbit-three" />
            <span className="decoration-center">S</span>
          </div>
        </div>
        <p className="login-footer">A little more clarity for your next big idea.</p>
      </section>

      <main className="login-main">
        <div className="google-login-card">
          <div className="login-card-icon" aria-hidden="true">✦</div>
          <p className="login-card-kicker">WELCOME BACK</p>
          <h2>Sign in to Socially</h2>
          <p className="login-card-copy">
            Use your Google account to continue to your dashboard.
          </p>

          <div className="google-button">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google sign-in failed")}
              width="320"
              text="continue_with"
              shape="rectangular"
              theme="outline"
              size="large"
            />
          </div>

          {loading && <p className="login-progress">Signing you in...</p>}

          {error && <p className="login-error" role="alert">{error}</p>}

          <p className="login-privacy">
            Secure sign-in powered by Google
          </p>
        </div>
      </main>
    </div>
  );
}

export default GoogleLoginPage;
