import React, { useState } from "react";
import "../Card/Card.css";
import fotoPerfil from "../../assets/profile.jpg";
import botonEditar from "../../assets/buttonEdit.png";
import { CiMenuKebab } from "react-icons/ci";
import { LiaEdit } from "react-icons/lia";
import { CgTrashEmpty } from "react-icons/cg";

export default function Card({ tarea, index, changeScreen, deleteTask }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const abrirMenu = (id) => {
    setMenuVisible(!menuVisible);
  };

  const cerrarMenu = () => {
    setMenuVisible(false);
  };

  return (
    <article className="Card_container">
      <section className="Card">
        <aside className="Card_header">
          <h3>
            {tarea.projectName} {tarea.status === "enable" ? "🟢" : "🔴"}
          </h3>
          <p>
            {tarea.edited === false ? "Creation" : "Updated"} date: {tarea.date}
          </p>
        </aside>

        <button
          className="Card_boton_editar"
          onClick={() => {
            abrirMenu(tarea.id);
          }}
        >
          <CiMenuKebab fontSize={24} />
        </button>
      </section>

      <section className="Card_footer">
        <img
          src={tarea.assignedTo?.avatar_assigned}
          alt={`foto-perfil-${tarea.assignedTo?.name_assigned}`}
        />
        <p>{tarea.assignedTo?.name_assigned}</p>
      </section>
      {menuVisible && (
        <section className="Menu_container">
          <button
            onClick={() => {
              changeScreen("edit", tarea.id);
              cerrarMenu();
            }}
          >
            <div>
              <div class="tab"></div>
              <LiaEdit fontSize={24} />
              <span className="Menu_boton_texto">Edit</span>
            </div>
          </button>
          <span className="Menu_divisor">.</span>
          <button
            onClick={() => {
              abrirMenu(tarea.id);
              cerrarMenu();
              deleteTask(tarea.id);
            }}
          >
            <div>
              <CgTrashEmpty fontSize={24} />
              <span className="Menu_boton_texto">Delete</span>
            </div>
          </button>
        </section>
      )}
    </article>
  );
}
