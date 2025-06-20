import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/login/success", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          toast.success(`Welcome back ${data.user.displayName || data.user.name}!`);
          navigate("/"); // ✅ Only redirect if already logged in
        }
      } catch (err) {
        // Not logged in; stay on login page
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (checkingAuth) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#e6f1fc]">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Login to Continue</h2>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
