import React, { useContext } from "react";
// import StockContext from "../context/StockContext";
// import ThemeContext from "../context/ThemeContext";

const SearchResults = ({ results }) => {
  // const { darkMode } = useContext(ThemeContext);

  // const { setStockSymbol } = useContext(StockContext);

  return (
    <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white dark:bg-gray-900 border-neutral-200 custom-scrollbar dark:border-gray-800 dark:custom-scrollbar-dark">
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md dark:hover:bg-indigo-600 hover:bg-indigo-200 transition duration-300"
            onClick={() => setStockSymbol(item.symbol)}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
