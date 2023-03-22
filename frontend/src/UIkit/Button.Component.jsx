

const ButtonComponent = ({ btnText, btnClick, btnStyle}) => {

    return (
        <button
            className='zu-product-item-btn'
            style={
            {...btnStyle}}
            onClick={btnClick}>
            {btnText}
        </button>
    )
}

export default ButtonComponent