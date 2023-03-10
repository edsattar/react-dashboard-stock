import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { MoonIcon } from "@heroicons/react/24/solid";

const ThemeIcon = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 hover:shadow-xl transition duration-150 dark:shadow-gray-700"
    >
      <MoonIcon className="h-8 w-8 cursor-pointer stroke-1 dark:fill-yellow-400 dark:stroke-yellow-400 fill-none stroke-neutral-400" />
    </button>
  );
};

export default ThemeIcon;
