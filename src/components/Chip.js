import React, { useState, useEffect, useRef } from "react";

const Chip = () => {
  const initialItems = [
    "Danish Agarwal",
    "Lydia Padukone",
    "Manushi Chillar",
    "Hritik Roshan",
    "Shah Rukh Khan",
    "Alia Bhatt",
  ];

  const [items, setItems] = useState([]);
  const [chips, setChips] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleBackspace = (e) => {
      if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
        inputRef.current.focus();
        setChips(chips.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleBackspace);
    return () => {
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [chips, inputValue, items]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filteredItems = initialItems.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setItems(filteredItems);
  };

  const handleItemClick = (item) => {
    setChips([...chips, { label: item }]);
    setItems(items.filter((i) => i !== item));
    setInputValue("");
  };

  const handleChipRemove = (chipLabel) => {
    setChips(chips.filter((chip) => chip.label !== chipLabel));
    inputRef.current.focus();
  };

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center">
        <div className="flex flex-wrap items-center">
          {chips.map((chip, index) => (
            <span
              key={index}
              className="mx-1 my-1 bg-gray-200 text-black p-2 rounded-full flex items-center"
            >
              {chip.label}
              <span
                className="ml-2 cursor-pointer"
                onClick={() => handleChipRemove(chip.label)}
              >
                &#10006;
              </span>
            </span>
          ))}
        </div>
        <input
          className="flex-grow p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
      </div>

      {/* Display suggestions when there is input value */}
      {inputValue && (
        <ul className="mt-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="hover:bg-gray-200 p-2 rounded-md cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Display full list when clicked and no input value */}
      {showSuggestions && !inputValue && (
        <ul className="mt-2">
          {initialItems
            .filter((item) => !chips.some((chip) => chip.label === item))
            .map((item, index) => (
              <li
                key={index}
                className="hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Chip;
