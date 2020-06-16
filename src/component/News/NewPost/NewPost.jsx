import React from 'react';
import style from './NewPost.module.scss'
import { reduxForm, Field } from 'redux-form';
import { addNews } from './../../../redux/newsReducer'
import { connect } from 'react-redux';
import date from "../../commons/date"

// let date = new Date().toDateString();

let PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={style['theme']}>
                <label htmlFor="newPostTheme">Тема:</label>
                <Field
                    name='newPostTheme'
                    component='input'
                    type='text'
                    id='newPostTheme'
                    placeholder='Тема поста...'
                    required='required'
                />
            </div>
            <div className={style['text']}>
                <Field
                    name='newPostText'
                    component='textarea'
                    id='newPostText'
                    placeholder='Содержание поста...'
                    required='required'
                />
            </div>
            <button  className={style['btn-public']}>Добавить</button>
        </form>
    )
}

const NewPostForm = reduxForm({ form: 'PostForm' })(PostForm)

const NewPost = (props) => {

    const onSubmit = (values) => {
        props.addNews(props.userId, values.newPostTheme, values.newPostText, date());
        props.toggleShowPostForm(false)
    }

    return (
        <div className={style['item']}>
            <div className={style['body__content']}>
                <div className={style['content']}>
                    <NewPostForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        userId: state.auth.userId
    }
}
export default connect(mapStateToProps, { addNews })(NewPost)
