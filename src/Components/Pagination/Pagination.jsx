import React, { useState } from "react";
import "./Pagination.css";
export default function Pagination({
  taskPerPage,
  pagination,
  totalTasks,
  page,
  setPage,
}) {
  const [activePage, setActivePage] = useState(1); // Estado para la página activa

  let pageNum = [];
  const total = Math.ceil(totalTasks / taskPerPage);

  for (let i = 1; i <= total; i++) {
    pageNum.push(i);
  }

  const handleClick = (pageNumber) => {
    setActivePage(pageNumber); // Establecer la página activa
    pagination(pageNumber); // Llamar a la función de paginación
  };

  return (
    <div className="Pagination_container">
      {pageNum.length == 0 ? (
        <button
          className={`Pagination_button ${
            activePage === 1 ? "Pagination_active" : ""
          }`}
          onClick={() => handleClick(1)}
        >
          1
        </button>
      ) : (
        pageNum?.map((e) => (
          <button
            key={e}
            className={`Pagination_button ${
              activePage === e ? "Pagination_active" : ""
            }`}
            onClick={() => handleClick(e)}
          >
            {e}
          </button>
        ))
      )}
    </div>
  );
}
