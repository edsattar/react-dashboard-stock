import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-full h-full rounded-md relative p-8 border-2 bg-white dark:bg-gray-900 border-neutral-200 dark:border-gray-800">
      {children}
    </div>
  );
};

export default Card;
