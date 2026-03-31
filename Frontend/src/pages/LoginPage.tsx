import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}
const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof LoginFormData]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginUser(formData.email, formData.password);
      console.log("User Logged In:", res);
      const userData = {
        _id: res._id,
        name: res.name,
        email: res.email,
      };

      // store token
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(userData));
      login(userData);

      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Login Failed. Please check your credentials.");
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
        <h2 className="my-2 font-bold text-2xl text-center">Sign In</h2>
        <p className="mb-4 text-slate-500 font-medium text-center">
          Enter your credentials to continue
        </p>
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
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-slate-600 mb-4 text-center">
          Don't have account?{" "}
          <Link to="/register" className="text-blue-700">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
