import React, { useState } from "react";

export default function App() {
  const [currentItemValue, setCurrentItemValue] = useState("");
  const [items, setItems] = useState([]);

  function addItem() {
    setItems([...items, currentItemValue]);
    setCurrentItemValue("");
  }

  return (
    <div>
      <div className="bg-black h-screen ">
        <div className="flex justify-center">
          <textarea
            type="text"
            value={currentItemValue}
            className="mt-16 w-96 py-1 px-3 outline-none shadow-slate-800 shadow-md rounded-lg bg-slate-700 text-white border border-solid border-transparent"
            placeholder="Take a note..."
            onChange={(e) => {
              setCurrentItemValue(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              addItem(currentItemValue);
            }}
            className="text-white ml-4 mt-16"
          >
            Add
          </button>
        </div>
        <div className="grid justify-center text-white mt-10 grid-cols-4">
          {items.map((i) => {
            return (
              <div className="p-4 border border-solid border-gray-[dadce0] m-10 pb-10 rounded-xl">
              <p> <pre>{i}</pre></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
