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

  const [issueInProgress, setIssueInProgress] = useState<boolean>(false);
  const [issueResolved, setIssueResolved] = useState<boolean>(false);

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
    inProgress: boolean,
    resolved: boolean
  ) {
    set(ref(database, "issues/" + id), {
      id: id,
      title: issueTitle,
      location: issueLocation,
      priority: issuePriority,
      description: issueDescription,
      inProgress: false,
      resolved: false,
      createdAt: serverTimestamp(),
    });
    console.log("Issue added");
  }

  const handleClick = () => {
    id = uuid();
    setIssueInProgress(false);
    setIssueResolved(false);
    writeIssueData(
      id,
      issueTitle,
      issueLocation,
      issuePriority,
      issueDescription,
      issueInProgress,
      issueResolved
    );
    setIssueTitle("");
    setIssueLocation("");
    setIssuePriority("Medium");
    setIssueDescription("");
  };

  return (
    <div className="">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  mr-2 flex flex-col sm:flex-row">
        <div className="mb-4  mr-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Title:
            <input
              className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={issueTitle}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div className="mb-4  mr-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Location:
            <input
              className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={issueLocation}
              onChange={handleLocationChange}
            />
          </label>
        </div>
        <div className="mb-4  mr-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Description:
            <input
              className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={issueDescription}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <div className="mb-4  mr-2">
          <label className=" text-gray-700 text-sm font-bold mb-2 pr-20">
            Issue Priority:
          </label>
          <select
            className="text-white bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            value={issuePriority}
            onChange={handlePriorityChange}
          >
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
        </div>
        <div className="mb-4  mr-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            Add Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIssue;
