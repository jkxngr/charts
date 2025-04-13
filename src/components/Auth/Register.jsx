import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://json-server-theta-ebon.vercel.app/users?email=${form.email}`
    );
    const userExists = await res.json();

    if (userExists.length > 0) {
      setMessage("User already exists");
      return;
    }

    await fetch("https://json-server-theta-ebon.vercel.app/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setMessage("Registered successfully");
    setForm({ name: "", surname: "", email: "", password: "" });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card bg-dark text-light shadow-lg rounded-4 p-4">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3 bg-secondary text-light"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            className="form-control mb-3 bg-secondary text-light"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Last Name"
          />
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
            Register
          </button>
          <p className="text-center mt-3">
            Already have an account? <a href="/">Sign in</a>
          </p>
        </form>
        <p className="text-center text-success">{message}</p>
      </div>
    </div>
  );
}
