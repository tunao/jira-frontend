export const setAvailableJiraProjects = (state, projects) => {
    state.availableJiraProjects = projects || [];
};

export const setImportedJiraProjects = (state, projects) => {
    state.importedJiraProjects = projects || [];
};

export const setAssignedIssuesFromFeedback = (state, issues) => {
    state.assignedIssues = issues.related_issues || [];
    state.totalAssignedIssueItems = issues.totalItems || 0;
};

export const setToreAssignedIssuesFromFeedback = (state, issues) => {
    state.toreAssignedIssues = issues.related_issues || [];
    state.totalToreAssignedIssueItems = issues.totalItems || 0;
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

export const setDataToExport = (state, value) => {
    state.dataToExport = value || [];
};

export const setToreDataToExport = (state, value) => {
    state.toreDataToExport = value || [];
};

export const setAllIssues = (state, issues) => {
    state.issues = issues.issues || [];
    state.totalIssueItems = issues.totalItems || 0;
};

export const setUnassignedIssues = (state, issues) => {
    state.unassignedIssues = issues.missing_issues || [];
    state.totalUnassignedIssueItems = issues.totalItems || 0;
};

export const setAllFeedback = (state, feedback) => {
    state.feedback = feedback.feedback || [];
    state.totalFeedbackItems = feedback.totalItems || 0;
};

export const setFeedbackFileNames = (state, feedbackFileNames) => {
    state.feedbackFileNames = feedbackFileNames || [];
};

export const setAnnotationFileNames = (state, annotationFileNames) => {
    state.annotationFileNames = annotationFileNames || [];
};

export const setAssignedFeedback = (state, feedback) => {
    state.assignedFeedback = feedback.feedback || [];
    state.totalAssignedFeedbackItems = feedback.totalItems || 0;
};

export const setToreAssignedFeedback = (state, feedback) => {
    state.toreAssignedFeedback = feedback.feedback || [];
    state.totalToreAssignedFeedbackItems = feedback.totalItems || 0;
};

export const setUnassignedFeedback = (state, feedback) => {
    state.unassignedFeedback = feedback.feedback || [];
    state.totalUnassignedFeedbackItems = feedback.totalItems || 0;
};

