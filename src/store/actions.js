import axios from 'axios';
const BASIS_URL = 'http://192.168.178.82:9647'
const JIRA_DASHBOARD_BASE_URL_ISSUES = BASIS_URL + '/hitec/jira/issues'
const JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION = BASIS_URL + '/hitec/jira/issue_feedback'
const JIRA_DASHBOARD_BASE_URL_FEEDBACK = BASIS_URL + '/hitec/jira/feedback'

export const actionGetAllJiraProjects = ({commit}) => {
    return new Promise(() => {
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_all_jira_projects`)
            .then(response => {
                const {data} = response;
                commit("setAvailableJiraProjects", data);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetImportedJiraProjects = ({commit}) => {
    return new Promise(() => {
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/projectNames`)
            .then(response => {
                const {data} = response;
                commit("setImportedJiraProjects", data);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetAssignedIssuesFromFeedback = ({commit}, {feedbackId, page, size}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_assigned_issues/${feedbackId}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setAssignedIssuesFromFeedback", data);
                commit("setIsLoadingData", false);
                console.log("feritg geladen")
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetToreAssignedIssuesFromFeedback = ({commit}, {feedbackId, page, size}) => {
    return new Promise(() => {
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_tore_assigned_issues/${feedbackId}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setToreAssignedIssuesFromFeedback", data);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetIssueTypesByProjectNameFromJira = ({commit}, projectName) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/load/issueTypes/${projectName}`)
            .then(response => {
                const {data} = response;
                commit("setIssueTypes", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetAllIssues = ({commit}, {page, size}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("Fetch all Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/all`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setAllIssues", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetIssuesByProjectNameFromJira = ({commit},{ projectName, selectedIssuesTypesArray}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES + `/load/issues/${projectName}`, {
            jsonObject: selectedIssuesTypesArray,
        })
            .then(response => {
                const {data} = response;
                commit("setIssuesToImport", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionAssignIssuesToFeedback = ({commit}, {selectedFeedback, maxSimilarity}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);

        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/assign_feedback_to_issues/${selectedFeedback}/${maxSimilarity}`)
            .then(response => {
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionToreAssignIssuesToFeedback = ({commit}, {selectedFeedback, maxSimilarity}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);

        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/assign_feedback_to_issues_by_tore/${selectedFeedback}/${maxSimilarity}`)
            .then(response => {
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionDeleteAllIssues = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete issue");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES + `/remove_all_issues`)
            .then(response => {
                console.log("deleted issue");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionGetIssuesWithoutAssignment = ({commit}, {page, size}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Fetch all Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_issues_without_assigned_elements`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setIssuesWithoutAssignment", data);
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionGetSavedDataNames = ({commit}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/get_saved_data_names`)
            .then(response => {
                const {data} = response;
                commit("setSavedData", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetFeedbackWithoutAssignment = ({commit}, {page, size, selectedFeedback}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("Fetch all Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_feedback_without_assigned_elements/${selectedFeedback}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setFeedbackWithoutAssignment", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionAddSelectedIssues = ({commit}, {selectedIssuesArray}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("add issues Projects")
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES + `/add`, {
            jsonObject: selectedIssuesArray,
        })
            .then(response => {
                console.log("filtered Projects")
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionFilterIssuesToAssign = ({commit}, {selectedProjectsArray}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Filter Projects")
        console.log(selectedProjectsArray)
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES + `/issues_to_assign`, {
            selectedProjects: selectedProjectsArray,
        })
            .then(response => {
                console.log("filtered Projects")
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionDeleteProject = ({ commit }, projectName) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete Project");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES + `/delete_project/${projectName}`)
            .then(response => {
                console.log("deleted Project");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionDeleteIssue = ({ commit }, {projectName, issueKey}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete issue");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES + `/delete_issue/${projectName}/${issueKey}`)
            .then(response => {
                console.log("deleted issue");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionGetUnassignedIssues = ({commit}, {feedbackId, page, size}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_unassigned_issues/${feedbackId}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setUnassignedIssues", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetUnassignedToreIssues = ({commit}, {feedbackId, page, size}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_tore_unassigned_issues/${feedbackId}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setUnassignedIssues", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionDeleteIssueFeedbackRelation = ({ commit }, {issueKey, feedbackId}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/delete_feedback/${issueKey}/${feedbackId}`)
            .then(response => {
                console.log("deleted feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionDeleteToreIssueFeedbackRelation = ({ commit }, {issueKey, feedbackId}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/delete_tore_feedback/${issueKey}/${feedbackId}`)
            .then(response => {
                console.log("deleted feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionAddFeedbackToIssue = ({commit}, {projectName, issueKey, selectedFeedback}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("ADD feedback");
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/add_feedback_to_issue`, {
            projectName: projectName,
            issue_key: issueKey,
            selected_feedback: selectedFeedback,
        })
            .then(response => {
                console.log("Added feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionAddToreFeedbackToIssue = ({commit}, {projectName, issueKey, selectedFeedback}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("ADD feedback");
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/add_tore_feedback_to_issue`, {
            projectName: projectName,
            issue_key: issueKey,
            selected_feedback: selectedFeedback,
        })
            .then(response => {
                console.log("Added feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionAddIssueToFeedback = ({commit}, {feedbackId, selectedIssues}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("ADD feedback");
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/add_issue_to_feedback`, {
            feedback_id: feedbackId,
            selected_issues: selectedIssues,
        })
            .then(response => {
                console.log("Added feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionAddIssueToToreFeedback = ({commit}, {feedbackId, selectedIssues}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("ADD feedback");
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/add_issue_to_tore_feedback`, {
            feedback_id: feedbackId,
            selected_issues: selectedIssues,
        })
            .then(response => {
                console.log("Added feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionSaveSelectedFeedback = ({commit}, selectedFeedbackFileName) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/load/${selectedFeedbackFileName}`)
            .then(response => {
                // const {data} = response;
                commit("setSelectedFeedback", selectedFeedbackFileName);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionAssignToreCategoriesToFeedback = ({commit}, {selectedAnnotationFileName, selectedFeedbackFileName}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/assign_tore_to_feedback/${selectedAnnotationFileName}/${selectedFeedbackFileName}`)
            .then(response => {
                // const {data} = response;
                commit("setSelectedAnnotation", selectedAnnotationFileName);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};


export const actionGetFeedbackNames = ({commit}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_feedback_names`)
            .then(response => {
                const {data} = response;
                commit("setFeedbackFileNames", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetAnnotationNames = ({commit}, selectedFeedbackFileName) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get annotations")
        console.log(selectedFeedbackFileName)
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_annotations_names/${selectedFeedbackFileName}`)
            .then(response => {
                const {data} = response;
                commit("setAnnotationFileNames", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetFeedback = ({commit}, {page, size, selectedFeedbackFileName}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_feedback`, {
            params: {
                page: page,
                size: size,
                selectedFeedbackFileName: selectedFeedbackFileName
            }
        })
            .then(response => {
                const {data} = response;
                commit("setAllFeedback", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetSelectedData = ({ commit }, selectedData) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        axios
            .get(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/restore_data/${selectedData}`)
            .then((response) => {
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch((e) => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionDeleteSavedData = ({ commit }, item) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        axios
            .delete(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/delete_data/${item}`)
            .then((response) => {
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch((e) => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionSaveData = ({ commit }, savedDataName) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("save data");

        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/save_data/${savedDataName}`)
            .then(response => {
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(error => {
                commit("setIsLoadingData", false);
                console.error("Error:", error);

                if (error.response && error.response.status === 400) {
                    alert("Name already exists! Please choose a different name.");
                }

                reject(error);
            });
    });
};


export const actionGetAssignedFeedback = ({ commit }, {issueKey, page, size}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback");
        axios
            .get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_assigned_feedback/${issueKey}`, {
                params: {
                    page: page,
                    size: size
                }
            })
            .then((response) => {
                const { data } = response;
                commit("setAssignedFeedback", data);
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch((e) => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionGetToreAssignedFeedback = ({commit}, {issueKey, page, size}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_assigned_tore_feedback/${issueKey}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setToreAssignedFeedback", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionDeleteFeedback = ({commit}, {feedbackId, selectedFeedback}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/delete_feedback/${feedbackId}/${selectedFeedback}`)
            .then(response => {
                console.log("deleted feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionGetAssignedDataToExport = ({commit}, selectedFeedback) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("get assigned data");
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/get_data_to_export/${selectedFeedback}`)
            .then(response => {
                const {data} = response
                console.log(data)
                commit("setDataToExport", data);
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};
export const actionGetToreAssignedDataToExport = ({commit}, selectedFeedback) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("get assigned data");
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/get_data_tore_to_export/${selectedFeedback}`)
            .then(response => {
                const {data} = response
                console.log(data)
                commit("setToreDataToExport", data);
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionDeleteAllFeedback = ({commit}, selectedFeedback) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete all feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/delete_all_feedback/${selectedFeedback}`)
            .then(response => {
                console.log("deleted feedback");
                commit("setSelectedFeedback", "");
                commit("setSelectedAnnotation", "");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionGetUnassignedFeedback = ({commit}, {issueKey, page, size, selectedFeedback}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_unassigned_feedback/${issueKey}/${selectedFeedback}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setUnassignedFeedback", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetToreUnassignedFeedback = ({commit}, {issueKey, page, size, selectedFeedback}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_unassigned_tore_feedback/${issueKey}/${selectedFeedback}`, {
            params: {
                page: page,
                size: size
            }
        })
            .then(response => {
                const {data} = response;
                commit("setUnassignedFeedback", data);
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionCancelLoading = ({commit}) => {
    return new Promise(() => {
        console.log("Cancel Loading")
        commit("setIsLoadingData", false);
    });
};

export const actionDeleteAssignedFeedbackForIssue = ({commit}, issueKey) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete assigned feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/delete_assigned_feedback_for_issue/${issueKey}`)
            .then(response => {
                console.log("deleted feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};

export const actionDeleteToreAssignedFeedbackForIssue = ({commit}, issueKey) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete assigned feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/delete_tore_assigned_feedback_for_issue/${issueKey}`)
            .then(response => {
                console.log("deleted feedback");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};


export const actionDeleteAssignedIssuesForFeedback = ({commit}, feedbackId) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete assigned issues");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/delete_assigned_issues_for_feedback/${feedbackId}`)
            .then(response => {
                console.log("deleted issues");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};


export const actionDeleteToreAssignedIssuesForFeedback = ({commit}, feedbackId) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete assigned issues");
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/delete_tore_assigned_issues_for_feedback/${feedbackId}`)
            .then(response => {
                console.log("deleted issues");
                commit("setIsLoadingData", false);
                resolve(response);
            })
            .catch(e => {
                console.error("Error:", e);
                reject(e);
            });
    });
};
