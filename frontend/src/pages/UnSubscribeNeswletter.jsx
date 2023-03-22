import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeFromNewsletterList } from '../services/mail.service';
import HeaderComponent from '../UIkit/Header.Component';


function UnSubscribeNeswletter() {

    const params = useParams()
    const navigate = useNavigate()
    const [responseInfo, setResponseInfo] = useState({})
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        if (isFinished === true) {
            setTimeout(() => {
                    navigate('/')            
                    
                },3000)
        }   
    })

    const removeMailNewsletter = () => {
        console.log(params);
        removeFromNewsletterList({ mailId: params.id })
            .then(res => {
                setResponseInfo(res.data)
                console.log(res.data);
                toast.success(res.data.msg)
            })
            .catch((err) => {
                setResponseInfo({msg: err})
            })
            .finally(() => {
                setIsFinished(true)
            })
    }

    return (
        <>
            <HeaderComponent title='Unsubscribe' subtitle='Unsubscribe page' titlePosition='left-center'/>
            <div className='text-center my-5'>
                <h2>Unsubscribe newsletter page</h2>
                <p>Click unsubscribe to remove mail from newsletter list.</p>
                <button type='button' className='btn btn-outline-dark' onClick={removeMailNewsletter}>Unsubscribe</button>
            </div>
        </>
    );
}

export default UnSubscribeNeswletter;