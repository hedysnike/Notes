import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as api from "./components/api";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const useProfileProvider = () => {
  const [notes, setNotes] = useState();
  const [profile, setProfile] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
    if (!token) {
      setProfile(null);
      setIsLoggedIn(false);
      return;
    }

    api.getMe(token).then((profile) => {
      if (profile.error) {
        setToken("");
        localStorage.removeItem("token");
        return;
      }

      setProfile(profile);
      setIsLoggedIn(true);
    });

    api.getNotes(token).then((notes) => {
      setNotes(notes);
    });
  }, [token]);

  const login = async (username, password) => {
    const { token } = await api.login(username, password);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const register = async (username, password) => {
    const { token } = await api.register(username, password);
    setToken(token);
    localStorage.setItem("token", token);
  };

  return { profile, notes, login, register, isLoggedIn };
};

export const ProfileProvider = ({ children }) => {
  const { profile, notes, login, register, isLoggedIn } = useProfileProvider();

  return (
    <ProfileContext.Provider value={{ profile, notes, login, register, isLoggedIn }}>
      {children}
    </ProfileContext.Provider>
  );
};
