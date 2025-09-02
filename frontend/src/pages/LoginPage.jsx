import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "../styles/global.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "Technician") navigate("/technician");
      else if (data.role === "Dentist") navigate("/dentist");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-quote">
        "Experience smooth and secure access to patient scans – anytime, anywhere."
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Signup first</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
