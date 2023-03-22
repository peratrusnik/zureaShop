import React from 'react';
import { BiChevronUp } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import ContainerComponent from '../../UIkit/Container.Component';

function ScrollToTopComponent() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 800) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <ContainerComponent>            
            <div className='container backToTop'>
                {showTopBtn && (
                    <BiChevronUp
                    className="icon-position icon-style"
                    onClick={goToTop}
                    />
                    )}
            </div>
        </ContainerComponent>
    );
}

export default ScrollToTopComponent;