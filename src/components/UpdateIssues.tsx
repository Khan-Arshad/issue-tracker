import React, { Dispatch, useState, useEffect, SetStateAction } from "react";
import { ref, update, remove } from "firebase/database";
import { database } from "../firebase";
import DeleteConfirmation from "./DeleteConfirmation";


const UpdateIssues = ({
  id,
  status,
  priority,
  setFilter,
}: {
  id: string;
  status: string;
  priority: string;
  setFilter: Dispatch<SetStateAction<any>>;
}) => {
  const [issueStatus, setIssueStatus] = useState<string>("Open");
  const [issuePriority, setIssuePriority] = useState<string>(priority);
  const [popup, setPopup] = useState<any>({
    show: false,
    id: null,
  });

  const IssueId = id;

  // Status

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setIssueStatus(e.target.value);
  };

  // Priority
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setIssuePriority(e.target.value);
  };

  //   Delete

  const deleteIssue = () => {
    remove(ref(database, "issues/" + IssueId));
    setFilter("all");
    console.log("Issue deleted");
  };

  // Show the Confirmation Box

  const handleDelete = () => {
    setPopup({
      show: true,
      id: IssueId,
    });
  };

  // Run delete and hide the Confirmation Box

  const handleDeleteTrue = () => {
    if (popup.show && popup.id) {
      deleteIssue();
      setPopup({
        show: false,
        id: null,
      });
    }
  };

  // Hide the Confirmation Box when user clicks "No"/"Cancel"

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  useEffect(() => {
    const priorityChange = () => {
      update(ref(database, "issues/" + id), {
        priority: issuePriority,
      });
    };
    const statusChange = () => {
      update(ref(database, "issues/" + id), {
        status: issueStatus,
      });
    };

    statusChange();

    priorityChange();
  }, [issuePriority, issueStatus, id]);

  return (
    <div className=" flex flex-col">
      <select
        className="text-white text-sm bg-gray-700 py-1 px-1 m-2 rounded focus:outline-none focus:shadow-outline"
        value={issueStatus}
        onChange={handleStatusChange}
      >
        <option className="" value="Open">
        Open
        </option>
        <option className="" value="In Progress">
          In Progress
        </option>
        <option className="" value="Resolved">
          Resolved
        </option>
      </select>

      <select
        className="text-white bg-gray-700 m-2 py-1 px-1 rounded focus:outline-none focus:shadow-outline"
        value={issuePriority}
        onChange={handlePriorityChange}
      >
        <option className="" value="Low">
          Low
        </option>
        <option className="" value="Medium">
          Medium
        </option>
        <option className="" value="High">
          High
        </option>
      </select>
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
