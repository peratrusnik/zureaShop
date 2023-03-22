import NavBarLinkComponent from '../NavBarLink.Component';

function NavDesktopViewComponent() {
    return (
        <ul className='nav-item'>
            <li>
                <NavBarLinkComponent btnTitle='Home' redirectUrl='/'/>
            </li>
            <li>
                <NavBarLinkComponent btnTitle='Shop' redirectUrl='/shop'/>
            </li>
            <li>
                <NavBarLinkComponent btnTitle='Watch' redirectUrl='/'/>
            </li>
            <li>
                <NavBarLinkComponent btnTitle='More' redirectUrl='/'/>
            </li>
            <li>
                <NavBarLinkComponent btnTitle='Contact' redirectUrl='/contact'/>
            </li>
        </ul>
    );
}

export default NavDesktopViewComponent;
