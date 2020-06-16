import React from 'react'
import style from './HeaderNews.module.scss'
import logo from './../../asets/image/logo.png'
import { NavLink } from 'react-router-dom'
import Login from '../Auth/Login/Login'
import { connect } from 'react-redux'
import {logout} from '../../redux/authReducer'

class HeaderNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };

    }
    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }
    render() {
        return (
            <header className={style['header']}>
                <div className={style['container']}>
                    <div className={style['header__row']}>
                        <a className={style['logo']} href="/"><img src={logo} alt="" /></a>
                        <a href="/" className={style['title']}>Кафедра информационной безопасности</a>
                        <ul className={style['menu']}>
                            <li><NavLink exact to='/' activeClassName={style['active-link']}>Новости</NavLink></li>
                            {/*<li><NavLink to='/survey' activeClassName={style['active-link']}>Опросы</NavLink></li>*/}
                            <li><NavLink to='/forums' activeClassName={style['active-link']}>Форум</NavLink></li>
                            <li><NavLink to='/info' activeClassName={style['active-link']}>Информация</NavLink></li>
                            {
                                !this.props.isAuth
                                    ? <li onClick={() => this.openModal()}><a href="#s">Вход</a></li>
                                    : <li className={style['burger']}>
                                        <a href="#s"><i class="fas fa-user"></i></a>
                                        <ul className={style['sub-menu']}>
                                            <li><NavLink to="/personal">Личный кабинет</NavLink></li>
                                            <li><a href='#s' onClick = {() => this.props.logout()}>Выход</a></li>
                                        </ul>
                                    </li>
                            }
                            <Login
                                isOpen={this.state.isModalOpen}
                                onClose={() => this.closeModal()}
                            />
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {logout})(HeaderNews);