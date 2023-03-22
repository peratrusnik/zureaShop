import React from 'react';
import NewsLetterComponent from '../newsletter/NewsLetter.Component';
import BodyFooterComponent from './components/BodyFooter.Component';
import BottomFooterComponent from './components/BottomFoter.Component';

function FooterComponent(props) {
    return (
        <footer id='footer'>
            <NewsLetterComponent/>
            <BodyFooterComponent />
            <BottomFooterComponent />
        </footer>
    );
}

export default FooterComponent;