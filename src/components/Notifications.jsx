import React, { useState } from "react";

export function Notifications({ notfOpen }) {
  if (!open) return null;

  return (
    <div className={`z-50 p-4 bottom-5 left-6 w-72 absolute text-white bg-[#313235] ${notfOpen ? "" : "hidden"}`}>
      Note Deleted
    </div>
  );
}

export function Pinnotifications({ notfpin }) {
  if (!open) return null;

  return (
    <div className={`z-50 p-4 bottom-5 left-6 w-72 absolute text-white bg-[#313235] ${notfpin ? "" : "hidden"}`}>
      Note Pinned
    </div>
  );
}
