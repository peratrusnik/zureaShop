import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {saveUserOrder} from "../services/user.service";


const OrderPageComponent = () => {
    const [redirectStatus, setRedirectStatus] = useState('')
    const [searchParams] = useSearchParams()
    const cart = useSelector(state => state.cartStore)

    useEffect(() => {
        setRedirectStatus(searchParams.get('redirect_status'))
    }, [searchParams])

    useEffect(() => {
        cart?.totalPrice && saveUserOrder({})
            .then(response => {
                // debugger
            })
            .catch(error => {
                // debugger
            })
            .finally(() => {
                // debugger
                console.log('finally');
            })
    }, [cart])

    //todo: render cart products
    const renderMsg = () => {
        if (!redirectStatus || redirectStatus !== 'succeeded') return <p>Something went wrong with payment.</p>
        return <p>Successfully bought products.</p>
    }
    return <>
        <h2>Order finalized</h2>
        {renderMsg()}
    </>
}

export default OrderPageComponent