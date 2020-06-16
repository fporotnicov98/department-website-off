import React from 'react'
import News from './News'
import { connect } from 'react-redux'
import uniqBy from 'lodash/uniqBy'
import { getNews, removeNews, updateNews, toggleImportantNews,setSliderNews } from "../../redux/newsReducer";



class NewsContainer extends React.Component {

    componentDidMount() {
        this.props.getNews()

    }

    render() {
        return (
            <News {...this.props} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        posts: state.newsPage.posts,
        postId: uniqBy(state.newsPage.postId, o => o.id),
        roleUser: state.auth.roleUser,
        email:state.auth.email,
        sliderNews: state.newsPage.sliderNews
    }
}

export default connect(mapStateToProps, { getNews, removeNews, updateNews,toggleImportantNews,setSliderNews})(NewsContainer)