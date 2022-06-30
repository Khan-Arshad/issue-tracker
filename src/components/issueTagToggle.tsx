import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const IssueTagToggle = ({
  data,
  setFilter,
  filter,
  issues,
  setIssues,
}: {
  data: any;
  setFilter: Dispatch<SetStateAction<any>>;
  filter: string;
  issues: any;
  setIssues: Dispatch<SetStateAction<any>>;
}) => {
  const [value, setValue] = useState<string>("all");

  const buttonAll = document.querySelectorAll(".active");

  const changeFilterValue = (e: any) => {
    const buttonValue = e.target.value;
    const button = document.getElementById(e.target.value);

    buttonAll.forEach((button) => button.classList.remove("active"));

    if (value === buttonValue) {
      setValue("all");
      setFilter("all");
    } else {
      setValue(buttonValue);
      setFilter(buttonValue);
      button?.classList.add("active");
    }
  };

  const filterIssues = (value: string) => {
    const filtered = data.filter((e: any) => e.priority.includes(value));
    setIssues(filtered);
    console.log(issues);
    console.log(filtered);
    console.log("filter function");
  };

  useEffect(() => {
    setFilter(value);
    if (value === "all") {
      setIssues(data);
      console.log(issues);
      console.log("all");
    } else {
      filterIssues(value);
      console.log(issues);
      console.log("useEffect");
    }

    console.log(`Toggle value is ${value}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="flex py-2">
      <div className="pr-6">
        <h3>Sort By:</h3>
      </div>
      <div>
        <button
          value="Low"
          id="Low"
          className={
            " bg-blue-500 hover:bg-blue-700  text-white text-xs font-bold py-1 px-2 mx-2 rounded focus:outline-none focus:shadow-outline"
          }
          onClick={(e) => changeFilterValue(e)}
        >
          Low
        </button>
        <button
          value="Medium"
          id="Medium"
          className={
            " bg-blue-500 hover:bg-blue-700  text-white text-xs font-bold py-1 px-2 mx-2 rounded focus:outline-none focus:shadow-outline"
          }
          onClick={(e) => changeFilterValue(e)}
        >
          Medium
        </button>
        <button
          value="High"
          id="High"
          className={
            " bg-blue-500 hover:bg-blue-700  text-white text-xs font-bold py-1 px-2 mx-2 rounded focus:outline-none focus:shadow-outline"
          }
          onClick={(e) => changeFilterValue(e)}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default IssueTagToggle;
