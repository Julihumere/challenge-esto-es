import React from "react";
import "./Search.css";
export default function Search({ searchTask }) {
  return (
    <main className="Search_container">
      <input
        className="Search_input"
        type="text"
        placeholder="Search"
        onChange={(e) => searchTask(e.target.value)}
      />
    </main>
  );
}
