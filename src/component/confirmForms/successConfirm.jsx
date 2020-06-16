import { toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export const authSuccess = () => {
    toast.success('Авторизация прошла успешно!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        transition: Flip
    })
}
export const regSuccess = () => {
    toast.success('Регистрация прошла успешна!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        transition: Flip
    })
}