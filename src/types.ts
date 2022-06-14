export type Issue = {
  id: string;
  issueTitle: string;
  issueLocation: string;
  issuePriority: issuePriorityLevel;
  issueDescription: string;
  issueInProgress: boolean;
  issueResolved: boolean;
  CreatedAt: Date;
};

export enum issuePriorityLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
