import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoimg from "../assets/logo1.png";

const Login = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleFacebookLogin = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const handleManualLogin = async () => {
    if (!email || !password) {
      toast.warn("Please enter both email and password");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/auth/manual-login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.success(`Welcome back ${data.user.displayName || data.user.name}!`);
        navigate("/");
      } else if (res.status === 401) {
        toast.error("Wrong password or emailid");
      } else {
        // any other server error
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/login/success", {
          credentials: "include",
        });
  
        const data = await res.json();
        if (res.ok) {
          toast.success(`Welcome back ${data.user.displayName || data.user.name}!`);
          navigate("/");
        }
      } catch {
        // Not authenticated; no toast needed
      } finally {
        setCheckingAuth(false);
      }
    };
  
    checkAuth();
  }, [navigate]);
  

  if (checkingAuth) return <div className="flex h-screen justify-center items-center text-xl">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 p-10 text-white flex flex-col justify-center rounded-r-3xl">
        <h1 className="text-4xl font-bold mb-4 self-center">"Revolutionize Your Workflow!"</h1>
        <h1 className="text-2xl font-bold mb-4 italic self-center">
          "Manage smarter. Sell faster. Grow bigger."
        </h1>
        <p className="text-md mb-8 self-center text-center">
          Join thousands of smart sellers using our dashboard to streamline operations, unlock insights,
          and dominate the digital marketplace — all in one sleek interface.
        </p>
        <img src={logoimg} alt="Logo" className="w-3/4 mx-auto" />
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-600 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm text-gray-500">Please login to your account</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              className="absolute right-4 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </span>
          </div>
          <div className="flex justify-end text-sm text-blue-600 cursor-pointer">
            Forgot Password?
          </div>
          <button
            type="button"
            onClick={handleManualLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">Or Login With</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
          >
            <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" />
            Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
          >
            <img src="https://img.icons8.com/fluency/16/facebook-new.png" alt="Facebook" />
            Facebook
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold cursor-pointer"
          >
              Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
