import { toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export const authError = () => {
    toast.error('Неправильный email или пароль!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        transition: Flip
    })
}
export const regError = () => {
    toast.error('Пользователь с таким Email уже существует!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        transition: Flip
    })
}
export const codeError = () => {
    toast.error('Неправильный код!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        transition: Flip
    })
}
export const varificationError = () => {
    toast.error('Вы не верифицированны!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        transition: Flip
    })
}



