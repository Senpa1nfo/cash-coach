import './Header.sass';
import '../../icons/logo.svg'
import logo from '../../icons/logo.svg';
import sun from '../../icons/light_theme_icon.svg';
import moon from '../../icons/dark_theme_icon.svg';
import LoginForm from '../loginForm/LoginForm.tsx';
import Authorized from './autorized/Authorized.tsx';

const Header = () => {


    const switchTheme = () => {
        if (localStorage.getItem('theme') === 'dark') {
            localStorage.removeItem('theme');
            document.querySelector('.header__theme-switcher__switcher')?.classList.remove('header__theme-switcher__switcher_on');
        } else {
            localStorage.setItem('theme', 'dark');
            document.querySelector('.header__theme-switcher__switcher')?.classList.add('header__theme-switcher__switcher_on');
        }
    }

    const setEnglish = () => {
        document.querySelector('.ua')?.classList.remove('header__language-switcher__item_active');
        document.querySelector('.eng')?.classList.add('header__language-switcher__item_active');
    }
    const setUkrainian = () => {
        document.querySelector('.eng')?.classList.remove('header__language-switcher__item_active');
        document.querySelector('.ua')?.classList.add('header__language-switcher__item_active');
    }

    return(
        <header className="header">
            <div className="header__wrapper">
                <img src={logo} className="header__logo" alt='logo'/>
                <div className="header__theme-switcher" onClick={() => switchTheme()}>
                    <img src={moon} alt='moon'/>
                    <img src={sun} alt='sun'/>
                    <div className="header__theme-switcher__switcher header__theme-switcher__switcher_on"></div>
                </div>
            </div>
           
            <nav></nav>

            <div className="header__wrapper">
                <div className="header__language-switcher">
                    <div className="ua header__language-switcher__item header__language-switcher__item_active" onClick={() => setUkrainian()}>UKR</div>
                    <div className="header__divider"></div>
                    <div className="eng header__language-switcher__item" onClick={() => setEnglish()}>ENG</div>
                </div>              
                <Authorized/>
            </div>
            <LoginForm></LoginForm>
        </header>    
    )
}

export default Header;