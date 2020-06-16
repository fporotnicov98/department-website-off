import React from 'react'
import { connect } from 'react-redux'
import Forum from './Forum'
import { getForum, addForum, removeForumPost } from "../../redux/forumReducer";


class ForumContainer extends React.Component {
    componentDidMount() {
        this.props.getForum()
    }
    render() {
        return <>
            <Forum {...this.props} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        posts: state.forumPage.posts,
        roleUser: state.auth.roleUser,
        userId: state.auth.userId,
    }
}

export default connect(mapStateToProps, { getForum, addForum, removeForumPost })(ForumContainer)