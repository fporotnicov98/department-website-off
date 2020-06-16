import React from 'react';
import style from './ForumItem.module.scss';
import { Field, reduxForm } from 'redux-form';
import ShowModalConfirmDeleteForumMessage from '../../commons/removeForumMessageModal';
import date from '../../commons/date'
import Login from '../../Auth/Login/Login';



let NewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="newPostText">Текст сообщения:</label>
            <div className={style['text']}>
                <Field
                    name='newPostText'
                    component='textarea'
                    id='newPostText'
                    placeholder='Содержание поста...'
                    required='required'
                />
            </div>
            <button className={style['btn-public']}>Отправить</button>
        </form>
    )
}

NewMessageForm = reduxForm({ form: 'PostForm' })(NewMessageForm)

export const NewMessage = (props) => {
    const onSubmit = (values) => {
        props.addForumMessage(props.forumId, props.userId, values.newPostText, date());
        props.getForumItem(props.forumId)
    }
    return (
        <div className={style['form-item']}>
            <div className={style['body__content']}>
                <div className={style['form-content']}>
                    <NewMessageForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}
class ForumItem extends React.Component {
    state = {
        updateId: [],
        removeId: null,
        isToggleShowPostForm: false,
        isShowModal: false,
        isShowAuth: false
    }
    openAuth = () => {
        this.setState({ isShowAuth: true })
    }
    closeAuth = () => {
        this.setState({ isShowAuth: false })
    }
    openModal = () => {
        this.setState({ isShowModal: true })
    }
    closeModal = () => {
        this.setState({ isShowModal: false })
    }
    setRemoveId = (id) => {
        this.setState({ removeId: id })
    }
    updateText = (e) => {
        this.setState({ newsText: e.currentTarget.value })
    }
    setUpdateId = (id) => {
        this.setState({ updateId: [...this.state.updateId, id] })
    }
    removeUpdateId = (id) => {
        this.setState({ updateId: [...this.state.updateId.filter(o => o !== id)] })
    }
    setText = (text) => {
        this.setState({ newsText: text })
    }
    toggleShowPostForm = (isShow) => {
        this.setState({ isToggleShowPostForm: isShow })
    }
    render() {
        return (
            <div>
                <div className={style['body']}>
                    <div className={style['thema-title']}>Тема: {this.props.forumTheme}</div>
                    {this.props.forumMessages.map((message, index) =>
                        <div className={index !== 0 ? style['item'] : style['item'] + ' ' + style['item-first']}>
                            <div className={style['body__content']}>
                                <div className={style['text']}>{message.messageText}</div>
                                {this.props.userId === message.idAuthor || this.props.roleUser === 'admin'
                                    ? <div className={style['buttons']}>
                                        <button onClick={() => {
                                            this.openModal()
                                            this.setRemoveId(message.id)
                                        }} className={style['delete']}><i class="fas fa-trash-alt"></i></button>

                                        <ShowModalConfirmDeleteForumMessage
                                            isOpen={this.state.isShowModal}
                                            onClose={() => this.closeModal()}
                                            removeId={this.state.removeId}
                                            removeForumMessage={this.props.removeForumMessage}
                                            getForumItem={this.props.getForumItem}
                                            idForum={message.idForum}
                                        />
                                    </div>
                                    : null
                                }
                                {/* {
                                this.state.updateId.some(item => item === message.id)
                                    ? <div className={style['content']}>
                                        <textarea onChange={this.updateText} value={this.state.newsText}></textarea>
                                    </div>
                                    : <div className={style['content']}>
                                        <div className={style['text']}>{post.newsText.length < 100 || this.state.detailId.some(item => item === post.id) ? post.newsText : post.newsText.slice(0, 99) + ' ...'}</div>
                                    </div>
                            } */}
                                <div className={style['footer']}>
                                    <div className={style['author']}>{this.props.forumAuthorId === message.idAuthor && <i class="fas fa-crown"></i>} {message.fio} </div>
                                    <div className={style['data']}> {message.messageDate} </div>
                                    {/* <a className={style['comment']} href="">Ответить</a> */}
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        this.props.isAuth
                            ? <NewMessage {...this.props} />
                            : <a href='#s' onClick={() => this.openAuth()} className={style['auth-reg']}>Войдите или зарегистрируйтесь, чтобы ответить</a>
                    }
                    <Login
                        isOpen={this.state.isShowAuth}
                        onClose={() => this.closeAuth()}
                    />
                </div>
            </div >
        )
    }
};

export default ForumItem;