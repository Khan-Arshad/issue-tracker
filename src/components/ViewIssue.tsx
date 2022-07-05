import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import UpdateIssues from "./UpdateIssues";
import { date, priorityRating, statusRating } from "../functions/functions";
import IssueTagToggle from "./issueTagToggle";

const ViewIssue = () => {
  const [data, setData] = useState<any>([]);
  const [issues, setIssues] = useState<any>([]);
  const [filter, setFilter] = useState<string>("all");

  const fetchData = () => {
    const issuesRef = ref(database, "issues");
    onValue(issuesRef, (snapshot) => {
      if (snapshot.exists()) {
        const issue = snapshot.val();
        console.log(`View issues is ${JSON.stringify(issue)}`);
        const issues = Object.values(issue) || [];
        setData(issues);
        console.log(`ViewIssue data is ${data}`);
      } else {
        setData([]);
        console.log("No data available");
      }
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" bg-white shadow-md rounded p-8 mb-4 flex flex-col ">
      <IssueTagToggle
        data={data}
        setFilter={setFilter}
        filter={filter}
        issues={issues}
        setIssues={setIssues}
      />
      <ul className=" border-t-4 border-gray-500">
        {!issues ? (
          <></>
        ) : (
          issues.map(
            ({
              id,
              title,
              location,
              priority,
              description,
              createdAt,
              status,
            }: {
              id: string;
              title: string;
              location: string;
              priority: string;
              description: string;
              createdAt: string;
              status: string;
            }) => (
              <li
                key={id}
                className="text-gray-700 text-sm font-bold mb-2 border-b-4 border-gray-500"
              >
                <div className=" flex flex-row justify-between">
                  <div className="flex flex-col justify-between">
                    <h1 className="pr-4">Title: {title}</h1>
                    <h1 className="pr-4">Location: {location}</h1>
                    <h1 className="pr-4 border-b border-gray-500">
                      Description: {description}
                    </h1>
                    <div>
                      <h1 className="sm:inline pr-4">
                        Date: {date(createdAt)}
                      </h1>
                      <h1 className="sm:inline pr-4">
                        Priority: {priorityRating(priority)}
                      </h1>
                      <h1 className="sm:inline pr-4">
                        Status: {statusRating(status)}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <UpdateIssues
                      id={id}
                      status={status}
                      priority={priority}
                      setFilter={setFilter}
                    />
                  </div>
                </div>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
};

export default ViewIssue;
