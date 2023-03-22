import React, {useEffect, useState} from 'react';
import FashionLadyImg from "../../assets/img/newsModal.jpg"
import { MdArrowForward } from "react-icons/md";
import { getCookie, setCookie } from "tiny-cookie";
import { toast } from 'react-toastify';
import { addToNewsletter } from '../../services/mail.service';

function NewsletterModalComponent() {


        const [renderModal, setRenderModal] = useState(false)
        const [clickedBtn, setClickedBtn] = useState(false)
        const [items, setItems] = useState({
            name: "zuNewsletterCookie",
            value: ""
        });
        const [newsletterCookie] = useState(getCookie(items.name))
        const [email, setEmail] = useState('');
        const [emailError, setEmailError] = useState(false)
    
        useEffect(() => {
            const renderModalDelay = 4000;
            let timeOutId = null;
            timeOutId = setTimeout(() => {
                setRenderModal(true)
            }, renderModalDelay);
            return () => {
                clearTimeout(timeOutId);
            };
        }, []);
    
        const declineNewsletterCookie = () => {
            setClickedBtn(true)
        }
    
        const pushCookie = () =>{
            items.value = true;
            setItems(items);
            setCookie(items.name, items.value, { expires: 'Session' });
        }
    
        const closeModalContainer = () => {
            let checkbox = document.getElementById('newsletter-checkbox');
            setRenderModal(false)
            if (checkbox.checked && clickedBtn) {
                pushCookie()
            }
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            // validate email address
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                // Handle invalid email address
                setEmailError(true);
                return;
            }
    
            // sending data to db
    
            addToNewsletter({email})
            .then(response => {
                toast.success(response.data)
                setRenderModal(false)
                pushCookie()
            })
            .catch(error => {
                console.log(error);
                toast.error(error?.response.data)
            })

            // try {
            //     await axios.post('/newsletter/addToList', { email })
            //     setRenderModal(false)
            //     pushCookie()
            //     toast.success('Subscription saved successfully');
            //     setEmailError(false);
            //       setEmail('');
            // } catch (error) {
            //     console.log(error);
            //     alert("Something went wrong")
            // }
        }


    return (
        <div className="container-nl" style={newsletterCookie ? {display:"none"} : null}>
            <div className={!newsletterCookie && renderModal ? "container-nl-backdrop nl-fade-in" : "container-nl-backdrop nl-fade-out"} >
                <div className="modal-nl-wrapper">
                    <button className="close" onClick={closeModalContainer}>
                        &times;
                    </button>
                    <div className="modal-nl">
                        <div className="content">
                            <div className="left-content">
                                <div className="block-content">
                                    <form method="post" onSubmit={handleSubmit}>
                                        <div className="bc-text">Subscribe to our email newsletter today to receive
                                            update on the latest news
                                        </div>
                                        <div className="newsletter-title">
                                            <h3 className="nl-h3">Subscribe To Our Newsletter</h3>
                                        </div>
                                        <div className="newsletter-input-wrapper">
                                        <div className="newsletter-input">
                                          {emailError && <label htmlFor="email">email is not valid</label> }  
                                            <input className="input-new" id="email" type="text" name="email" value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                       placeholder="Enter your mail..."/>
                                            </div>
                                            <button type="submit" className="newsletter-subscribe">
                                                Start Free Trial
                                                <span><MdArrowForward className="md-arrow"/></span>
                                            </button>
                                            <div className="newsletter-bottom">
                                                <div className="subscribe-bottom">
                                                    <input className="subscribe-dont-show-again" type="checkbox" id="newsletter-checkbox" onClick={declineNewsletterCookie} />
                                                    <span className="newsletter-checkbox" />
                                                </div>
                                                <label htmlFor="newsletter-checkbox">No Thanks, Do not show again</label>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="nl-popup-img">
                                    <img src={FashionLadyImg} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsletterModalComponent;