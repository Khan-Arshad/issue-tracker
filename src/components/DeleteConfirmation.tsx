import React from "react";

const DeleteConfirmation = ({
  handleDeleteTrue,
  handleDeleteFalse,
  id,
}: {
  handleDeleteTrue: any;
  handleDeleteFalse: any;
  id: string;
}) => {
  return (
    <div className="modal">
      <div className="modal_box">
        <p>Are you sure you wanna delete?</p>
        <button
          onClick={handleDeleteFalse}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteTrue}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
