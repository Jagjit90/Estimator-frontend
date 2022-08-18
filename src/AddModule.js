import React from "react";
import "./module.css";
import Form from "react-bootstrap/Form";
import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils";

const AddModule = ({ serviceList, setServiceList }) => {
  const handlecustomchange = (e) => {
    e.preventDefault();
    setServiceList([serviceList, {[e.target.name]: e.target.value} ]);
  };

  return (
    <>
      <div className="submode">
        <Form.Label>Module Name</Form.Label>
        <Form.Control
          type="text"
          name="m_title"
          value={serviceList.m_title}
          onChange={(e) => {
            handlecustomchange(e);
          }}
          placeholder="Designing time"
        />
        <Form.Label>Module Description</Form.Label>

        <Form.Control
          type="text"
          name="m_Desc"
          value={serviceList.m_Desc}
          onChange={(e) => {
            handlecustomchange(e);
          }}
          placeholder="Designing time"
        />

        <Form.Label>Designing Hrs</Form.Label>
        <Form.Control
          type="Number"
          name="m_design_time"
          value={serviceList.m_design_time}
          onChange={(e) => {
            handlecustomchange(e);
          }}
          placeholder="Designing time"
        />

        <Form.Label>Frontend Dev Hrs</Form.Label>
        <Form.Control
          type="Number"
          name="m_frontend"
          value={serviceList.m_frontend}
          onChange={(e) => {
            handlecustomchange(e);
          }}
          placeholder="Designing time"
        />
        <Form.Label>Backend Dev Hrs</Form.Label>
        <Form.Control
          type="Number"
          name="m_backend"
          value={serviceList.m_backend}
          onChange={(e) => {
            handlecustomchange(e);
          }}
          placeholder="Designing time"
        />
        <Form.Label>Testing (Frontend and Backend)</Form.Label>
        <Form.Control
          type="Number"
          name="m_testing"
          value={serviceList.m_testing}
          onChange={(e) => {
            handlecustomchange(e);
          }}
          placeholder=""
        />
      </div>
    </>
  );
};

export default AddModule;
