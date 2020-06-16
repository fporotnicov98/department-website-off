import React from 'react';
import ForumItem from './ForumItem';
import { connect } from 'react-redux';
import { getForumItem,addForumMessage,removeForumMessage } from './../../../redux/forumReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Header from '../../Header/Header';
import style from './ForumItem.module.scss';

class ForumItemContainer extends React.Component {
    componentDidMount() {
        let forumId = this.props.match.params.forumId
        if (!forumId) {
            alert('404')
        }
        this.props.getForumItem(forumId)
    }
    render() {
        return (
            <div>
                <Header />
                <div className={style['container']}>
                    <ForumItem  {...this.props} />
                </div>
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        forumTheme:state.forumPage.forumTheme,
        forumMessages:state.forumPage.forumMessages,
        forumId:state.forumPage.forumId,
        forumAuthorId: state.forumPage.forumAuthorId,
        userId:state.auth.userId,
        roleUser: state.auth.roleUser,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { getForumItem,addForumMessage,removeForumMessage })
)(ForumItemContainer);