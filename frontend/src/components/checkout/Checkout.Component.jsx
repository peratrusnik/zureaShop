import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {setCustomer} from "../../redux/cart.slicer";
import {useNavigate} from "react-router-dom";

function CheckoutComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.userStore.user)

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            address: user?.address || '',
            city: user?.city || '',
            postCode: user?.postCode || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            address: Yup.string().required(),
            city: Yup.string().required(),
            postCode: Yup.string().required(),
            email: Yup.string().email().required(),
            phoneNumber: Yup.string().required(),
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(setCustomer(values))
            navigate('/cartshop/payment')
        }
    })
    const renderForm = () => {
        return <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text"
                       className="form-control"
                       name="firstName"
                       id="firstName"
                       value={formik.values.firstName}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.firstName && formik.errors.firstName ? <span>{formik.errors.firstName}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="lastName"
                       className="form-label">Last name</label>
                <input className="form-control"
                       id="lastName"
                       name="lastName"
                       value={formik.values.lastName}
                       onChange={formik.handleChange}
                />
                {
                    formik.touched.lastName && formik.errors.lastName ?
                        <span>{formik.errors.description}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text"
                       className="form-control"
                       name="address"
                       id="address"
                       value={formik.values.address}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.address && formik.errors.address ? <span>{formik.errors.address}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text"
                       className="form-control"
                       name="city"
                       id="city"
                       value={formik.values.city}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.city && formik.errors.city ? <span>{formik.errors.city}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="postCode" className="form-label">Post code</label>
                <input type="text"
                       className="form-control"
                       name="postCode"
                       id="postCode"
                       value={formik.values.postCode}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.postCode && formik.errors.postCode ? <span>{formik.errors.postCode}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email"
                       className="form-control"
                       name="email"
                       id="email"
                       value={formik.values.email}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                <input type="text"
                       className="form-control"
                       name="phoneNumber"
                       id="phoneNumber"
                       value={formik.values.phoneNumber}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.phoneNumber && formik.errors.phoneNumber ?
                        <span>{formik.errors.phoneNumber}</span> : null
                }
            </div>
            <button type="submit">Go to payment</button>
        </form>
    }
    return <>
        {renderForm()}
    </>
}

export default CheckoutComponent;
