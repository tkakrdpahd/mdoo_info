import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import LanguageButton from '../Language Button/LanguageButton';
import './Header.css'

function Header(){
    return(
        <header>
            <Logo/>
            <Nav/>
            <LanguageButton/>
        </header>
    );
}

export default Header;