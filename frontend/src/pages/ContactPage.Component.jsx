import React, {useState} from 'react';
import {sendContactMail} from "../services/mail.service";
import ModalComponent from "../components/modal/Modal.Component";
import {useDispatch} from "react-redux";
import {toggleModal} from "../redux/modal.slicer";
import HeaderComponent from '../UIkit/Header.Component';
import { toast } from 'react-toastify';
import ButtonComponent from '../UIkit/Button.Component';

const initialsInput = {
    email: "",
    subject: "",
    message: ""
};

function ContactPageComponent() {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState(initialsInput);
    const [isSend, setIsSend] = useState(false);
    // const [responseMsg, setResponseMsg] = useState("");

    const oninputHandler = (e) => {
        let copyInputData = {...inputData};
        copyInputData[e.target.name] = e.target.value;
        setInputData(copyInputData);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO validate input data
        sendContactMail(inputData)
            .then((res) => {
                dispatch(toggleModal(true));
                setInputData(initialsInput);
                // setResponseMsg("Message successfully send.")
                toast.success("Message successfully send.");
                setTimeout(() => {
                    dispatch(toggleModal(false));
                }, 2000);
            })
            .catch((err) => {
                // setResponseMsg("Message is not send.");
                console.log(err);
                toast.error(err)
            })
            .finally(() => {
                setIsSend(true);
            });
    };

    return (
        <>
            <HeaderComponent title="Contact" subtitle="Contact" titlePosition='right-center' banner='contact'/>
            <div className="container my-3 text-center">
                <form onSubmit={submitHandler}>
                    <input
                        className="form-control mb-3"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onInput={oninputHandler}
                        value={inputData.email}
                        />
                    <input
                        className="form-control mb-3"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={inputData.subject}
                        onInput={oninputHandler}/>
                    <textarea
                        name="message"
                        className="form-control mb-3"
                        cols="30"
                        rows="10"
                        placeholder="Message"
                        value={inputData.message}
                        onInput={oninputHandler}></textarea>
                    <ButtonComponent btnText="Send E-mail" />
                </form>
                {/* <ModalComponent> */}
                    {/* <h4>{responseMsg}</h4> */}
                {/* </ModalComponent>  */}

            </div>
        </>
    );
}

export default ContactPageComponent;
