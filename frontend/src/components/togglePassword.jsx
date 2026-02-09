import React from "react";
import { useState } from "react";

const TogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  return (
  <div>
    <h1>Password Toggle</h1>
    <input type={showPassword ? "text" : "password"}placeholder="Enter your password" />
    <button onClick={() => setShowPassword(prev => !prev)}>Toggle Password</button>
  </div>
  )
};

export default TogglePassword;