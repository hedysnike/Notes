import { useContext } from "react";
import { useEffect, useState, createContext } from "react";

export const labelsContext = createContext();

export const useLabels = () => useContext(labelsContext);

export const useLabelsProvider = () => {
  const [labels, setLabels] = useState([]);

  function updatesetLabel(labels) {
    localStorage.setItem("labels", JSON.stringify(labels));
    setLabels(labels);
  }

  useEffect(() => {
    setLabels(JSON.parse(localStorage.getItem("labels")) || []);
  }, []);

  return { labels, updatesetLabel };
};

export const LabelsProvider = ({ children }) => {
  const { labels, updatesetLabel } = useLabelsProvider();

  return <labelsContext.Provider value={{ labels, updatesetLabel }}>{children}</labelsContext.Provider>;
};
