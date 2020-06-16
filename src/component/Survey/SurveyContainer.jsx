import React from 'react'
import { connect } from 'react-redux'
import Survey from './Survey'
import { setNewAnswers, getPolls, toggleShowNewSurvey } from "../../redux/surveyReducer";


class SurveyContainer extends React.Component {

    componentDidMount(){
        this.props.getPolls()
    }
    render() {
        return <>
            <Survey {...this.props} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        survey: state.surveyPage.survey,
        isToggleShowNewSurvey: state.surveyPage.isToggleShowNewSurvey
    }
}

export default connect(mapStateToProps, { setNewAnswers, getPolls, toggleShowNewSurvey })(SurveyContainer)