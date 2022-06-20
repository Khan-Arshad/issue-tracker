import React from "react";

// Priority rating function

export const priorityRating = (priority: string) => {
  if (priority === "High") {
    return <span className="text-red-500">{priority}</span>;
  } else if (priority === "Medium") {
    return <span className="text-orange-500">{priority}</span>;
  } else {
    return <span className="text-green-500">{priority}</span>;
  }
};

// Date function

export const date = (createdAt: string) => {
  const dateObj = new Date(createdAt);
  const dateString = dateObj.toLocaleDateString();
  return dateString;
};
