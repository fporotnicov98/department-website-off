import React from 'react'
import style from './Forum.module.scss';
// import ForumItem from './ForumItem/ForumItem';
import NewForum from './NewForum/NewForum';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';
import ShowModalConfirmDeleteForumPost from '../commons/removeForumModal';



class Forum extends React.Component {

    state = {
        isModalOpen: false,
        isShowConfirmModal: false,
        removeId: null,
        isToggleShowNewForum: false,
    };
    openModal() {
        this.setState({ isModalOpen: true });
    }
    closeConfirmModal(){
        this.setState({ isShowConfirmModal: false })
    }
    setRemoveId = (id) => {
        this.setState({removeId: id})
    }
    openConfirmModal(){
        this.setState({ isShowConfirmModal: true })
    }
    closeModal() {
        this.setState({ isModalOpen: false });
    }
    toggleShowPostForm = (isShow) => {
        this.setState({ isToggleShowNewForum: isShow })
    }
    render() {
        return (
            <div>
                <Header />
                <div className={style['container']}>
                    <div className={style['news']}>
                        {this.props.roleUser === 'admin' || this.props.roleUser === 'moderator'
                            ? !this.state.isToggleShowNewForum
                                ? <button onClick={() => this.toggleShowPostForm(true)} className={style['btn-add-post']}>Создать новую тему</button>
                                : <button onClick={() => this.toggleShowPostForm(false)} className={style['btn-add-post']}>Отмена</button>

                            : <div className={style["area"]}></div>
                        }
                        {this.state.isToggleShowNewForum && <NewForum userId={this.props.userId} addForum={this.props.addForum} toggleShowPostForm={this.toggleShowPostForm} />}
                        {
                            this.props.posts.map((item) =>
                                <>
                                    <div className={style['themes']}>
                                        <div key={item.id} className={style['item']}>
                                            <div className={style['content']}>
                                                <NavLink to={'/forum/' + item.id} className={style['theme']}>{item.theme}</NavLink>
                                                <div className={style['data']}>{item.datatime}</div>
                                                <p>{item.author}</p>
                                            </div>
                                            <p>Ответов: <span>{item.countMessages}</span></p>
                                            {this.props.roleUser === 'admin' || this.props.roleUser === 'moderator'
                                                ? <>
                                                    <button button className={style['basket']} onClick={() => {
                                                        this.openConfirmModal(item.id)
                                                        this.setRemoveId(item.id)
                                                    }
                                                    }><i class="fas fa-trash-alt"></i></button>
                                                    <ShowModalConfirmDeleteForumPost
                                                        isOpen={this.state.isShowConfirmModal}
                                                        onClose={() => this.closeConfirmModal()}
                                                        idForum={this.state.removeId}
                                                        removeForumPost={this.props.removeForumPost}
                                                    />
                                                </>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </>)
                        }
                    </div >
                </div>
            </div >
        );
    }
}

export default Forum;