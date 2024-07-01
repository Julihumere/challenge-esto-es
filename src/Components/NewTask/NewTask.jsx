import React, { useEffect, useState } from "react";
import "./NewTask.css";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export default function NewTask({ addTask, changeScreen }) {
  const [project, setProject] = useState({
    id: uuidv4(),
    projectName: "",
    description: "",
    projectManager: {
      id_manager: "",
      name_manager: "",
      avatar_manager: "",
    },
    assignedTo: {
      id_assigned: "",
      name_assigned: "",
      avatar_assigned: "",
    },
    status: "",
    edited: false,
  });

  useEffect(() => {
    getDate();
  }, []);

  const optionsProjectManager = [
    {
      value: "1",
      label: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/80.jpg",
    },
    {
      value: "2",
      label: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    },
    {
      value: "3",
      label: "Jack Black",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    },
    {
      value: "4",
      label: "Jill White",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    },
  ];

  const OptionProjectManager = (props) => (
    <div className="Crear_option">
      <img className="avatar" src={props.data.avatar} alt="Avatar" />
      <span>{props.data.label}</span>
    </div>
  );

  const handleSelectProjectManager = (selectedOption) => {
    if (selectedOption) setErrors({ ...errors, projectManager: "" });

    setProject({
      ...project,
      projectManager: {
        id_manager: selectedOption.value,
        name_manager: selectedOption.label,
        avatar_manager: selectedOption.avatar,
      },
    });
  };

  const optionsAssigned = [
    {
      value: "3",
      label: "Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    },
    {
      value: "4",
      label: "Emily Brown",
      avatar: "https://randomuser.me/api/portraits/women/83.jpg",
    },
    {
      value: "5",
      label: "David Lee",
      avatar: "https://randomuser.me/api/portraits/men/84.jpg",
    },
    {
      value: "6",
      label: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    },
    {
      value: "7",
      label: "Daniel Miller",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    },
    {
      value: "8",
      label: "Olivia Davis",
      avatar: "https://randomuser.me/api/portraits/women/87.jpg",
    },
    {
      value: "9",
      label: "Matthew Taylor",
      avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    },
    {
      value: "10",
      label: "Sophia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    },
  ];

  const OptionAssigned = (props) => (
    <div className="Crear_option">
      <img className="avatar" src={props.data.avatar} alt="Avatar" />
      <span>{props.data.label}</span>
    </div>
  );

  const handleSelectAssigned = (selectedOption) => {
    if (selectedOption) setErrors({ ...errors, assignedTo: "" });

    setProject({
      ...project,
      assignedTo: {
        id_assigned: selectedOption.value,
        name_assigned: selectedOption.label,
        avatar_assigned: selectedOption.avatar,
      },
    });
  };

  const optionsStatus = [
    { value: "enable", label: "Enable" },
    { value: "disable", label: "Disable" },
  ];

  const handleSelectStatus = (selectedOption) => {
    if (selectedOption) setErrors({ ...errors, status: "" });

    setProject({
      ...project,
      status: selectedOption.value,
    });
  };

  const handleText = (e) => {
    const { name, value } = e.target;

    if (Object.keys(errors).includes(name) && value.length > 0) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    setProject({
      ...project,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({
    projectName: "",
    description: "",
    projectManager: "",
    assignedTo: "",
    status: "",
  });

  const handleCheckError = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (project.projectName === "") {
      newErrors.projectName = "Project name is required";
    }
    if (project.description === "") {
      newErrors.description = "Description is required";
    }
    if (project.projectManager.id_manager === "") {
      newErrors.projectManager = "Project manager is required";
    }
    if (project.assignedTo.id_assigned === "") {
      newErrors.assignedTo = "Assigned to is required";
    }
    if (project.status === "") {
      newErrors.status = "Status is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
      handleCreateProject(e);
      return;
    }
  };

  const handleCreateProject = () => {
    addTask(project);
    Swal.fire({
      title: "¡Project created!",
      icon: "success",
      confirmButtonText: "OK",
      preConfirm: () => {
        changeScreen("home");
      },
    });
  };

  const getDate = () => {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) day = `0${day}`;
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    setProject({
      ...project,
      date: `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`,
    });
  };

  return (
    <main className="Crear_container">
      <form onSubmit={(e) => handleCheckError(e)} className="Crear_form">
        <label className="Crear_label">
          Project name{" "}
          {errors.projectName == "Project name is required" && (
            <span className="Crear_error">{errors.projectName}</span>
          )}
          <input
            className="Crear_input"
            type="text"
            name="projectName"
            onChange={(e) => handleText(e)}
          />
        </label>
        <label className="Crear_label">
          Description{" "}
          {errors.description == "Description is required" && (
            <span className="Crear_error">{errors.description}</span>
          )}
          <input
            className="Crear_input"
            type="text"
            name="description"
            onChange={(e) => handleText(e)}
          />
        </label>
        <label className="Crear_label">
          Project manager{" "}
          {errors.projectManager == "Project manager is required" && (
            <span className="Crear_error">{errors.projectManager}</span>
          )}
          <Select
            options={optionsProjectManager}
            onChange={handleSelectProjectManager}
            getOptionLabel={(option) => <OptionProjectManager data={option} />}
            getOptionValue={(option) => option.value}
            isSearchable={false}
            className="Crear_select"
            placeholder="Select a person"
            styles={{
              control: (base) => ({
                ...base,
                height: "45px",
                width: "100%",
                textAlign: "left",
              }),
            }}
          />
        </label>
        <label className="Crear_label">
          Assigned to{" "}
          {errors.assignedTo == "Assigned to is required" && (
            <span className="Crear_error">{errors.assignedTo}</span>
          )}
          <Select
            options={optionsAssigned}
            onChange={handleSelectAssigned}
            getOptionLabel={(option) => <OptionAssigned data={option} />}
            getOptionValue={(option) => option.value}
            isSearchable={false}
            className="Crear_select"
            placeholder="Select a person"
            styles={{
              control: (base) => ({
                ...base,
                height: "45px",
                width: "100%",
                textAlign: "left",
              }),
            }}
          />
        </label>
        <label className="Crear_label">
          Status{" "}
          {errors.status == "Status is required" && (
            <span className="Crear_error">{errors.status}</span>
          )}
          <Select
            options={optionsStatus}
            onChange={handleSelectStatus}
            className="Crear_select"
            placeholder="Enable"
            styles={{
              control: (base) => ({
                ...base,
                height: "45px",
                width: "100%",
                textAlign: "left",
              }),
            }}
          />
        </label>
        <button type="submit" className="Creat_button">
          Create project
        </button>
      </form>
    </main>
  );
}
