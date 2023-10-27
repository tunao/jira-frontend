import axios from 'axios';

const JIRA_DASHBOARD_BASE_URL_ISSUES ='http://localhost:9647/hitec/jira/issues'
const JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION ='http://localhost:9647/hitec/jira/issue_feedback'
const JIRA_DASHBOARD_BASE_URL_FEEDBACK ='http://localhost:9647/hitec/jira/feedback'

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

export const actionGetAssignedIssuesFromFeedback = ({commit}, feedbackId) => {
    return new Promise(() => {
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_assigned_issues/${feedbackId}`)
            .then(response => {
                const {data} = response;
                commit("setAssignedIssuesFromFeedback", data);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionGetToreAssignedIssuesFromFeedback = ({commit}, feedbackId) => {
    return new Promise(() => {
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_tore_assigned_issues/${feedbackId}`)
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

export const actionAssignIssuesToFeedback = ({commit}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);

        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/assign_feedback_to_issues`)
            .then(response => {
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionToreAssignIssuesToFeedback = ({commit}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);

        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES_FEEDBACK_RELATION + `/assign_feedback_to_issues_by_tore`)
            .then(response => {
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionDeleteAllIssues = () => {
    return new Promise(() => {
        axios.delete(JIRA_DASHBOARD_BASE_URL_ISSUES+ `/remove_all_issues`)
            .then(response => {
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
            });
    });
};

export const actionAddSelectedIssues = ({commit},{selectedIssuesArray}) => {
    return new Promise(() => {
        axios.post(JIRA_DASHBOARD_BASE_URL_ISSUES + `/add`, {
            jsonObject: selectedIssuesArray,
        })
            .then(response => {
                // const {data} = response
                commit("setIsLoadingData", false);
                return response;
            })
            .catch(e => console.error("Error: "+e))
            .finally(() => {
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

export const actionGetUnassignedIssues = ({commit}, feedback_id) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_unassigned_issues/${feedback_id}`)
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

export const actionGetUnassignedToreIssues = ({commit}, feedback_id) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_ISSUES + `/get_tore_unassigned_issues/${feedback_id}`)
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

export const actionAssignToreCategoriesToFeedback = ({commit}, selectedAnnotationFileName) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/assign_tore_to_feedback/${selectedAnnotationFileName}`)
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

export const actionGetAnnotationNames = ({commit}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all unassigned Issues")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_annotations_names`)
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

export const actionGetFeedback = ({commit}) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get all feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_feedback`)
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

export const actionGetAssignedFeedback = ({ commit }, issueKey) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback");
        axios
            .get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_assigned_feedback/${issueKey}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                },
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

// export const actionGetAssignedFeedback = ({commit}, issueKey) => {
//     return new Promise(() => {
//         commit("setIsLoadingData", true);
//         console.log("get assigned feedback")
//         axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_assigned_feedback/${issueKey}`)
//             .then(response => {
//                 const {data} = response;
//                 commit("setAssignedFeedback", data);
//                 commit("setIsLoadingData", false);
//                 return response;
//             })
//             .catch(e => console.error("Error: "+e))
//             .finally(() => {
//             });
//     });
// };

export const actionGetToreAssignedFeedback = ({commit}, issueKey) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_assigned_tore_feedback/${issueKey}`, {
            headers: {
                'Cache-Control': 'no-cache',
            },
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

export const actionDeleteFeedback = ({commit}, feedbackId) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/delete_feedback/${feedbackId}`)
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

export const actionDeleteAllFeedback = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit("setIsLoadingData", true);
        console.log("Delete all feedback");
        axios.delete(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/delete_all_feedback`)
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

export const actionGetUnassignedFeedback = ({commit}, issueKey) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_unassigned_feedback/${issueKey}`)
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

export const actionGetToreUnassignedFeedback = ({commit}, issueKey) => {
    return new Promise(() => {
        commit("setIsLoadingData", true);
        console.log("get assigned feedback")
        axios.get(JIRA_DASHBOARD_BASE_URL_FEEDBACK + `/get_unassigned_tore_feedback/${issueKey}`)
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
