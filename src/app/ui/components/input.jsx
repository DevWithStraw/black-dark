import React, { useContext } from "react";
import { InputContext } from "@app/context/InputContext";
import "./input.scss";

export default function Input({ id, type, placeholder }) {
  const { value , setValue } = useContext(InputContext);

  return (
    <input
      type={type}
      placeholder={placeholder}
      onInput={(e) => setValue({ ...value, [id]: e.target.value })}
    />
  );
}
