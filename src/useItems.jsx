// import { useEffect, useState, createContext } from "react";

// export const useItems = () => {
//   const [label, setLabel] = useState([]);

//   useEffect(() => {
//     setLabel(JSON.parse(localStorage.getItem("label")) || []);
//   }, []);

//   function updatesetLabel(labels) {  
//     localStorage.setItem("label", JSON.stringify(labels));
//     setLabel(labels);
//   }
//   return { label, setLabel };
// };

// export const itemsContext = createContext();

// export const ItemsProvider = ({ children }) => {
//   const { label, setLabel } = useItems();

//   return <itemsContext.Provider value={{ label, setLabel }}>{children}</itemsContext.Provider>;
// };
