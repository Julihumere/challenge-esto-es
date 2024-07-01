import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import logo from "../../assets/logo.png";
import Card from "../Card/Card";
import Header from "../Header/Header";
import EditTask from "../EditTask/EditTask";
import NewTask from "../NewTask/NewTask";
import Swal from "sweetalert2";
import Search from "../Search/Search";

export default function Inicio() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [screen, setScreen] = useState("home");

  const [taskEdit, setTaskEdit] = useState({});

  const changeScreen = (screen, id) => {
    if (screen == "edit") {
      const task = tasks.find((task) => task.id == id);
      setTaskEdit(task);
    }

    setScreen(screen);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setAllTasks([...allTasks, task]);
  };

  const editTask = (task) => {
    const newTasks = tasks.map((t) => (t.id == task.id ? task : t));
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTasks = tasks.filter((task) => task.id != id);
        setTasks(newTasks);
      }
    });
  };

  const searchTask = (text) => {
    if (text == "") {
      setTasks(allTasks);
      return;
    }

    const newTasks = allTasks.filter((task) => {
      return task.projectName.toLowerCase().includes(text.toLowerCase());
    });

    setTasks(newTasks);
  };

  return (
    <main className="Inicio_container">
      <div className="Inicio_card">
        <section className="Inicio_header">
          <aside className="Inicio_aside_logo">
            <img src={logo} alt="logo-esto-es" />
          </aside>
          <Header screen={screen} changeScreen={changeScreen} />
        </section>

        {(screen == "home" && (
          <>
            <Search searchTask={searchTask} />
            <section className="Inicio_cards">
              {tasks?.length > 0 ? (
                tasks.map((tarea, index) => (
                  <Card
                    key={tarea.id}
                    tarea={tarea}
                    index={index}
                    changeScreen={changeScreen}
                    deleteTask={deleteTask}
                  />
                ))
              ) : (
                <h2>No tasks</h2>
              )}
            </section>
          </>
        )) ||
          (screen == "new" && (
            <section className="Inicio_nueva">
              <NewTask addTask={addTask} changeScreen={changeScreen} />
            </section>
          )) ||
          (screen == "edit" && (
            <section className="Inicio_nueva">
              <EditTask
                taskEdit={taskEdit}
                editTask={editTask}
                changeScreen={changeScreen}
              />
            </section>
          ))}
      </div>
    </main>
  );
}
