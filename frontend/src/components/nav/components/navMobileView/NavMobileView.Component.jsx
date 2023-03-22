import React, {useState} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import NavBarLinkComponent from '../NavBarLink.Component';

function NavMobileViewComponent() {
    const [toggle, setToggle] = useState(false);
    return (
        <div className='mobileMenu'>
            <AiOutlineMenu
                onClick={() => setToggle((prevState) => !prevState)}
            />
            <ul className={`mobile-item ${toggle ? 'active' : null}`}>
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
        </div>
    );
}

export default NavMobileViewComponent;
