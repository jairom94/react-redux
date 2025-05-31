import "./login-loader.css";
import React from "react";

const LoginLoader = () => {
  return (
    <div className="relative min-h-dvh bg-gray-400">
      <div className="loader">
        <div className="square" id="sq1"></div>
        <div className="square" id="sq2"></div>
        <div className="square" id="sq3"></div>
        <div className="square" id="sq4"></div>
        <div className="square" id="sq5"></div>
        <div className="square" id="sq6"></div>
        <div className="square" id="sq7"></div>
        <div className="square" id="sq8"></div>
        <div className="square" id="sq9"></div>
      </div>
    </div>
  );
};

export default LoginLoader;
