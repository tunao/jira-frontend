export const setAvailableJiraProjects = (state, projects) => {
    state.availableJiraProjects = projects || [];
};

export const setImportedJiraProjects = (state, projects) => {
    state.importedJiraProjects = projects || [];
};

export const setAssignedIssuesFromFeedback = (state, issues) => {
    state.assignedIssues = issues || [];
};

export const setToreAssignedIssuesFromFeedback = (state, issues) => {
    state.toreAssignedIssues = issues || [];
};

export const setIssueTypes = (state, issueTypes) => {
    state.issueTypes = issueTypes || [];
};

export const setIssuesToImport = (state, issues) => {
    state.issuesToImport = issues || [];
};

export const setIsLoadingData = (state, value) => {
    state.isLoadingData = value || false;
};

export const setAllIssues = (state, issues) => {
    state.issues = issues.issues || [];
    state.totalIssueItems = issues.totalItems || 0;
};

export const setUnassignedIssues = (state, issues) => {
    state.unassignedIssues = issues.missing_issues || [];
};

export const setAllFeedback = (state, feedback) => {
    state.feedback = feedback || [];
};

export const setFeedbackFileNames = (state, feedbackFileNames) => {
    state.feedbackFileNames = feedbackFileNames || [];
};

export const setAnnotationFileNames = (state, annotationFileNames) => {
    state.annotationFileNames = annotationFileNames || [];
};

export const setAssignedFeedback = (state, feedback) => {
    state.assignedFeedback = feedback || [];
};

export const setToreAssignedFeedback = (state, feedback) => {
    state.toreAssignedFeedback = feedback || [];
};

export const setUnassignedFeedback = (state, feedback) => {
    state.unassignedFeedback = feedback || [];
};

