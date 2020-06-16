import React from 'react';
import style from './../News/News.module.scss'

const ShowModalConfirmDeleteUser = (props) => {
    let close = (e) => {
        e.preventDefault();
        if (props.onClose) {
            props.onClose();
        }
    }
    if (props.isOpen === false) return null;
    return (
        <div className={style['wrapper']}>
            <div className={style['modal']}>
                <div className={style['title']}>Вы действительно хотите удалить пользователя?</div>
                <div className={style['buttons']}>
                    <a href='#s' className={style['yes']} onClick={(e) => {
                        props.removeUser(props.removeId)
                        close(e)
                    }}>Да</a>
                    <a className={style['no']} onClick={(e) => close(e)} href="#s">Отмена</a>
                </div>
            </div>
        </div>
    )
}

export default ShowModalConfirmDeleteUser;