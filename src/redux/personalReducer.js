import { userAPI } from "../API/API";

let initialState = {
    users: []
}

const personalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
};

export const setUsers = (users) => ({ type: "SET_USERS", payload: users })

export default personalReducer;

export const getUsers = () => (dispatch) => {
    userAPI.getUsers()
        .then(response => {
            dispatch(setUsers(response.data))
        })
}
export const updateUserRole = (id,userRole) => (dispatch) => {
    userAPI.updateUserRole(id,userRole)
     .then(response => {
         dispatch(getUsers())
     })
}
export const removeUser = (id) => (dispatch) => {
    userAPI.removeUser(id)
        .then(response => {
            dispatch(getUsers())
        })
}