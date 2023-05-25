import { createContext, useContext, useState, useEffect } from "react";

const itemsContext = createContext();

export const useItems = () => useContext(itemsContext);

export const useItemsProvider = () => {
  const [items, setItems] = useState([]);
  const [pinned, setPinned] = useState([]);

  useEffect(() => {
    const storedPinns = JSON.parse(localStorage.getItem("pinned"));
    if (storedPinns) {
      setPinned(storedPinns);
    }
  }, []);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items")) || []);
  }, []);

  function updatesetItem(items) {
    localStorage.setItem("items", JSON.stringify(items));
    setItems(items);
  }

  function updatesetPinned(pinned) {
    localStorage.setItem("pinned", JSON.stringify(pinned));
    setPinned(pinned);
  }

  return { items, setItems: updatesetItem, pinned, setPinned: updatesetPinned };
};

export const ItemsProvider = ({ children }) => {
  const { items, setItems, pinned, setPinned } = useItemsProvider();

  return (
    <itemsContext.Provider value={{ items, setItems, pinned, setPinned }}>
      {children}
    </itemsContext.Provider>
  );
};
