
import React from "react";


const Logout = () => {
  localStorage.removeItem("security");

  return (
    <>
 
      <h2>Logout Successfully</h2>
    </>
  );
};
export default Logout;