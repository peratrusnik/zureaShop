import { BsZoomIn } from 'react-icons/bs';

const ModalZoomComponent = ({resetProductPosition, singleProduct})=>{
    return(
        <>
            <button className='zoomInProduct' onMouseOver = {()=>resetProductPosition()} type='button' data-bs-toggle="modal" data-bs-target="#zoomProductModal">
				<BsZoomIn />
            </button>

            <div className="modal fade" id="zoomProductModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">       
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="product-inZoom-holder">
                                <img src={singleProduct.imgUrl} alt={singleProduct.title} />
                            </div>
                        </div>
                        <div className="modal-footer border border-top-0">
                            <div className="footer-holder">
                                <p>{singleProduct.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ModalZoomComponent;