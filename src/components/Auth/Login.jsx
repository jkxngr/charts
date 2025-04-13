import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://json-server-theta-ebon.vercel.app/users?email=${form.email}&password=${form.password}`
    );
    const user = await res.json();

    if (user.length > 0) {
      setMessage("Login successful");
      localStorage.setItem("user", JSON.stringify(user[0]));
      navigate("/dashboard");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card bg-dark text-light shadow-lg rounded-4 p-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3 bg-secondary text-light"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="form-control mb-3 bg-secondary text-light"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button className="btn btn-outline-light w-100" type="submit">
            Login
          </button>
          <p className="text-center mt-3">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </form>
        <p className="text-center text-warning">{message}</p>
      </div>
    </div>
  );
}
