import React, { useState } from "react";
import "./index.css";
import Modal from "./Modal";

export default function App() {
  const [currentItemValue, setCurrentItemValue] = useState("");
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  function addItem() {
    setItems([currentItemValue, ...items]);
    setCurrentItemValue("");
  }

  return (
    <div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
      <div className="bg-black h-screen">
        <div className="flex justify-center">
          <textarea
            type="text"
            value={currentItemValue}
            className="mt-16 w-96 py-1 px-3 outline-none shadow-[#100F0F]  shadow-md rounded-lg bg-white  text-black border border-solid border-transparent"
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
              <div
                className="p-4 bg-[#100F0F] m-10 pb-10 rounded-xl"
                onClick={() => setOpenModal(true)}
              >
                <p>
                  {" "}
                  <pre>{i}</pre>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
