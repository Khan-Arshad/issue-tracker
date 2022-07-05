import React, { useState } from "react";
import { ref, set, serverTimestamp } from "firebase/database";
import { database } from "../firebase";
import { v4 as uuid } from "uuid";

const AddIssue = () => {
  // const db = database;

  const [issueTitle, setIssueTitle] = useState<string>("");
  const [issueLocation, setIssueLocation] = useState<string>("");
  const [issuePriority, setIssuePriority] = useState<string>("Medium");
  const [issueDescription, setIssueDescription] = useState<string>("");
  const [issueStatus, setIssueStatus] = useState<string>("Open");
  let id = "";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIssueTitle(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIssueLocation(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIssueDescription(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setIssuePriority(e.target.value);
  };

  function writeIssueData(
    id: string,
    issueTitle: string,
    issueLocation: string,
    issuePriority: string,
    issueDescription: string,
    issueStatus: string
  ) {
    set(ref(database, "issues/" + id), {
      id: id,
      title: issueTitle,
      location: issueLocation,
      priority: issuePriority,
      description: issueDescription,
      status: issueStatus,
      createdAt: serverTimestamp(),
    });
    console.log("Issue added");
  }

  const handleClick = () => {
    id = uuid();
    setIssueStatus("Open");
    writeIssueData(
      id,
      issueTitle,
      issueLocation,
      issuePriority,
      issueDescription,
      issueStatus
    );
    setIssueTitle("");
    setIssueLocation("");
    setIssuePriority("Medium");
    setIssueDescription("");
  };

  return (
    <div className="">
      <form className="bg-white shadow-md rounded px-8 py-4 mb-4 flex flex-col sm:flex-row justify-between">
        <div className="mb-4 sm:mb-0 mx-1">
            <input
              className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={issueTitle}
              onChange={handleTitleChange}
              placeholder="Issue Title"
            />
        </div>
        <div className="mb-4 sm:mb-0 mx-1">
            <input
              className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={issueLocation}
              onChange={handleLocationChange}
              placeholder="Issue Location"
            />
        </div>
        <div className="mb-4 sm:mb-0 mx-1">
            <input
              className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={issueDescription}
              onChange={handleDescriptionChange}
              placeholder="Issue Description"
            />
        </div>
          <select
            className="text-white bg-gray-700 py-1 px-1 my-2 rounded focus:outline-none focus:shadow-outline"
            value="Priority"
            onChange={handlePriorityChange}
          >
            <option className="text-white bg-gray-700" value="none" disabled>
              Issue Priority
            </option>
            <option className="bg-blue-700 hover:bg-blue-700" value="Low">
              Low
            </option>
            <option
              className="bg-orange-700 hover:bg-orange-700"
              value="Medium"
            >
              Medium
            </option>
            <option className="bg-red-700 hover:bg-red-700" value="High">
              High
            </option>
          </select>
        <div className="mb-4 sm:mb-0 mx-1 flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIssue;
