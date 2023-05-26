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
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  function updatesetItems(updatedItems) {
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);
  }

  function updatesetPinned(updatedPinned) {
    localStorage.setItem("pinned", JSON.stringify(updatedPinned));
    setPinned(updatedPinned);
  }

  return { items, setItems: updatesetItems, pinned, setPinned: updatesetPinned };
};

export const ItemsProvider = ({ children }) => {
  const { items, setItems, pinned, setPinned } = useItemsProvider();

  return (
    <itemsContext.Provider value={{ items, setItems, pinned, setPinned }}>
      {children}
    </itemsContext.Provider>
  );
};
