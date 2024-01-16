import React from "react";
// Function to render the list of items
//Key';s can cause
const renderList = (items, onItemClick) => (
  <ul className="mt-2">
    {items.map((item, index) => (
      <li
        key={index}
        className="hover:bg-gray-200 p-2 rounded-md cursor-pointer"
        onClick={() => onItemClick(item)}
      >
        {item}
      </li>
    ))}
  </ul>
);

export default renderList;
