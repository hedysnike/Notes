import React from "react";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import { login, register } from "./api";

export default function Register() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div>
      <div>
        <RegisterModal modalOpen={modalOpen} CloseRegister={() => setModalOpen(false)}>
          <div className="text-black text-sm items-center justify-center ">
            <div className="flex justify-center items-center flex-col mb-2 p-6">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="p-1 rounded-md outline-none m-1"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Password"
                className="p-1 rounded-md outline-none m-1"
              />
            </div>
            <div>
              <div className="flex w-full">
                <button
                  onClick={() => register(username, password)}
                  className="text-black bg-white p-1 border-r hover:text-[#18A589]  border-black border-solid w-[50%] mt-5"
                >
                  Register
                </button>
                <button
                  onClick={() => login(username, password)}
                  className="text-black bg-white p-1 border-l hover:text-[#18A589]  border-black border-solid w-[50%] mt-5"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </RegisterModal>
      </div>

      <div>
        <div className="absolute right-4 top-5">
          <button
            className="text-white border border-solid border-white px-2 py-1 hover:bg-white hover:text-black rounded-md text-sm"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Sign In
          </button>
        </div>
        <div className="border-b border-white border-solid pb-2 w-48 absolute right-4 top-14"></div>
      </div>
    </div>
  );
}
