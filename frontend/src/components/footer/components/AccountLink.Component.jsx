import React from 'react';
import ToggleComponent from './Toggle.Component';

function AccountLinksComponent() {
    const id = "#collapseAccount"
    return (
            <div className="footer-account-link col-lg-3">
                <div className="link-wrapper" toggle="collapse" aria-expanded="true">
                    <h3>Account
                        <ToggleComponent id={id} />
                    </h3>
                    <div className="collapse" id='collapseAccount'>
                        <div className="card card-body">
                            <ul>
                                <li><a href="">Personal info</a></li>
                                <li><a href="">Orders</a></li>
                                <li><a href="">Credit slips</a></li>
                                <li><a href="">Addresses</a></li>
                                <li><a href="">My wishlists</a></li>                                
                            </ul>
                        </div>
                    </div>                        
                </div>
            </div>
    );
}

export default AccountLinksComponent;