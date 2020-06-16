import React from 'react'
import Slider from './../Slider/Slider'
import style from './News.module.scss';
import NewPost from './NewPost/NewPost';
import ShowModalConfirmDeletePost from '../commons/newsRemoveModal';
import HeaderNews from '../Header/HeaderNews';
import Header from '../Header/Header';

let date = new Date().toDateString();

class News extends React.Component {

    state = {
        newsText: this.props.posts.newsText,
        newsTheme: this.props.posts.theme,
        updateId: [],
        detailId: [],
        removeId: null,
        isToggleShowPostForm: false,
        isShowModal: false,
        isCheck: true
    }
    checkUpdate = () => {
        this.setState({ isCheck: !this.state.isCheck })
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
    updateTheme = (e) => {
        this.setState({ newsTheme: e.currentTarget.value })
    }
    setUpdateId = (id) => {
        this.setState({ updateId: [...this.state.updateId, id] })
    }
    removeUpdateId = (id) => {
        this.setState({ updateId: [...this.state.updateId.filter(o => o !== id)] })
    }
    setDetailId = (id) => {
        this.setState({ detailId: [...this.state.detailId, id] })
    }
    removeDetailId = (id) => {
        this.setState({ detailId: [...this.state.detailId.filter(o => o !== id)] })
    }
    setText = (text) => {
        this.setState({ newsText: text })
    }
    setTheme = (theme) => {
        this.setState({ newsTheme: theme })
    }
    toggleShowPostForm = (isShow) => {
        this.setState({ isToggleShowPostForm: isShow })
    }

    render() {
        return (
            <>
                {this.props.sliderNews.length === 0
                    ? <Header />
                    : <HeaderNews />
                }
                 {this.props.posts.length === 0 && <p className={style['title-news']}>На данный момент не добавено новостей</p>}
                
                <Slider />
                <ShowModalConfirmDeletePost
                    isOpen={this.state.isShowModal}
                    onClose={() => this.closeModal()}
                    removeId={this.state.removeId}
                    removeNews={this.props.removeNews}
                />
                <div className={style['container']}>
                    <div className={style['news']}>
                        {this.props.roleUser === 'admin' || this.props.roleUser === 'moderator'
                            ? !this.state.isToggleShowPostForm
                                ? <button onClick={() => this.toggleShowPostForm(true)} className={style['btn-add-post']}>Добавить новость</button>
                                : <button onClick={() => this.toggleShowPostForm(false)} className={style['btn-add-post']}>Отмена</button>

                            : null
                        }
                        <div className={style['body']}>
                            {this.state.isToggleShowPostForm && <NewPost toggleShowPostForm={this.toggleShowPostForm} />}
                            {this.props.posts
                                ? this.props.posts.map(post =>
                                    <div key={post.id} className={style['item']}>
                                        <div className={style['body__content']}>
                                            <div className={style['buttons']}>
                                                {this.props.roleUser === 'admin' || this.props.roleUser === 'moderator'
                                                    ? this.state.isCheck && <button className={!post.isImportant ? style['stars'] : style['stars'] + " " + style['stars-active']} onClick={() => {
                                                        this.props.toggleImportantNews(post.id, !post.isImportant)
                                                    }}><i class="fas fa-star"></i></button>
                                                    : null
                                                }
                                                {this.props.roleUser === 'admin' || this.props.roleUser === 'moderator'
                                                    ? this.state.updateId.some(item => item === post.id)
                                                        ? <button onClick={() => {
                                                            this.removeUpdateId(post.id)
                                                            this.props.updateNews(post.id, this.state.newsTheme, this.state.newsText, date)
                                                            this.checkUpdate()
                                                        }
                                                        } className={style['edit']}><i class="fas fa-check"></i></button>
                                                        : <button onClick={() => {
                                                            this.setText(post.newsText)
                                                            this.setTheme(post.theme)
                                                            this.setUpdateId(post.id)
                                                            this.checkUpdate()
                                                        }} className={style['edit']}><i class="fas fa-pencil-alt"></i></button>
                                                    : null
                                                }
                                                {this.props.roleUser === 'admin' || this.props.roleUser === 'moderator'
                                                    ? this.state.isCheck && <button onClick={() => {
                                                        this.openModal()
                                                        this.setRemoveId(post.id)
                                                    }} className={style['delete']}><i class="fas fa-trash-alt"></i></button>
                                                    : null
                                                }
                                            </div>
                                            {
                                                this.state.updateId.some(item => item === post.id)
                                                    ? <div className={style['content']}>
                                                        <input onChange={this.updateTheme} value={this.state.newsTheme}></input>
                                                        <textarea onChange={this.updateText} value={this.state.newsText}></textarea>
                                                    </div>
                                                    : <div className={style['content']}>
                                                        <div className={style['theme']}>{post.theme}</div>
                                                        <div className={style['text']}>{post.newsText.length < 100 || this.state.detailId.some(item => item === post.id) ? post.newsText : post.newsText.slice(0, 99) + ' ...'}</div>
                                                    </div>
                                            }
                                            <div className={style['footer']}>
                                                <div className={style['author']}>{post.author}</div>
                                                <div className={style['data']}>{post.newsDate}</div>
                                                {this.state.detailId.some(item => item === post.id)
                                                    ? <button onClick={() => this.removeDetailId(post.id)} style={this.state.updateId.some(item => item === post.id) && post.newsText.length < 100 ? { display: 'none' } : null} className={style['show-more']}>Свернуть</button>
                                                    : <button onClick={() => this.setDetailId(post.id)} style={post.newsText.length < 100 ? { display: 'none' } : null} className={style['show-more']}>Подробнее</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                                : null
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }

}



export default News;