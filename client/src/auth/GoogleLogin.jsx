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
      <div className="google-login-card">
        <h1>Welcome Back</h1>
        <p>Sign in to your Multiplatform Dashboard</p>

        <div className="google-button">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google sign-in failed")}
          />
        </div>

        {loading && <p>Signing you in...</p>}

        {error && (
          <p className="login-error">{error}</p>
        )}
      </div>
    </div>
  );
}

export default GoogleLoginPage;
