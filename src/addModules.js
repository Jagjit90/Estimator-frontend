import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Outlet, useNavigate } from "react-router-dom";
import "./module.css";

import { allModulesData } from "./actions/allmodulesdata";
import { customModules } from "./actions/custom_modules";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { current } from "@reduxjs/toolkit";

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState([]);
  const [updateform, setUpdateform] = useState(false);

  const [serviceList, setServiceList] = useState({
    moduleName: "",
    moduleDescription: "",
    designerHours: "",
    frontendHours: "",
    backendHours: "",
    testingHours: "",
  });
  const [formData, setFormData] = useState([serviceList]);
  // for updating your database data from api
  const [dbMod, setDbMod] = useState({
    moduleName: "",
    moduleDescription: "",
    designerHours: "",
    frontendHours: "",
    backendHours: "",
    testingHours: "",
  });

  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const customModulesdata = useSelector(
    (state) => state.custommod.custommodules
  );



  const projectinfo = useSelector((state) => state);

  useEffect(() => {
    getAllModules();
  }, []);

  useEffect(() => {
    // console.log("list", list);
  }, [list]);

  const getAllModules = async (e) => {
    await axios
      .get("http://localhost:8000/api/module/getAllModule")
      .then((res) => {
        const data = res.data.data;
        setList(data);
        dispatch(allModulesData(data));
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  };

  const updateOriginalModules = (e) => {
    setDbMod({ ...dbMod, [e.target.name]: e.target.value });
  };

  const handleModule = (e) => {
  
    const listing2 =list &&
      list.map((item, index) => {
        if (item._id === dbMod._id) {
          return (item = dbMod);
        }
        return item;
      });
    setList(listing2);
    dispatch(allModulesData(listing2));
    setUpdateform(false);
  };

  // on save button
  const addCustomModules = (e) => {
    setForm([...form, serviceList]);
    dispatch(customModules([...form, serviceList]));
  };

  const handleremove = (index) => {

   setList((current) =>
      current.filter((obj) => {
        return obj._id !== index._id;
      })
    );
  };

  const handleremovecustom = (index) => {
    form.splice(index, 1);
    setForm([...form]);
    dispatch(customModules([...form]));
  };

  const handleupdate = (id) => {
    setUpdateform(true);
    const found = list.find((obj) => {
      return obj._id === id;
    });

    setDbMod(found);
    console.log("found===>", found);
  };

  const handleeditcustom = (index) => {
    console.log("index===>update", index);
  };

  const handlecustomchange = (e) => {
    e.preventDefault();
    setServiceList({ ...serviceList, [e.target.name]: e.target.value });
  };

  const download = (e) => {
    navigate("/download");
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
                  <div className="topeditsec">
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      onClick={(e) => {
                        handleremove(value);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={(e) => {
                        handleupdate(value._id);
                      }}
                    />

                  
                  </div>

                  <h5>{value.moduleName}</h5>
                  <p>{value.moduleDescription}</p>
                  <Form.Label>Designing Hrs</Form.Label>
                  <Form.Control
                    type="Number"
                    name="designerHours"
                    value={value.designerHours}
                    placeholder="Designing time"
                  />

                  <Form.Label>Frontend Dev Hrs</Form.Label>
                  <Form.Control
                    type="Number"
                    value={value.frontendHours}
                    name="frontendHours"
                    placeholder="Designing time"
                  />
                  <Form.Label>Backend Dev Hrs</Form.Label>
                  <Form.Control
                    type="Number"
                    value={value.backendHours}
                    name="backendHours"
                    placeholder="Designing time"
                  />
                  <Form.Label>Testing (Frontend and Backend)</Form.Label>
                  <Form.Control
                    type="Number"
                    value={value.testingHours}
                    name="testingHours"
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
                      <div className="topeditsec">
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          onClick={(e) => {
                            handleremovecustom(key);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={(e) => {
                            handleeditcustom(key);
                          }}
                        />
                      </div>
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

      
        <button onClick={(e) => download(e)} className="btn">
          Download
        </button>
      </div>
      {console.log(updateform === true, "neha")}

      {updateform === true ? (
        <div className="myupdatemodule1">
          <div className="submode1">
            <FontAwesomeIcon
              icon={faXmarkCircle}
              onClick={() => setUpdateform(false)}
            />
            <Form.Label>
              <h3>Update Module Data</h3>
            </Form.Label>
            <Form.Control
              type="text"
              name="moduleName"
              value={dbMod.moduleName}
              onChange={(e) => {
                updateOriginalModules(e);
              }}
              placeholder="Designing time"
            />
            <Form.Label>Module Description</Form.Label>

            <Form.Control
              type="text"
              name="moduleDescription"
              value={dbMod.moduleDescription}
              onChange={(e) => {
                updateOriginalModules(e);
              }}
              placeholder="Designing time"
            />

            <Form.Label>Designing Hrs</Form.Label>
            <Form.Control
              type="Number"
              name="designerHours"
              value={dbMod.designerHours}
              onChange={(e) => {
                updateOriginalModules(e);
              }}
              placeholder="Designing time"
            />

            <Form.Label>Frontend Dev Hrs</Form.Label>
            <Form.Control
              type="Number"
              name="frontendHours"
              value={dbMod.frontendHours}
              onChange={(e) => {
                updateOriginalModules(e);
              }}
              placeholder="Designing time"
            />
            <Form.Label>Backend Dev Hrs</Form.Label>
            <Form.Control
              type="Number"
              name="backendHours"
              value={dbMod.backendHours}
              onChange={(e) => {
                updateOriginalModules(e);
              }}
              placeholder="Designing time"
            />
            <Form.Label>Testing (Frontend and Backend)</Form.Label>

            <Form.Control
              type="Number"
              name="testingHours"
              value={dbMod.testingHours}
              onChange={(e) => {
                updateOriginalModules(e);
              }}
              placeholder=""
            />

            <button onClick={(e) => handleModule(e)} className="btn">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HomePage;
