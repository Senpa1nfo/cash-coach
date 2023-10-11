import { useContext, useEffect } from "react";
import sign_up from '../../../icons/sign_up_icon.svg';
import logout from '../../../icons/logout.svg';
import {Context} from "../../../main.tsx";

const Authorized = () => {

    const {store} = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth();
		}

	}, [store]);

    if (!store.isAuth) {
        return (
            <button className="header__login-btn" onClick={() => document.querySelector('.login')?.classList.remove('none')}>
                <img src={sign_up} alt="sign_up" className=""/>
                <div className="header__login-btn__text">Вхід</div>
            </button>
        )
    }
    return (
        <div onClick={() => store.logout()}>
            <img src={logout} alt="sign_up" className=""/>
        </div>        
    )
}

export default Authorized;