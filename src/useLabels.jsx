import { useEffect, useState, createContext } from "react";

export const useLabels = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setLabels(JSON.parse(localStorage.getItem("labels")) || []);
  }, []);

  function updatesetLabel(labels) {  
    localStorage.setItem("labels", JSON.stringify(labels));
    setLabels(labels);
  }
  return { labels, updatesetLabel };
};

export const itemsContext = createContext();

export const LabelsProvider = ({ children }) => {
  const { labels, updatesetLabel } = useLabels();

  return <itemsContext.Provider value={{ labels, updatesetLabel }}>{children}</itemsContext.Provider>;
};
