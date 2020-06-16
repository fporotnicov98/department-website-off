import {authAPI} from '../API/API'
import { reset } from 'redux-form'
import {authError, regError, codeError} from '../component/confirmForms/errorConfirm'
import {authSuccess,regSuccess} from '../component/confirmForms/successConfirm'

let initial = {
    email: null,
    isAuth: null,
    fio: null,
    userId:null,
    roleUser: null,
    onReg: false,
    isVerified: false,
}
const authReducer = (state = initial, action) => {
    switch (action.type) {
        case "SET_AUTH_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "SET_ON_REG":
            return{
                ...state,
                onReg: action.payload
            }
        case "SET_VERIFIED":
            return{
                ...state,
                isVerified: action.payload
            }
        default:
            return state;
    }
}

export const setAuthData = (email, fio, userId ,roleUser, isAuth) => ({ type: "SET_AUTH_DATA", payload: { email, fio, userId ,roleUser, isAuth } })
export const setToken = (token) => ({ type: "SET_TOKEN", payload: token })
export const setOrders= (orders) => ({ type: "SET_ORDERS", payload: orders })
export const setOnReg = (flag) => ({type: "SET_ON_REG", payload: flag})
export const setVerified = (flag) => ({type: "SET_VERIFIED", payload: flag})



export const sendEmail = (email,password,fio) => dispatch => {
    authAPI.sendEmail(email,password,fio)
        .then(response => {
            dispatch(reset('registrationForm'));
            dispatch(setOnReg(true))
        })
        .catch(err => {
            regError()
            dispatch(reset('registrationForm'));
        })
}
export const getCode = (code) => dispatch => {
    authAPI.getCode(code)
        .then(response => {
            regSuccess()
            dispatch(reset('confirmForm'));
            dispatch(setOnReg(false))
        })
        .catch(err => {
            codeError()
            dispatch(reset('confirmForm'));
        })
}

export const setLogin = (email, password) => dispatch => {
    authAPI.login(email, password)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(getAuth(response.data.token))
                dispatch(reset('loginForm'));
                authSuccess()
            }
        })
        .catch(err => {
            authError()
            dispatch(reset('loginForm'));
        })
}
export const getAuth = (token) => (dispatch) => {
    authAPI.getAuth(token)
        .then(response => {
                dispatch(setAuthData(response.data.email,response.data.fio,response.data.id,response.data.roleUser,true))
        })
}
export const logout = () => dispatch => {
    dispatch(setAuthData(null,null,null,null,false))
}
export default authReducer