import React, { useState, useEffect, useRef } from "react";
import renderList from "../constants/renderList";

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

  //Handling backspace key
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

  //Input Field change function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    //Filter based on input
    const filteredItems = initialItems.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setItems(filteredItems);
  };

  //Handle Click on suggestion
  const handleItemClick = (item) => {
    //Add to chips & remove from suggestions
    setChips([...chips, { label: item }]);
    setItems(items.filter((i) => i !== item));
    setInputValue("");
  };

  //Remove Chip
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
      {inputValue && renderList(items, handleItemClick)}

      {/* Display full list when clicked and no input value */}
      {showSuggestions &&
        !inputValue &&
        renderList(
          initialItems.filter(
            (item) => !chips.some((chip) => chip.label === item)
          ),
          handleItemClick
        )}
    </div>
  );
};

export default Chip;
