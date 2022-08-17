
// ** React Imports
import React from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
// import "./myStyle.css";

const Download = () => {
  const projectBasic = useSelector(
    (state) => state.userProject.projectinfo.data
  );
  console.log(projectBasic, "projectBasic");

  const allMenus = useSelector((state) => state.moduleData.allmodules);
  console.log(allMenus, "allmenus");

const newData=[projectBasic,...allMenus]
console.log("new data",newData)
//   let headers = [
//     { label: "project Name", key: "firstName" },
//     { label: "project Name", key: "details.firstName" },
   
//   ];

//   let newHeader=[
//  { details: { label: "Module Name", key: "moduleName" },
//     { label: "Description", key: "moduleDescription" },
//     { label: "designer Hours", key: "designerHours" },
//     { label: "frontend Hours", key: "frontendHours" },
//     { label: "backend Hours", key: "backendHours" },
//     { label: "Testing Hours", key: "testingHours" }}
//   ]
//   let Newheader = [
//     { details: { label: "Description", key: "moduleDescription" }, job: 'manager'},
//     { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
//     { details: { firstName: 'hfhgfh', lastName: 'gfhfg' }, job: 'develogfhgfhper'},
//   ];

let headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" }
];
let data = [
  // { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  // { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  // { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];
allMenus && allMenus.map((item, index) => {
  let obj = {}
  obj.projectName = item.projectName
  obj.moduleName = item.moduleName
  obj.moduleDescription = item.moduleDescription

})
  // let data = Newheader;

  return (
    <>
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
          {allMenus.map((index, key) => {
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

      {/* <CSVLink className="btn" data={data} headers={headers}>
        Download me
      </CSVLink>; */}
      <CSVLink data={data} headers={headers}>
        Download me
      </CSVLink>;
    </>
  );
};

export default Download;