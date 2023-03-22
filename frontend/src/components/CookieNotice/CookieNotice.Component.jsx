import React, {useState, useEffect} from "react";
import { MdDone } from "react-icons/md";
import {getCookie, setCookie} from 'tiny-cookie';

const CookieNotice = () => {
    const [items, setItems] = useState({
        name: "zureaCookie",
        value: ""
    });
    const [zureaCookie] = useState(getCookie(items.name))
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        const delay = 1500;
        const timeoutId = setTimeout(() => {
            setLoading(true)
        }, delay);
        // unmount component
        return () => {
          clearTimeout(timeoutId);
        };
      }, []);


    const acceptCookie = (e) => {
        e.preventDefault();
        let newItemsObj = {...items};
        newItemsObj.value = "Accepted";
        setItems(newItemsObj);
        setCookie(items.name, newItemsObj.value, { expires: '1Y' });
    }

    const declineCookie = (e) => {
        e.preventDefault();
        let newItemsObj = {...items};
        newItemsObj.value = "Declined";
        setItems(newItemsObj);
        setCookie(items.name, newItemsObj.value, { expires: '1Y' });
    }

        const renderCookie = () => {
            return (
                <>
                    {!zureaCookie && loading ? (<div className="cookie-notice-container">
                        <div className="cookie-notice-wrapper">
                            <div className="cookie-notice-content">
                                <p>We use cookies to improve your experience on our website. By browsing this website,
                                    you agree to our use of cookies.</p>
                            </div>
                            <div className="cookie-notice-btn-wrapper">
                                <a href="" className="btn-terms">Terms & Conditions</a>
                                <a href="" className="btn-decline" onClick={declineCookie}>Decline</a>
                                <a href="" className="btn-accept" onClick={acceptCookie}>Accept<MdDone className="md-done" /></a>
                            </div>
                        </div>
                    </div>) : (null)}
                </>);
           
        }

        
    return !getCookie(items.name) && renderCookie();

}

export default CookieNotice;