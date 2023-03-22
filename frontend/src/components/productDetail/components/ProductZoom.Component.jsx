import ModalZoomComponent from './ModalZoom.Component';

const ProductZoomComponent = ({singleProduct}) =>{

    let imgHolder = null;
	let zoomProductHolder = null;
	let xHover = 0;
	let yHover = 0;
	let halfHolderWidth = 0;
	let halfHolderHeight = 0;
    const handleMouseOverProduct = (e)=>{

		imgHolder = document.querySelector('.productDetailImg');
		zoomProductHolder = document.querySelector('.zoomProductHolder');

		let stringHolderWidth = window.getComputedStyle(zoomProductHolder,null).getPropertyValue('width');
		let stringHolderHeight = window.getComputedStyle(zoomProductHolder,null).getPropertyValue('height');

		let numHolderWidth = parseInt(stringHolderWidth.replace("px","").trim());
		let numHolderHeight = parseInt(stringHolderHeight.replace("px","").trim());

		halfHolderWidth = numHolderWidth / 2;
		halfHolderHeight = numHolderHeight / 2;
		
		imgHolder.style.transform = "translate(-50%,-50%) scale(1.5,1.5)";
		xHover = e.nativeEvent.offsetX;
    	yHover = e.nativeEvent.offsetY;

		if(xHover <= halfHolderWidth){
			imgHolder.style.left = (halfHolderWidth-xHover+halfHolderWidth) +"px";
			imgHolder.style.right = "auto";
		}else if(xHover > halfHolderWidth){
			imgHolder.style.left = (halfHolderWidth-(xHover-halfHolderWidth)) + "px";
		}
	
		if(yHover <= halfHolderHeight){
		   
			imgHolder.style.top = (halfHolderHeight-yHover+halfHolderHeight) +"px";
		}else if(yHover > halfHolderHeight){
			imgHolder.style.top = (halfHolderHeight-(yHover - halfHolderHeight)) +"px";
		}

		zoomProductHolder.addEventListener('mousemove',handleMouseMoveX);

        zoomProductHolder.addEventListener('mousemove',handleMouseMoveY);
	}

	const handleMouseOutProduct = () =>{
	
		resetProductPosition();

		zoomProductHolder.removeEventListener('mousemove',handleMouseMoveX);
    	zoomProductHolder.removeEventListener('mousemove',handleMouseMoveY);
	}

	const handleMouseMoveX = (e)=>{

	let x = e.offsetX;
	

    if(xHover <= halfHolderWidth){
		
		imgHolder.style.left = (2*halfHolderWidth-x) +"px";
		imgHolder.style.right = "auto";
		 
    }else if(xHover > halfHolderWidth){

		let imgHolderWidthString = window.getComputedStyle(imgHolder,null).getPropertyValue('width');

		let halfImgHolderWidth = (parseInt(imgHolderWidthString.replace("px","").trim())) / 2;
		imgHolder.style.left = "auto";
		imgHolder.style.right = (halfHolderWidth-halfImgHolderWidth+(x-halfHolderWidth)) +"px";
		if(yHover > halfHolderHeight){
			imgHolder.style.transform = "translate(0,0) scale(1.5,1.5)";
		}else{
			imgHolder.style.transform = "translate(0,-50%) scale(1.5,1.5)";
		}
    }
}

	const handleMouseMoveY = (e)=>{
		let y = e.offsetY;

		if(yHover <= halfHolderHeight){
		
			imgHolder.style.top = (2*halfHolderHeight-y) +"px";
			imgHolder.style.bottom = "auto";
			 
		}else if(yHover > halfHolderHeight){
	
			let imgHolderHeightString = window.getComputedStyle(imgHolder,null).getPropertyValue('height');
	
			let halfImgHolderHeight = (parseInt(imgHolderHeightString.replace("px","").trim())) / 2;
			imgHolder.style.top = "auto";
			imgHolder.style.bottom = (halfHolderHeight-halfImgHolderHeight+(y-halfHolderHeight)) +"px";

			if(xHover > halfHolderWidth){
				imgHolder.style.transform = "translate(0,0) scale(1.5,1.5)";
			}else{
				imgHolder.style.transform = "translate(-50%,0) scale(1.5,1.5)";
			}
	
	
		}
	}



	const resetProductPosition = ()=>{

		imgHolder.style.right = "auto";
    	imgHolder.style.left = "50%";
    	imgHolder.style.top = "50%";
    	imgHolder.style.bottom = "auto";
		imgHolder.style.transform = "translate(-50%,-50%) scale(1,1)";
	}

    return(
        <div className='leftProductInfo'>
					<div className='productDetailImg'>
						<img
							src={singleProduct?.imgUrl}
							alt={singleProduct?.title}
						/>
					</div>

                    <ModalZoomComponent resetProductPosition={resetProductPosition} singleProduct={singleProduct} />
					<div className="zoomProductHolder" onMouseOver = {(e)=>handleMouseOverProduct(e)} onMouseOut={()=>handleMouseOutProduct()}></div>
		</div>
    )
}

export default ProductZoomComponent;