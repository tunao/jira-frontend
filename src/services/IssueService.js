import axios from 'axios'

const ISSUE_API_BASE_URL ='http://localhost:8081/hitec/jira'

class IssuesService {

    importIssues(issues){
        var parsedobj = JSON.parse(JSON.stringify(issues))
        return axios.post(ISSUE_API_BASE_URL + '/issues/import', {
            jsonObject: parsedobj,
        })
    }
    addIssues(issues){
        var parsedobj = JSON.parse(JSON.stringify(issues))
        return axios.post(ISSUE_API_BASE_URL + '/issues/add', {
            jsonObject: parsedobj,
        })
    }
    getIssueTypesByProjectName(projectName){
        return axios.get(ISSUE_API_BASE_URL + `/issues/load/issueTypes/${projectName}`);
    }
    getProjectNames(){
        return axios.get(ISSUE_API_BASE_URL + `/projectNames`);
    }
    getIssuesByTypes(projectName, issueTypes){
        console.log(projectName)
        var parsedobj = JSON.parse(JSON.stringify(issueTypes))
        console.log(parsedobj)
        return axios.post(ISSUE_API_BASE_URL + `/issues/load/issues/${projectName}`, {
            jsonObject: parsedobj,
        });
    }
    getAllIssues(page, size){
        return axios.get(ISSUE_API_BASE_URL + `/issues/all`, {
            params: {
                page: page,
                size: size
            }
        });
    }
    saveFeedback(excelData){
        return axios.get(ISSUE_API_BASE_URL + `/save_excel_data`, {
            params: {
                excelData: excelData
            }
        });
    }
    getFeedback(){
        return axios.get(ISSUE_API_BASE_URL + `/feedback/load`);
    }
    getFeedbackAssigned(){
        return axios.get(ISSUE_API_BASE_URL + `/feedback-assigned/load`);
    }
}

export default new IssuesService()