import React, { useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import AddIndie from "../components/AddIndie";
import SearchForDelete from "../components/SearchForDelete";
import SearchForEdit from "../components/SearchForEdit";

const Admin = (props) => {
  const [addBackdropStatus, setAddBackdropStatus] = useState(false);
  const [deleteBackdropStatus, setDeleteBackdropStatus] = useState(false);

  const addIndieModalOpenHandler = (event) => {
    event.preventDefault();
    setAddBackdropStatus(true);
  };

  const addIndieModalCloseHandler = (event) => {
    event.preventDefault();
    setAddBackdropStatus(false);
  };

  const addIndieHandler = (event) => {
    console.log("good");
    setAddBackdropStatus(false);
  };

  const editIndieHandler = (event) => {};

  return (
    <div>
      <div>
        <div onClick={addIndieModalOpenHandler}>Add Indie</div>
        {addBackdropStatus && <Backdrop onClick={addIndieModalCloseHandler} />}
        {addBackdropStatus && (
          <AddIndie className="addIndie-modal" onSubmit={addIndieHandler} />
        )}
      </div>
      <div>
        <SearchForEdit onSubmit={editIndieHandler} />
      </div>
      <div>
        <SearchForDelete />
      </div>
    </div>
  );
};

export default Admin;
