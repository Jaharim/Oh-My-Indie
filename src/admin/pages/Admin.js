import React, { useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import AddIndie from "../components/AddIndie";

const Admin = (props) => {
  const [backdropStatus, setBackdropStatus] = useState(false);

  const addIndieModalOpenHandler = (event) => {
    event.preventDefault();
    setBackdropStatus(true);
  };

  const addIndieModalCloseHandler = (event) => {
    event.preventDefault();
    setBackdropStatus(false);
  };

  const addIndieHandler = (event) => {
    console.log("good");
  };

  return (
    <div>
      <div>
        <div onClick={addIndieModalOpenHandler}>Add Indie</div>
        {backdropStatus && <Backdrop onClick={addIndieModalCloseHandler} />}
        {backdropStatus && (
          <AddIndie className="addIndie-modal" onSubmit={addIndieHandler} />
        )}
      </div>
      <div>여기는 Edit Indie</div>
      <div>여기는 Delete Indie</div>
    </div>
  );
};

export default Admin;
