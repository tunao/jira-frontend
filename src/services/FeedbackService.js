import axios from 'axios'

const ISSUE_API_BASE_URL ='http://localhost:9647/hitec/jira/feedback'

class FeedbackService {

    // saveFeedback(excelData){
    //     return axios.get(ISSUE_API_BASE_URL + `/save_excel_data`, {
    //         params: {
    //             excelData: excelData
    //         }
    //     });
    // }
    assignFeedbackToIssues(){
        return axios.post(ISSUE_API_BASE_URL + `/assign_feedback_to_issues`);
    }

    assignFeedbackToIssuesByTore(){
        return axios.post(ISSUE_API_BASE_URL + `/assign_feedback_to_issues_by_tore`);
    }
    saveSelectedFeedback(feedback_name){
        return axios.get(ISSUE_API_BASE_URL + `/load/${feedback_name}` );
    }

    assignToreCategoriesToFeedback(annotation_name){
        return axios.get(ISSUE_API_BASE_URL + `/assign_tore_to_feedback/${annotation_name}` );
    }

    getFeedbackNames(){
        return axios.get(ISSUE_API_BASE_URL + `/get_feedback_names`);
    }

    getAnnotationsNames(){
        return axios.get(ISSUE_API_BASE_URL + `/get_annotations_names`);
    }

    getFeedback(){
        return axios.get(ISSUE_API_BASE_URL + `/get_feedback`);
    }
}

export default new FeedbackService()