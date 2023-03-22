import {Link} from "react-router-dom";
import React from "react";


const NavBarLinkComponent = (props) => {
    // const btnTitle = props.btnTitle
    // const redirectUrl = props.redirectUrl
    const {btnTitle, redirectUrl} = props
    return (
        <Link to={redirectUrl}>
            {btnTitle}
        </Link>
    )
}

export default NavBarLinkComponent