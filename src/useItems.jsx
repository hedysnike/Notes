import { useEffect, useState, createContext } from "react";

export const useItems = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setLabels(JSON.parse(localStorage.getItem("label")) || []);
  }, []);

  console.log(labels)

  function updatesetLabel(labels) {  
    localStorage.setItem("labels", JSON.stringify(labels));
    setLabels(labels);
  }
  return { labels, updatesetLabel };
};

export const itemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const { labels, updatesetLabel } = useItems();

  return <itemsContext.Provider value={{ labels, updatesetLabel }}>{children}</itemsContext.Provider>;
};
