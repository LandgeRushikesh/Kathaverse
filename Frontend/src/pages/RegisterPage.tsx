import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof RegisterFormData]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, password } = formData;
      console.log(name, " ", email, " ", password);

      const res = await registerUser(name, email, password);
      console.log("User Registered successfully:", res);

      login(res);

      navigate("/");
    } catch (error) {
      console.error("Failed to register:", error);
      alert("Registration Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="flex flex-col w-full max-w-md p-6 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="my-2 font-bold text-2xl text-center">Sign Up</h2>
        <p className="mb-4 text-slate-500 font-medium text-center">
          Enter your credentials to continue
        </p>
        <input
          type="text"
          name="name"
          placeholder="Enter your name..."
          className="w-full p-2 text-sm font-medium text-black border rounded-md border-gray-300 mb-4 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          className="w-full p-2 text-sm font-medium text-black border rounded-md border-gray-300 mb-4 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full p-2 text-sm font-medium text-black border rounded-md border-gray-300 mb-4 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="w-full flex justify-between items-center mb-4">
          <div>
            <input
              type="checkbox"
              id="remember-me"
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="remember-me">Remember Me</label>
          </div>
          <Link to="#" className="text-blue-700">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-center text-white font-semibold py-2 rounded-md mb-4 transition ${loading ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-slate-600 mb-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
