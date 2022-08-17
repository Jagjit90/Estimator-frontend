
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button } from "bootstrap";
import Form from "react-bootstrap/Form";
import { Outlet, useNavigate } from "react-router-dom";
import "./module.css";

import { allModulesData } from "./actions/allmodulesdata";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const projectinfo = useSelector((state) => state.moduleData);
  console.log("all modules from reducer", projectinfo);

  const [list, setList] = useState([]);

  useEffect(() => {
    getAllModules();
  }, []);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  const getAllModules = async (e) => {
    const res = await axios
      .get("http://localhost:8000/api/module/getAllModule")
      .then((res) => {
        const data = res.data.data;
        setList(data);
        dispatch(allModulesData(data));

        // navigate('/');
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  };

 const download = (e) => {
  navigate("/download", { replace: true });
  return <Outlet />;
 }



  return (
    <>
      <h2>Please select Your Modules Here</h2>

      {list.map((value, key) => {
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
              {/* <Form.Control type="Number" value={value.designerHours} placeholder="Designing time" />
            // <Form.Label>Backend with database</Form.Label>
            <Form.Control type="Number" placeholder="Backend with database" />
            <Form.Label>Testing (Frontend and Backend)</Form.Label>
            <Form.Control
              type="Number"
              value={value.backendHours}
              placeholder="Testing (Frontend and Backend)"
            />
            <Form.Label>TOTAL</Form.Label>
            <Form.Control type="Number" placeholder="TOTAL" /> */}
            </div>
          </div>
        );
      })}
      <button onClick={(e) => download(e)} className="btn">
        Download
      </button>
    </>
  );
};

export default HomePage;