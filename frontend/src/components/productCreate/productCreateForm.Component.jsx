import {useFormik} from "formik";
import * as Yup from 'yup'
import {useEffect, useState} from "react";
import {CreateProduct, GetProduct, UpdateProduct} from "../../services/product.service";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {toggleLoader} from "../../redux/loader.slicer";

const ProductCreateEditFormComponent = () => {
    const [imgString, setImgString] = useState('')
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
    })
    const [errorMsg, setErrorMsg] = useState('')
    const user = useSelector(store => store.userStore.user)
    const {productId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        productId && getEditProduct()
    }, [productId])

    const getEditProduct = () => {
        dispatch(toggleLoader(true))
        GetProduct(productId)
            .then(response => setProduct(response.data))
            .catch(error => setErrorMsg(error.response.data))
            .finally(() => dispatch(toggleLoader(false)))
    }

    const formik = useFormik({
        initialValues: product,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required("THIS INPUT FIELD IS REQUIRED!"),
            description: Yup.string().required(),
            price: Yup.number().min(1, 'must be more then 0.').required()
        }),
        onSubmit: (values) => {
            if (!user?._id) return null;
            onSubmitForm(values)
        }
    })
    const onSubmitForm = (values) => {
        dispatch(toggleLoader(true))
        if (productId) {
            onUpdateProduct(values)
        } else {
            onCreateProduct(values)
        }
    }
    const onUpdateProduct = (values) => {
        console.log(values);
        UpdateProduct({
            ...values,
            imgUrl: imgString || values.imgUrl
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => dispatch(toggleLoader(false)))
    }
    const onCreateProduct = (values) => {
        CreateProduct({
            ...values,
            userId: user?._id,
            imgUrl: imgString
        })
            .then(response => {
                console.log(response);
                //TODO: add msg and redirect
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => dispatch(toggleLoader(false)))
    }
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            // native DOM class
            const fileReader = new FileReader()
            // convert file to base64
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                setImgString(fileReader.result)
            }
            fileReader.onerror = () => {
                console.log(fileReader.error);
            }
        })
    }
    const handleFileUpload = event => {
        const file = event.target.files[0]
        convertFileToBase64(file)
    }

    const renderForm = () => {
        return <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text"
                       className="form-control"
                       name="title"
                       id="title"
                       value={formik.values.title}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.title && formik.errors.title ? <span>{formik.errors.title}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="description"
                       className="form-label">Description</label>
                <textarea className="form-control"
                          id="description"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          rows="3"></textarea>
                {
                    formik.touched.description && formik.errors.description ?
                        <span>{formik.errors.description}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number"
                       className="form-control"
                       name="price"
                       id="price"
                       value={formik.values.price}
                       onChange={formik.handleChange}/>
                {
                    formik.touched.price && formik.errors.price ? <span>{formik.errors.price}</span> : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Image</label>
                <input type="file"
                       accept="image/*"
                       className="form-control"
                       name="price"
                       id="price"
                       onChange={e => handleFileUpload(e)}
                />
            </div>
                    <div className="mb-3">
                        <img src={imgString || product.imgUrl} alt=""/>
                    </div>
            <button type="submit">{productId ? 'Update' : 'Create'}</button>
        </form>
    }
    return (
        <>
            <h6>{errorMsg}</h6>
            {
                renderForm()
            }
        </>
    )
}

export default ProductCreateEditFormComponent