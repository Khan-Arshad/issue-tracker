import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import UpdateIssues from "./UpdateIssues";

const ViewIssue = () => {
  const [data, setData] = useState<any>();

  const fetchData = () => {
    const issuesRef = ref(database, "issues");
    onValue(issuesRef, (snapshot) => {
      if (snapshot.exists()) {
        const issue = snapshot.val();
        console.log(issue);
        const issues = Object.values(issue) || [];
        setData(issues);
        console.log(data);
      } else {
        setData([]);
        console.log("No data available");
      }
    });
  };

  const priorityRating = (priority: string) => {
    if (priority === "High") {
      return <span className="text-red-500">{priority}</span>;
    } else if (priority === "Medium") {
      return <span className="text-orange-500">{priority}</span>;
    } else {
      return <span className="text-green-500">{priority}</span>;
    }
  };

  const date = (createdAt: string) => {
    const dateObj = new Date(createdAt);
    const dateString = dateObj.toLocaleDateString();
    return dateString;
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col sm:flex-row">
      <ul>
        {!data ? (
          <></>
        ) : (
          data.map(
            ({
              id,
              title,
              location,
              priority,
              description,
              createdAt,
              inProgress,
              resolved,
            }: {
              id: string;
              title: string;
              location: string;
              priority: string;
              description: string;
              createdAt: string;
              inProgress: boolean;
              resolved: boolean;
            }) => (
              <li
                key={id}
                className="text-gray-700 text-sm font-bold mb-2 border-b border-gray-500"
              >
                <div className="flex-row">
                  <h1 className="sm:inline pr-4">Title: {title}</h1>
                  <h1 className="sm:inline pr-4">Location: {location}</h1>
                  <h1 className="sm:inline pr-4">
                    Priority: {priorityRating(priority)}
                  </h1>
                  <h1 className="sm:inline pr-4">Date: {date(createdAt)}</h1>
                </div>
                <h1>Description: {description}</h1>
                <UpdateIssues
                  id={id}
                  inProgress={inProgress}
                  resolved={resolved}
                  priority={priority}
                />
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
};

export default ViewIssue;
