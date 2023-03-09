import React from "react";

const ChartFilter = ({ text, active, onClick }) => {
  return (
    <>
      <button
        // onClick={onClick}
        // active={active}
        className="w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer border-indigo-300 text-indigo-300 active:bg-indigo-600 active:border-indigo-700 active:text-gray-100 transition duration-200 hover:bg-indigo-600 hover:text-gray-100 hover:border-indigo-700"
      >
        {text}
      </button>
      <button class="bg-violet-500 hover:bg-violet-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-violet-300">
        Save changes
      </button>
    </>
  );
};

export default ChartFilter;
