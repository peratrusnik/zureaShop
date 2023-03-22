import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "../../redux/modal.slicer";

function ModalComponent({children}) {
    const {modal} = useSelector(store => store.modalStore)
    const dispatch = useDispatch()
    return modal && (
        <div className="modal-wrapper" onClick={()=>dispatch(toggleModal(false))}>
            <div className="modal-wrapper-content">
                {children}
            </div>
        </div>
    );
}

export default ModalComponent;