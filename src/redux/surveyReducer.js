import { pollsAPI } from '../API/API'

let initialState = {
    survey: [],
    isToggleShowNewSurvey: false
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POLL':
            return {
                ...state,
                survey: action.payload
            }
        case 'TOGGLE_SHOW_NEW_SURVEY':
        return {
            ...state,
            isToggleShowNewSurvey: action.payload
        }
        default:
            return state;
    }

};

export const toggleShowNewSurvey = (isToggleShow) => ({type: 'TOGGLE_SHOW_NEW_SURVEY', payload: isToggleShow})
export const setNewAnswers = (answer, id) => ({ type: "SET_NEW_ANSWERS", answer, id });
export const setPolls = (poll) => ({ type: "SET_POLL", payload: poll });

export default surveyReducer;

export const getPolls = () => (dispatch) => {
    pollsAPI.getPolls()
        .then(response => {
            dispatch(setPolls((response.data)))
        })
}