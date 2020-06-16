import React from 'react';
import style from './NewForum.module.scss'
import { reduxForm, Field } from 'redux-form';

let date = new Date().toDateString();

let ForumForm = (props) => {
    return (
        <form className={style['content']} onSubmit={props.handleSubmit}>
            <label className={style['theme']} htmlFor="newSurvey">Тема: </label>
            <Field
                component='input'
                type='text'
                required='required'
                name='newPostTheme'
            />
            <button className={style['btn']}>Добавить</button>
        </form>
    )
}

ForumForm = reduxForm({ form: 'forumForm' })(ForumForm)

const NewForum = (props) => {

    const onSubmit = (values) => {
        props.addForum(props.userId, values.newPostTheme, date)
        props.toggleShowPostForm(false)
    }
    return (
        <div className={style['item']}>
            <ForumForm onSubmit={onSubmit} />
        </div>
    );
}

export default NewForum;