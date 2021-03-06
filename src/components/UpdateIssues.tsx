import React, { useState } from "react";
import { ref, update, remove } from "firebase/database";
import { database } from "../firebase";
import DeleteConfirmation from "./DeleteConfirmation";

const UpdateIssues = ({
  id,
  inProgress,
  resolved,
  priority,
}: {
  id: string;
  priority: string;
  inProgress: boolean;
  resolved: boolean;
}) => {
  const [popup, setPopup] = useState<any>({
    show: false,
    id: null,
  });

  const IssueId = id;

  // Progress

  const updateProgress = () => {
    update(ref(database, "issues/" + id), {
      inProgress: !inProgress,
    });
    console.log("Issue Progress updated");
  };

  const handleProgress = () => {
    updateProgress();
  };

  // Resolved

  const updateResolved = () => {
    update(ref(database, "issues/" + id), {
      resolved: !resolved,
    });
    console.log("Issue Resolved updated");
  };
  const handleResolved = () => {
    updateResolved();
  };

  //   Delete

  const deleteIssue = () => {
    remove(ref(database, "issues/" + IssueId));
    console.log("Issue deleted");
  };

  // This will show the Cofirmation Box

  const handleDelete = () => {
    setPopup({
      show: true,
      id: IssueId,
    });
  };

  // This will perform the deletion and hide the Confirmation Box

  const handleDeleteTrue = () => {
    if (popup.show && popup.id) {
      deleteIssue();
      setPopup({
        show: false,
        id: null,
      });
    }
  };

  // This will just hide the Confirmation Box when user clicks "No"/"Cancel"

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  return (
    <div>
      {inProgress && !resolved ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
          onClick={handleProgress}
        >
          In Progress
        </button>
      ) : !inProgress && !resolved ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
          onClick={handleProgress}
        >
          Not in Progress
        </button>
      ) : (
        <></>
      )}

      {resolved && inProgress ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
          onClick={handleResolved}
        >
          Unmark
        </button>
      ) : !resolved && inProgress ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
          onClick={handleResolved}
        >
          Mark as done
        </button>
      ) : (
        <></>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 rounded focus:outline-none focus:shadow-outline px-2"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
      {popup.show ? (
        <DeleteConfirmation
          id={popup.id}
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      ) : null}
    </div>
  );
};

export default UpdateIssues;
