import React from "react";

import { IoMdArrowBack } from "react-icons/io";
import "../Header/Header.css";

export default function Header({ screen, changeScreen }) {
  return (
    <>
      {(screen == "home" && (
        <aside className="Header_inicio_aside_boton">
          <h2 className="Header_inicio_titulo">My projects</h2>
          <button
            className="Header_inicio_boton"
            onClick={() => changeScreen("new")}
          >
            + Add projects
          </button>
        </aside>
      )) ||
        (screen == "new" && (
          <aside className="Header_añadir_aside_boton">
            <section className="Header_añadir_header">
              <button
                className="Header_añadir_boton_atras"
                onClick={() => changeScreen("home")}
              >
                <IoMdArrowBack fontSize={26} />
                Back
              </button>
              <h2 className="Header_añadir_titulo">Add project</h2>
            </section>
          </aside>
        )) ||
        (screen == "edit" && (
          <aside className="Header_editar_aside_boton">
            <section className="Header_editar_header">
              <button
                className="Header_editar_boton_atras"
                onClick={() => changeScreen("home")}
              >
                <IoMdArrowBack fontSize={26} />
                Back
              </button>
              <h2 className="Header_editar_titulo">Edit project</h2>
            </section>
          </aside>
        ))}
    </>
  );
}
