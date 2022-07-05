import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

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
      <div className="modal_box flex flex-col sm:flex-row justify-center items-center">
        <p>Confirm delete?</p>
        <div>
          <button
            onClick={handleDeleteFalse}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
          >
            <XCircleIcon className="h-5 w-8 text-white" />
          </button>
          <button
            onClick={handleDeleteTrue}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
          >
            <CheckCircleIcon className="h-5 w-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
