import React, { useEffect, useState } from "react";
import axios from "axios";
// import Card from "react-bootstrap/Card";
// import { Button } from "bootstrap";
import Form from "react-bootstrap/Form";
import { Outlet, useNavigate } from "react-router-dom";
import "./module.css";

import AddModule from "./AddModule";

import { allModulesData } from "./actions/allmodulesdata";
import { customModules } from "./actions/custom_modules";
import { useSelector, useDispatch } from "react-redux";
import { hasPointerEvents, wait } from "@testing-library/user-event/dist/utils";

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState([]);

  const [formData, setFormData] = useState([serviceList]);

  const [serviceList, setServiceList] = useState({
    moduleName: "",
    moduleDescription: "",
    designerHours: "",
    frontendHours: "",
    backendHours: "",
    testingHours: "",
  });

  // for updating your database data from api
  const [dbMod, setDbMod] = useState({
    moduleName: "",
    moduleDescription: "",
    designerHours: "",
    frontendHours: "",
    backendHours: "",
    testingHours: "",
  });

  // const [serviceList, setServiceList] = useState([
  //   {
  //     m_title: "",
  //     m_Desc: "",
  //     m_design_time: "",
  //     m_frontend: "",
  //     m_backend: "",
  //     m_testing: "",
  //   }
  // ]
  // );

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const customModulesdata = useSelector(
    (state) => state.custommod.custommodules
  );

  console.log("custom modules===>", customModulesdata);

  const projectinfo = useSelector((state) => state);
  console.log("all modules from reducer", projectinfo);

  const [list, setList] = useState([]);

  useEffect(() => {
    getAllModules();
  }, []);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  const getAllModules = async (e) => {
    await axios
      .get("http://localhost:8000/api/module/getAllModule")
      .then((res) => {
        const data = res.data.data;
        console.log("data===>", data);

        setList(data);
        setDbMod(data)

console.log("modules=======>myyy",dbMod);

        dispatch(allModulesData(data));

        // navigate('/');
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  };

  const handleModule = (e) => {
    console.log("name",e.target.name,"value",e.target.value)

    setDbMod({ ...dbMod, [e.target.name]: e.target.value });

    console.log("dbmode data===>",dbMod);
  };

  // on save button
  const addCustomModules = (e) => {
    console.log([...form, serviceList]);
    setForm([...form, serviceList]);
    dispatch(customModules([...form, serviceList]));
    console.log("services===>", form);
  };

  // for adding form
  const handleform = (e) => {
    //  setFormData([...formData, serviceList]);
    //   console.log(formData);
  };

  const handleremove = (index) => {
    console.log("index===>", index);
    console.log("serviceList===>", serviceList);

    console.log("formData===>", formData);
    formData.splice(index, 1);
    setFormData([...formData]);
  };

  const handlecustomchange = (e) => {
    e.preventDefault();
    setServiceList({ ...serviceList, [e.target.name]: e.target.value });
  };

  const download = (e) => {
    navigate("/download", { replace: true });
    return <Outlet />;
  };

  return (
    <>
      <div className="myallmodules">
        <h2>Please select Your Modules Here</h2>

        {/* data from database */}
        <div className="onlymodules">
          {list.map((value, key) => {
            return (
              <div className="stylediv">
                <div className="style_module">
                  <h5>{value.moduleName}</h5>
                  <p>{value.moduleDescription}</p>
                  <Form.Label>Designing Hrs</Form.Label>
                  <Form.Control
                    type="Number"
                    name="designerHours"
                    // value={dbMod.designerHours}
                    value={value.designerHours}
                    onChange={(e) => {
                      handleModule(e);
                    }}
                    placeholder="Designing time"
                  />

                  <Form.Label>Frontend Dev Hrs</Form.Label>
                  <Form.Control
                    type="Number"
                    value={value.frontendHours}
                    name="frontendHours"
                    onChange={(e) => {
                      handleModule(e);
                    }}
                    placeholder="Designing time"
                  />
                  <Form.Label>Backend Dev Hrs</Form.Label>
                  <Form.Control
                    type="Number"
                    value={value.backendHours}
                    name="backendHours"
                    onChange={(e) => {
                      handleModule(e);
                    }}
                    placeholder="Designing time"
                  />
                  <Form.Label>Testing (Frontend and Backend)</Form.Label>
                  <Form.Control
                    type="Number"
                    value={value.testingHours}
                    name="testingHours"
                    onChange={(e) => {
                      handleModule(e);
                    }}
                    placeholder="Designing time"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3>Your Custom Added Modules</h3>
          {form === ""
            ? ""
            : form.map((value, key) => {
                return (
                  <div className="stylediv">
                    <div className="style_module">
                      <h5>{value.moduleName}</h5>
                      <p>{value.moduleDescription}</p>
                      <Form.Label>Designing Hrs</Form.Label>
                      <Form.Control
                        type="Number"
                        value={value.designerHours}
                        placeholder="Designing time"
                      />

                      <Form.Label>Frontend Dev Hrs</Form.Label>
                      <Form.Control
                        type="Number"
                        value={value.frontendHours}
                        placeholder="Designing time"
                      />
                      <Form.Label>Backend Dev Hrs</Form.Label>
                      <Form.Control
                        type="Number"
                        value={value.backendHours}
                        placeholder="Designing time"
                      />
                      <Form.Label>Testing (Frontend and Backend)</Form.Label>
                      <Form.Control
                        type="Number"
                        value={value.testingHours}
                        placeholder="Designing time"
                      />
                    </div>
                  </div>
                );
              })}
        </div>

        <h3>Enter your custom Module Details here:</h3>
        <button
          onClick={(e) => {
            setVisible(true);
          }}
          className="btn"
        >
          Add Module
        </button>
        {/* {formData.map((single, index) => {
          return (
            <> */}

        {visible === true ? (
          <div className="submode">
            <Form.Label>Module Name</Form.Label>
            <Form.Control
              type="text"
              name="moduleName"
              value={serviceList.moduleName}
              onChange={(e) => {
                handlecustomchange(e);
              }}
              placeholder="Designing time"
            />
            <Form.Label>Module Description</Form.Label>

            <Form.Control
              type="text"
              name="moduleDescription"
              value={serviceList.moduleDescription}
              onChange={(e) => {
                handlecustomchange(e);
              }}
              placeholder="Designing time"
            />

            <Form.Label>Designing Hrs</Form.Label>
            <Form.Control
              type="Number"
              name="designerHours"
              value={serviceList.designerHours}
              onChange={(e) => {
                handlecustomchange(e);
              }}
              placeholder="Designing time"
            />

            <Form.Label>Frontend Dev Hrs</Form.Label>
            <Form.Control
              type="Number"
              name="frontendHours"
              value={serviceList.frontendHours}
              onChange={(e) => {
                handlecustomchange(e);
              }}
              placeholder="Designing time"
            />
            <Form.Label>Backend Dev Hrs</Form.Label>
            <Form.Control
              type="Number"
              name="backendHours"
              value={serviceList.backendHours}
              onChange={(e) => {
                handlecustomchange(e);
              }}
              placeholder="Designing time"
            />
            <Form.Label>Testing (Frontend and Backend)</Form.Label>

            <Form.Control
              type="Number"
              name="testingHours"
              value={serviceList.testingHours}
              onChange={(e) => {
                handlecustomchange(e);
              }}
              placeholder=""
            />
            <button onClick={(e) => addCustomModules(e)} className="btn">
              Save Changes
            </button>
          </div>
        ) : (
          ""
        )}
        {/* <button onClick={() => handleremove(index)} className="btn">
                Remove module
              </button>
              */}
        {/* {formData.length - 1 === index && formData.length < 4 && (
                <button onClick={handleform} className="btn">
                  Add Module
                </button>
              )} */}

        {/* 
            </>
          ); */}
        {/* })} */}

        <button onClick={(e) => download(e)} className="btn">
          Download
        </button>
      </div>
    </>
  );
};

export default HomePage;
