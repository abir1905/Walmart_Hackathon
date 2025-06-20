import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AuthLayout = () => {
  const location = useLocation();

  return (
<div className="w-screen h-screen flex font-sans bg-gray-100 overflow-hidden">

  {/* Right Panel */}
  <div className="w-full bg-white h-full relative">
    {/* ❌ DELETE this extra blue block inside right half if present */}
    {/* ✅ Only keep the login form like below: */}
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 w-full h-full p-10 overflow-y-auto"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  </div>
</div>

  );
};

export default AuthLayout;
