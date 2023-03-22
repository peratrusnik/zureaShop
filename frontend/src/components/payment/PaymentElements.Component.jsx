import {CardElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect} from "react";
import {toast} from "react-toastify";

const PaymentElementsComponent = ({ck}) => {
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        console.log(ck);
    }, [ck])

    const onPay = () => {
        if (!stripe || !elements || !ck) {
            return toast.error("Error while paying.")
        }
        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/order'
            }
        })
    }
    return <>
        {stripe && <div>
            <PaymentElement />
            <button onClick={onPay}>Pay</button>
        </div>}
    </>
}

export default PaymentElementsComponent