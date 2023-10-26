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
        toreAssignedIssues: [],
        issueTypes: [],
        isLoadingData: false,
        issuesToImport: [],
        unassignedIssues: [],
        feedback: [],
        feedbackFileNames: [],
        annotationFileNames: [],
        assignedFeedback: [],
        toreAssignedFeedback: [],
        unassignedFeedback: [],

    },
    mutations,
    actions,

});

export default store;
