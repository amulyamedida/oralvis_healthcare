import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Technician");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password, role });
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-quote">
        "Register now and start managing patient scans efficiently and securely."
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Signup</h2>
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="Technician">Technician</option>
          <option value="Dentist">Dentist</option>
        </select>
        <button type="submit">Signup</button>
        <p>
          Already have an account? <a href="/">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
