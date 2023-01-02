import React, { useState } from "react";

export default function Notifications({ notfOpen, setNotfOpen, handleNotification }) {
  if (!open) return null;

  return (
    <div
      onClick={() => handleNotification?.()}
      className={`z-50 p-4 bottom-5 left-6 w-72 absolute text-white bg-[#313235] ${
        notfOpen ? "" : "hidden"
      }`}
    >
      Note Deleted
    </div>
  );
}
