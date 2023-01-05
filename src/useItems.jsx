import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const itemsContext = createContext();

export const useItems = () => useContext(itemsContext);

export const useItemsProvider = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items")) || []);
  }, []);
  function updatesetItem(items) {
    localStorage.setItem("items", JSON.stringify(items));
    setItems(items);
  }

  return { items, setItems: updatesetItem };
};

export const ItemsProvider = ({ children }) => {
  const { items, setItems } = useItemsProvider();

  return <itemsContext.Provider value={{ items, setItems }}>{children}</itemsContext.Provider>;
};
