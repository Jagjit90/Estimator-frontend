// ** React Imports
import React from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import "./myStyle.css";

const Download = () => {

const custommode = useSelector((state) => state.custommod.custommodules);
  console.log("custommode===>", custommode);

  const allMenus = useSelector((state) => state.moduleData.allmodules);
  console.log("allmenus===>", allMenus);

  const newData = [];
  if (custommode[0]) {
    custommode.forEach((element) => {
      newData.push(element);
      console.log("element===>", element);
    });

    console.log("data==>updated in new array", newData);
  } else {
    console.log("no data found in array");
  }

  if (allMenus[0]) {
    allMenus.forEach((element) => {
      newData.push(element);
      console.log("element===>", element);
    });

    console.log("data==>updated in new array", newData);
  } else {
    console.log("no data found in array");
  }

  let headers = [
    { label: "ModuleName", key: "moduleName" },
    { label: "Description", key: "moduleDescription" },
    { label: "designer Hours", key: "designerHours" },
    { label: "frontend Hours", key: "frontendHours" },
    { label: "backend Hours", key: "backendHours" },
    { label: "Testing Hours", key: "testingHours" },
  ];
  let data = newData;


  console.log("data====>", data);

  return (
    <>
      <div className="mytable">
        <table style={{ border: "2px solid Black" }}>
          <thead>
            <tr>
              <th>Module Name</th>
              <th>Description</th>
              <th>designer Hours</th>
              <th>frontend Hours</th>
              <th>backend Hours</th>
              <th>Testing Hours</th>
              
            </tr>
          </thead>
          <tbody>
            {data === ""
              ? ""
              : data.map((index, key) => {
                  return (
                    <tr>
                      <td>{index.moduleName}</td>
                      <td>{index.moduleDescription}</td>
                      <td>{index.designerHours}</td>
                      <td>{index.frontendHours}</td>
                      <td>{index.backendHours}</td>
                      <td>{index.testingHours}</td>
                     
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <CSVLink className="btn" data={data} headers={headers}>
          Download me
        </CSVLink>
      </div>
    </>
  );
};

export default Download;
