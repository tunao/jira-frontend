import axios from 'axios'

const ISSUE_API_BASE_URL ='http://localhost:8080/hitec/jira'

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
}

export default new IssuesService()