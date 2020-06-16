import { forumAPI } from '../API/API'
import { reset } from 'redux-form';


let initialState = {
    posts: [],
    forumTheme: null,
    forumId:null,
    forumAuthorId: null,
    forumMessages: []
};

const forumReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FORUM_POSTS":
            return {
                ...state,
                posts: action.payload
            }
        case "SET_FORUM_INFO":
            return {
                ...state,
                ...action.payload
            }
        case "SET_FORUM_MESSAGES":
            return {
                ...state,
                forumMessages: action.payload
            }
        default:
            return state;
    }
};

export const setForumPosts = (post) => ({ type: "SET_FORUM_POSTS", payload: post })
export const setForumInfo = (forumTheme, forumId,forumAuthorId) => ({ type: "SET_FORUM_INFO", payload: {forumTheme,forumId,forumAuthorId} })
export const setForumMessages = (messages) => ({ type: "SET_FORUM_MESSAGES", payload: messages })

export const getForum = () => (dispatch) => {
    forumAPI.getForum()
        .then(response => {
            dispatch(setForumPosts(response.data))
        })
}
export const updateForum = (id, theme, forumDate) => (dispatch) => {
    forumAPI.updateForum(id, theme, forumDate)
        .then(response => {
            dispatch(getForum())
        })
}
export const addForum = (id, theme, date) => (dispatch) => {
    forumAPI.addForum(id, theme, date)
        .then(response => {
            dispatch(getForum())
        })
}
export const addForumMessage = (idForum,idAuthor,messageText,messageDate) => (dispatch) => {
    forumAPI.addForumMessage(idForum,idAuthor,messageText,messageDate)
        .then(response => {
            dispatch(reset('PostForm'));
        })
}
export const removeForumMessage = (id) => (dispatch) => {
    forumAPI.removeForumMessage(id)

}
export const removeForumPost = (id) => (dispatch) => {
    forumAPI.removeForumPost(id)
        .then(response => {
            dispatch(getForum())
        })
}
export const getForumItem = (id) => (dispatch) => {
    forumAPI.getForumItem(id)
        .then(response => {
            dispatch(setForumInfo(response.data.theme,response.data.id,response.data.authorId))
            dispatch(setForumMessages(response.data.messages))
        })
}

export default forumReducer;