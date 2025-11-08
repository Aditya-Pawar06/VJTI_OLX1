import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation function
  const validateForm = () => {
    const { username, email, password, phone } = formData;
    if (!username || !email || !password || !phone) {
      setError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be 10 digits");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      
      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
      <p className="text-gray-600 text-center mb-4">Join VJTI OLX and start buying and selling smarter!</p>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form className="space-y-4" onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          pattern=".*vjti\.ac\.in$"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min. 6 characters)"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-600">LOGIN HERE</a>
      </p>

      <footer className="mt-4 text-center text-gray-500">
        <a href="/" className="text-blue-500">Check us out!</a>
        <p>Got something to sell? Start now</p>
      </footer>
    </div>
  );
};

export default SignupForm;
