import React from 'react';
import ToggleComponent from './Toggle.Component';

function InfoLinkComponent() {
    const id = '#collapseInfo'
    return (
            <div className="footer-mainlink-wrapper col-lg-3 offset-lg-2">
                <div className="link-wrapper" toggle="collapse" aria-expanded="true">
                    <h3>Information
                        <ToggleComponent id={id} />
                    </h3>
                    <div className="collapse" id='collapseInfo'>
                        <div className="card card-body">
                            <ul>
                                <li><a href="">Fashion Store</a></li>
                                <li><a href="">Shoes</a></li>
                                <li><a href="">Formal</a></li>
                                <li><a href="">Watch</a></li>
                                <li><a href="">More</a></li>                                
                            </ul>
                        </div>
                    </div>                        
                </div>
            </div>
    );
}

export default InfoLinkComponent;