import React from "react";

import AddIssue from "./components/AddIssue";
import ViewIssue from "./components/ViewIssue";

function App() {
  return (
    <div className="bg-black  min-h-screen mx-auto px-2 py-4 flex flex-col  items-center ">
      <h1 className="text-gray-300 text-xl font-bold mb-2 ">Issue Tracker</h1>
      <div className="  justify-between items-center">
        <AddIssue />
        <ViewIssue />
      </div>
    </div>
  );
}

export default App;
