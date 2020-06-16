import React from 'react';
import Header from '../Header/Header';
import style from './PersonalAccount.module.scss';
import ShowModalConfirmDeleteUser from '../commons/removeUserModal';
import { Redirect } from 'react-router-dom';

class PersonalAccount extends React.Component {
    state = {
        isClick: false,
        isShowModal: false,
        removeId: null,
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
    showEditPassword() {
        this.setState({ isClick: !this.state.isClick })
    }
    render() {
        if (!this.props.auth.isAuth) return <Redirect to={'/'}></Redirect>
        return (
            <div>
                <Header />
                <ShowModalConfirmDeleteUser
                    isOpen={this.state.isShowModal}
                    onClose={() => this.closeModal()}
                    removeId={this.state.removeId}
                    removeUser={this.props.removeUser}
                />
                <div className={style['container']}>
                    <div className={style["personal"]}>
                        <div className={style['title']}>Личный кабинет</div>
                        {
                            this.props.auth.roleUser === 'admin'
                                ? <div className={style["body"]}>
                                    <div className={style['user-data']}>
                                        <div className={style['sub-title']}>Личные данные</div>
                                        <ul className={style['info']}>
                                            <li>Пользователь:  <span style={{ fontWeight: "bold" }}>{this.props.auth.fio}</span></li>
                                            <li>Электронная почта:  <span style={{ fontWeight: "bold" }}>{this.props.auth.email}</span></li>
                                        </ul>
                                        {/*<div className={style['edit-password']}>*/}
                                        {/*    <div onClick={() => this.showEditPassword()} className={style['sub-title']}>Изменение пароля</div>*/}
                                        {/*    {*/}
                                        {/*        this.state.isClick &&*/}
                                        {/*        <form action="">*/}
                                        {/*            <div className={style['form-item']}>*/}
                                        {/*                <label htmlFor="">Старый пароль</label>*/}
                                        {/*                <input type="password" name="" id="" />*/}
                                        {/*            </div>*/}
                                        {/*            <div className={style['form-item']}>*/}
                                        {/*                <label htmlFor="">Новый пароль</label>*/}
                                        {/*                <input type="password" name="" id="" />*/}
                                        {/*            </div>*/}
                                        {/*            <div className={style['form-item']}>*/}
                                        {/*                <label htmlFor="">Еще раз</label>*/}
                                        {/*                <input type="password" name="" id="" />*/}
                                        {/*            </div>*/}
                                        {/*        </form>*/}
                                        {/*    }*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className={style['users']}>
                                        <div className={style['sub-title']}>Управление пользователями</div>
                                        <div className={style['users-wrapper']}>
                                            {
                                                this.props.users.map((user) =>
                                                    <div className={style['user']}>
                                                        <div className={style['id']}>#{user.id}</div>
                                                        <div className={style['fio']}>{user.fio}</div>
                                                        <div className={style['roles']}>
                                                            <button disabled={user.roleUser === "admin"} onClick={() => this.props.updateUserRole(user.id, "admin")} className={style['role']} style={user.roleUser === "admin" ? { color: "white" } : null}>Администратор</button>
                                                            <button disabled={user.roleUser === "moderator"} onClick={() => this.props.updateUserRole(user.id, "moderator")} className={style['role']} style={user.roleUser === "moderator" ? { color: "white" } : null}>Модератор</button>
                                                            <button disabled={user.roleUser === "user"} onClick={() => this.props.updateUserRole(user.id, "user")} className={style['role']} style={user.roleUser === "user" ? { color: "white" } : null}>Пользователь</button>
                                                        </div>
                                                        <a href="#s" onClick={() => {
                                                            this.openModal()
                                                            this.setRemoveId(user.id)
                                                        }} className={style['delete']}><i class="fas fa-trash-alt"></i></a>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                                : <div className={style["body-user"]}>
                                    <div className={style['user-data']}>
                                        <div className={style['sub-title']}>Личные данные</div>
                                        <ul className={style['info']}>
                                            <li>Пользователь:  <span style={{ fontWeight: "bold" }}>{this.props.auth.fio}</span></li>
                                            <li>Электронная почта:  <span style={{ fontWeight: "bold" }}>{this.props.auth.email}</span></li>
                                        </ul>
                                        {/*<div className={style['edit-password']}>*/}
                                        {/*    <div onClick={() => this.showEditPassword()} className={style['sub-title']}>Изменение пароля</div>*/}
                                        {/*    {*/}
                                        {/*        this.state.isClick &&*/}
                                        {/*        <form action="">*/}
                                        {/*            <div className={style['form-item']}>*/}
                                        {/*                <label htmlFor="">Старый пароль</label>*/}
                                        {/*                <input type="password" name="" id="" />*/}
                                        {/*            </div>*/}
                                        {/*            <div className={style['form-item']}>*/}
                                        {/*                <label htmlFor="">Новый пароль</label>*/}
                                        {/*                <input type="password" name="" id="" />*/}
                                        {/*            </div>*/}
                                        {/*            <div className={style['form-item']}>*/}
                                        {/*                <label htmlFor="">Еще раз</label>*/}
                                        {/*                <input type="password" name="" id="" />*/}
                                        {/*            </div>*/}
                                        {/*        </form>*/}
                                        {/*    }*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

};

export default PersonalAccount;