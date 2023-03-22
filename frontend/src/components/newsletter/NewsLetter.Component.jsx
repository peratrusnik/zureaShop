import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import ContainerComponent from '../../UIkit/Container.Component';
import SocialNetworkLinksComponent from '../../components/productDetail/components/SocialNetworkLinks.Component'
import { addToNewsletter } from '../../services/mail.service';
import { toast } from 'react-toastify';
import {
    FaFacebookF,
    FaTwitter,
    FaRss,
    FaGooglePlusG,
    FaInstagram

} from 'react-icons/fa'

const NewsletterSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
})

function NewsLetterComponent() {
    return (
        <ContainerComponent isFluid={true}>
            <div className='newslatter-wrapper'>
                <div className="container">
                    <div className="newsletter col-xl-7 col-sm-12">
                        <Formik
                            initialValues={{
                                email: '',
                                // date: Yup.date(),
                            }}
                            validationSchema={NewsletterSchema}
                            onSubmit={(values, {resetForm}) => {
                                addToNewsletter(values)
                                .then(response => {
                                    toast.success(response.data)
                                    resetForm({values: ''})                            
                                })
                                .catch(error => {
                                    console.log(error);
                                    toast.error(error?.response.data)
                                })
                            }}
                        >
                            {
                                ({ error, touched }) => {
                                    return <Form>
                                        <div className="newsletter-title">
                                            <span>Newsletter:</span>
                                        </div>
                                        <div className="input-wrapper">
                                            <Field className="newsletter-input"
                                                name="email"
                                                placeholder="Your email address" />
                                            <button className='btn btn-dark' type="submit">OK</button>
                                        </div>
                                    </Form>
                                }
                            }
                        </Formik>
                    </div>
                    <div className="social-media-wrapper">
                        <ul className="social-media col-xl-5 col-sm-12"> 
                            <li>
                                <a href="https://www.facebook.com" target='_blank'><FaFacebookF /></a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com" target='_blank'><FaTwitter /></a>
                            </li>
                            <li>
                                <a href="https://www.rss.com" target='_blank'><FaRss /></a>
                            </li>
                            <li>
                                <a href="https://www.googleplus.com" target='_blank'><FaGooglePlusG /></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com" target='_blank'><FaInstagram /></a>
                            </li>
        
                        </ul>
                    </div>
                </div>
            </div>
        </ContainerComponent>
    );
}

export default NewsLetterComponent;