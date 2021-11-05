import React from "react";
import AddIndie from "../components/AddIndie";

const Admin = (props) => {
  const addIndieHandler = (event) => {
    console.log("good");
  };

  return (
    <div>
      <AddIndie onSubmit={addIndieHandler} />
      <div>여기는 Edit Indie</div>
      <div>여기는 Delete Indie</div>
    </div>
  );
};

export default Admin;
