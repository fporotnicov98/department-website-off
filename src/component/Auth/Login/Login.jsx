import React from 'react';
import style from './Login.module.scss'
import logo from './../../../asets/image/logo.png'
import Recaptcha from 'react-recaptcha'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { sendEmail, setLogin, getCode, setOnReg, setVerified } from '../../../redux/authReducer'
import { varificationError } from "../../confirmForms/errorConfirm";


let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style['form']}>
            <label htmlFor="email">Введите email</label>
            <Field
                name='email'
                component='input'
                type='email'
                required='required'
                id='email'
            />
            <label htmlFor="password">Введите пароль</label>
            <Field
                name='password'
                component='input'
                type='password'
                required='required'
                id='password'
            />
            <Recaptcha
                sitekey="6LcOhKUZAAAAAF6f6PzthhZur4QFMJJStGKyUeoy"
                render="explicit"
                verifyCallback={props.setVerified(true)}
            />,
            <span className={style['error']}>{props.error}</span>
            <button className={style['login']} type="submit" ><span>Войти</span></button>
        </form>
    )
}
LoginForm = reduxForm({ form: 'loginForm' })(LoginForm)
let LogupForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style['form']}>
            <label htmlFor="fio">ФИО</label>
            <Field
                name='fio'
                component='input'
                type='text'
                required='required'
                id='fio'
            />
            <label htmlFor="email">Email</label>
            <Field
                name='email'
                component='input'
                type='email'
                required='required'
                id='email'
            />
            <label htmlFor="password">Пароль</label>
            <Field
                name='password'
                component='input'
                type='password'
                pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                title='Строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов'
                // required='required'
                id='password'
            />
            {/* <label htmlFor="password">Повторите пароль</label>
            <Field
                name='password'
                component='input'
                type='password'
                required='required'
                id='password'
            /> */}
            <span className={style['error']}>{props.error}</span>
            <button className={style['logup']} type="submit" ><span>Зарегистрироваться</span></button>
        </form>
    )
}
const LogupFormRedux = reduxForm({ form: 'registrationForm' })(LogupForm)

let ConfirmForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style['form']}>
            <span className={style['error']}>{props.error}</span>
            <label htmlFor="code">Вам на почту был отправлен код подтверждения. Введите его в поле ниже.</label>
            <Field
                name='code'
                component='input'
                type='text'
                required='required'
                id='code'
            />
            <button className={style['logup']} type="submit" ><span>Подтвердить</span></button>
        </form>
    )
}
const ConfirmFormRedux = reduxForm({ form: 'confirmForm' })(ConfirmForm)

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isActive: false };
    }
    toggleAuth() {
        this.setState({
            isActive: !this.state.isActive
        })
    }
    onSubmitReg = (formData) => {
        this.props.sendEmail(formData.email, formData.password, formData.fio);
    }
    onSubmitAuth = (formData) => {
        this.props.isVerified === true
            ? this.props.setLogin(formData.email, formData.password)
            : varificationError()
    }
    onSubmitConfirm = formData => {
        this.props.getCode(formData.code)
    }
    render() {
        if (this.props.isOpen === false) return null;
        if (this.props.isAuth === true) return null;
        return (
            <div className={style['bg']}>
                {
                    !this.props.onReg
                        ? <div className={this.state.isActive ? style['frame'] + " " + style['frame-long'] : style['frame']}>
                            <button onClick={e => this.close(e)} className={style["close-auth"]}><span>x</span></button>
                            <div className={style['logo']}><img src={logo} alt="" /></div>
                            <div className={this.state.isActive ? style['signin'] + " " + style['signin-left'] : style['signin']}>
                                <div className={style['title']}>Вход</div>
                                <LoginForm onSubmit={this.onSubmitAuth} setVerified = {this.props.setVerified} />
                                <div className={style['signin-active']}>Еще не зарегистрированы?<button onClick={() => this.toggleAuth()}>Регистрация</button></div>
                            </div>
                            <div className={this.state.isActive ? style['signup'] + ' ' + style['signup-left'] : style['signup']}>
                                <div className={style['title']}>Регистрация</div>
                                <LogupFormRedux onSubmit={this.onSubmitReg} />
                                <div className={style['signin-active']}>Уже зарегистрированы? <button onClick={() => this.toggleAuth()}>Войти</button></div>
                            </div>
                        </div>
                        : <div className={style['frame-short'] + " " + style['frame']}>
                            <button onClick={e => {
                                this.close(e)
                                this.props.setOnReg(false)
                            }} className={style["close-auth"]}><span>x</span></button>
                            <div className={style['logo']}><img src={logo} alt="" /></div>
                            <div className={style['confirm']}>
                                <div className={style['title']}>Подтверждение регистрации</div>
                                <ConfirmFormRedux onSubmit={this.onSubmitConfirm} />
                            </div>
                        </div>
                }
            </div >
        )
    }
    close(e) {
        e.preventDefault();
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        onReg: state.auth.onReg
    }
}

export default connect(mapStateToProps, { setLogin, sendEmail, getCode, setOnReg, setVerified })(Login);