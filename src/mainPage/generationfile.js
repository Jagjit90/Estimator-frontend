import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./main.css";
import { projectInfo } from "../actions/projectinfo";
import { useSelector, useDispatch } from "react-redux";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { faHomeLgAlt } from "@fortawesome/free-solid-svg-icons";

const Generatepdf = () => {

  //setting state variables
  const [projectType, setProjectType] = useState([]);
  const [projectTech, setProjectTech] = useState([]);
  const [projectErr, setProjectErr] = useState();
  const [project, setProject] = useState({
    projectName: "",
    technologyName: "",
    projectTypeName: "",
    selectRequirement: [],
    file: "",
  });


  const [checked, setChecked] = useState([]);
  const [tech, setTech] = useState([]);
  const [type, setType] = useState([]);

  //navigate to other pages
  let navigate = useNavigate();


  // setting values for dropdown
  const handleOnchangetech = (val) => {
   setProject({ ...project, ["technologyName"]: val });
  };
  const handleOnchangetype = (val) => {
    setProject({ ...project, ["projectTypeName"]: val });
  };
  


  // useRedux Selector
  const dispatch = useDispatch();

  useEffect(() => {
    getAllTechnology();
    getAllProjectTypes();
  }, []);


  // function to get all tech type
  const getAllTechnology = () => {
    axios
      .get("http://localhost:8000/api/technology/getAllTechnology")
      .then((res) => {
        const data = res.data.data;
        setProjectTech(...projectTech, data);
       setTech(
          data.map((item) => {
            return {
              label: item.technologyName,
              value: item._id,
            };
          })
        );
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  };

    // function to get all tech project type
  const getAllProjectTypes = () => {
    axios
      .get("http://localhost:8000/api/projectType/getAllProjectType")
      .then((res) => {
        setProjectType(res.data.data);
        const data = res.data.data;
        setType(
          data.map((item) => {
            return {
              label: item.projectTypeName,
              value: item._id,
            };
          })
        );
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  };

 
  const checkList = [
    "Figma Design",
    "Frontend(Responsive and dynamic)",
    "Testing (Frontend and Backend)",
    "Backend designing",
  ];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    const token = localStorage.getItem("security");
   if (token) {
      setProjectErr("");
      var updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }
      setChecked(updatedList);
    } else {
      setProjectErr("Please Login first");
    }
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
    const token = localStorage.getItem("security");

    if (token) {
      setProjectErr("");
      name = e.target.name;
      value = e.target.value;
      setProject({ ...project, [name]: value });
      console.log("token====>data", project);
    } else {
      setProjectErr("Please Login first");
    
    }
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

    if (token) {
      console.log("token====>", token);

      formdata.append("projectName", project.projectName);
      formdata.append("projectTypeId", project.projectTypeName);
      formdata.append("technologyId", project.technologyName);
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
          // navigate(`/addmodules/${res.data.data._id}`);
            // console.log("id",res.data.data._id);
          return <Outlet />;
        })
        .catch((err) => {
          setProjectErr(err.response.data.msg);
          console.log("err", err.response.data.msg);
        });
    } else {
      setProjectErr("Please Login First");

    }
  };

  return (
    <div className="App">
      <div className="mainContainer">
        <Form className="customform" enctype="multipart/form-data">
          <h2>Project Estimator Generator</h2>
          <div className="basic-info">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter Project Name</Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                placeholder="Enter Project Name"
                value={project.projectName}
                onChange={(e) => {
                  handleinputs(e);
                }}
              />
            </Form.Group>
            <Form.Label>Select Technology</Form.Label>
            <MultiSelect
              onChange={(e) => {
                handleOnchangetech(e);
              }}
              options={tech}
            />

            <Form.Label>Select Project Type</Form.Label>
            <MultiSelect
              onChange={(e) => {
                handleOnchangetype(e);
              }}
              options={type}
            />

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Select Required Modues</Form.Label>

              {checkList.map((item, index) => (
                <div className="check" key={index}>
                  <input
                    className="checklist"
                    value={item}
                    type="checkbox"
                    onChange={handleCheck}
                  />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
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
            {!projectErr ? "" : <p className="Error">{projectErr}</p>}
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
