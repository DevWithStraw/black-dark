import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        position: "absolute",
        margin : "150px auto"
      }}
    >
      <h1>صفحه مورد نظر شما موجود نیست :(</h1>
      <button
        style={{
          backgroundColor: "#1a1a1a",
          padding: "0.5rem 2rem",
          color: "white",
          border: "none",
        }}
        onClick={() => navigate(-1)}
      >
        {" "}
        بازگشت{" "}
      </button>
    </div>
  );
}
