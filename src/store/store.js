// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        issues: [],
        totalIssueItems: 0,
        availableJiraProjects: [],
        importedJiraProjects: [],
        assignedIssues: [],
        totalAssignedIssueItems: 0,
        toreAssignedIssues: [],
        totalToreAssignedIssueItems: 0,
        issueTypes: [],
        isLoadingData: false,
        issuesToImport: [],
        unassignedIssues: [],
        totalUnassignedIssueItems: 0,
        feedback: [],
        totalFeedbackItems: 0,
        feedbackFileNames: [],
        annotationFileNames: [],
        assignedFeedback: [],
        totalAssignedFeedbackItems: 0,
        toreAssignedFeedback: [],
        totalToreAssignedFeedbackItems: 0,
        unassignedFeedback: [],
        totalUnassignedFeedbackItems: 0,
        dataToExport: [],
        toreDataToExport: [],
        selectedFeedback: "",
        selectedAnnotation: "",

    },
    mutations,
    actions,

});

export default store;
