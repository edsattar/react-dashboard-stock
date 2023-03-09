import React, { useContext, useState } from "react";
import { mockSearchResults } from "../constants/mock";

// import ThemeContext from "../context/ThemeContext";
// import { searchSymbol } from "../utils/api/stock-api";
import SearchResults from "./SearchResults";
import { XCircleIcon as XIcon, MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";

const Search = () => {
  // const { darkMode } = useContext(ThemeContext);

  const [input, setInput] = useState("");

  const [bestMatches, setBestMatches] = useState(mockSearchResults.result);

  const updateBestMatches = async () => {
    setBestMatches(mockSearchResults.result);
    //   try {
    //     if (input) {
    //       const searchResults = await searchSymbol(input);
    //       const result = searchResults.result;
    //       setBestMatches(result);
    //     }
    //   } catch (error) {
    //     setBestMatches([]);
    //     console.log(error);
    //   }
  };

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const handleEnter = (event) => {
    
    if (event.key === "Enter") {
      event.preventDefault();
      updateBestMatches();
    }
  };

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white dark:bg-gray-900 border-neutral-200 dark:border-gray-800">
      <input
        type="text"
        value={input}
        className="dark:bg-gray-900 w-full px-4 py-2 focus:outline-none rounded-md "
        placeholder="Search stock..."
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleEnter}
      />
         {input && (
         <button onClick={clear} className="m-2">
           <XIcon className="h-4 w-4 fill-gray-500" />
         </button>
       )}
       <button
         onClick={updateBestMatches}
         className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
       >
         <SearchIcon className="h-4 w-4 fill-gray-100" />
       </button>
       {input && bestMatches.length > 0 ? (
         <SearchResults results={bestMatches} />
       ) : null}
    </div>
  );
};

export default Search;
