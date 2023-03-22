import React from 'react';
import '../../../assets/scss/footer.scss'
import AccountLinksComponent from './AccountLink.Component';
import InfoLinkComponent from './InfoLinks.Component';

function BodyFooterComponent() {
    return (
        <div className='body-footer'>
            <div className="container">
                <div className='dropdown'>
                    <InfoLinkComponent />
                    <AccountLinksComponent />               
                </div>
            </div>
        </div>
    );
}

export default BodyFooterComponent;