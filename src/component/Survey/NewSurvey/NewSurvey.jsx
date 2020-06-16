import React from 'react';
import style from './NewSurvey.module.scss';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {  toggleShowNewSurvey } from "./../../../redux/surveyReducer";


let SurveyForum = (props) => {
    return (
        <form className={style['content']} onSubmit={props.handleSubmit}>
            <label className={style['theme']} htmlFor="newSurvey">Тема: </label>
            <Field
                component='input'
                type='text'
                required='required'
                name='newSurvey'
            />
            <button className={style['btn']}>Добавить</button>
        </form>
    )
}

SurveyForum = reduxForm({ form: 'surveyForum' })(SurveyForum)

const NewSurvey = (props) => {

    let onSubmit = (values) => {
        props.toggleShowNewSurvey(false)
    }
    return (
        <div className={style['item']}>
            <SurveyForum onSubmit={onSubmit} />
        </div>
    )

};

export default connect(null, {toggleShowNewSurvey})(NewSurvey);