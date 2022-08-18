
import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import axios from "axios";
import Form from "react-bootstrap/Form";

import "./main.css";
import { projectInfo } from "../actions/projectinfo";
import { useSelector, useDispatch } from "react-redux";

const Generatepdf = () => {
  const [projectType, setProjectType] = useState([]);
  const [projectTech, setProjectTech] = useState([]);
  const [project, setProject] = useState({
    projectName: "",
    technologyName: "",
    projectTypeName: "",
    selectRequirement: [],
    file: "",
  });

  //navigate to other pages
  let navigate = useNavigate();

  // useRedux Selector
  const dispatch = useDispatch();
  const projectinfo = useSelector(
    (state) => state.userProject.projectinfo.data
  );
  console.log("projectinfo deatil", projectinfo);

  useEffect(() => {
    getAllTechnology();
    getAllProjectTypes();
  }, []);

  useEffect(() => {
    console.log("projectTech===>", projectTech);
    console.log("Project type===>", projectType);
  },[projectType, projectTech]);


  const getAllTechnology = () => {
    axios
      .get("http://localhost:8000/api/technology/getAllTechnology")
      .then((res) => {
        const data = res.data.data;
        setProjectTech(...projectTech, data);
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  };

  const getAllProjectTypes = () => {
    axios
      .get("http://localhost:8000/api/projectType/getAllProjectType")
      .then((res) => {
        setProjectType(res.data.data);
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  };

  const [checked, setChecked] = useState([]);
  const checkList = [
    "Figma Design",
    "Frontend(Responsive and dynamic)",
    "Testing (Frontend and Backend)",
    "Backend designing",
  ];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  let name;
  let value;

  const handleinputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProject({ ...project, [name]: value });
    console.log("token====>data", project);
  };

  // file handling code start

  const handlefiles = (e) => {
    name = e.target.name;
    let file = e.target.files[0];
    setProject({ ...project, [name]: file });
    console.log("files===>", e.target.files[0]);
  };

  // file handling code end

  const save = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    const token = localStorage.getItem("security");
    console.log("token====>", token);

    formdata.append("projectName", project.projectName);
    formdata.append("projectTypeName", project.projectTypeName);
    formdata.append("technologyName", project.technologyName);
    formdata.append("selectRequirement", checked);
    formdata.append("file", project.file);

    console.log("project data====>", formdata);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .post("http://localhost:8000/api/project/addProject", formdata, config)
      .then((res) => {
        dispatch(projectInfo(res.data));
        alert("Basic Information added successfully...");
        navigate("/addmodules", { replace: true });
        return <Outlet />;
      })
      .catch((err) => {
        alert("Try again ...");
        console.log("err", err);
      });
  };

  return (
    <div className="App">
      <div className="mainContainer">
     
      <Form className="customform" enctype="multipart/form-data">
      <h2>Project Estimator Generator</h2>
        <div className="basic-info">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Project Name</Form.Label>
            <Form.Control
              type="text"
              name="projectName"
              value={project.projectName}
              onChange={(e) => {
                handleinputs(e);
              }}
            />
          </Form.Group>
          <Form.Label>Select Technology</Form.Label>
          <Form.Select
            aria-label="technology"
            name="technologyName"
            type="text"
            value={project.technologyName}
            onChange={(e) => {
              handleinputs(e);
            }}
          >
            <option>Select Technology</option>
            {projectTech.map((value, index) => {
              return (
                <option key={index} value={value._id}>
                  {value.technologyName}
                </option>
              );
            })}
          </Form.Select>
          <Form.Label>Select Project Type</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="projectTypeName"
            type="text"
            value={project.projectTypeName}
            onChange={(e) => {
              handleinputs(e);
            }}
          >
            <option>Select Project Type </option>
            {projectType.map((value, index) => {
              return (
                <option key={index} value={value._id}>
                  {value.projectTypeName}
                </option>
              );
            })}
          </Form.Select>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Select Required Modues</Form.Label>

            {checkList.map((item, index) => (
              <div className="check" key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}

            <p>{`Items checked are: ${checkedItems}`}</p>
          </Form.Group>

          <Form.Label>Select file</Form.Label>
          <input
            aria-label="Default select example"
            name="file"
            type="file"
            onChange={(e) => {
              handlefiles(e);
            }}
          />

          <div className="print-btns">
            <button onClick={(e) => save(e)} className="btn">
              Save
            </button>
          </div>
        </div>
      </Form>

      </div>
    
    </div>
  );
};

export default Generatepdf;