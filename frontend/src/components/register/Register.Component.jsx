import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {registerUser} from "../../services/auth.service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const RegisterSchema = Yup.object({
    email: Yup.string().email().required(),
    firstName: Yup.string().required('first name is required'),
    lastName: Yup.string().required('last name is required'),
    password: Yup.string().required(),
    username: Yup.string().required(),
})
const RegisterComponent = () => {
    const navigate = useNavigate()

    return (
        <div className="row">
            <Formik
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    username: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={values => {
                    console.log(values);
                    registerUser(values)
                        .then(response => {
                            toast.success('Successfully registered. Please check you mail box.')
                            navigate('/login')
                        })
                        .catch(error => {
                            console.log(error);
                            toast.error(error?.response.data)
                        })
                }}
            >

                {
                    ({error, touched}) => {
                        return <Form>

                            <div className="col-6">
                                <Field className="form-control"
                                       name="email"
                                       placeholder="Email"/>
                                <ErrorMessage name="email"/>

                                <Field className="form-control"
                                       name="firstName"
                                       placeholder="First name"/>
                                <ErrorMessage name="firstName"/>

                                <Field className="form-control"
                                       name="lastName"
                                       placeholder="Last name"/>
                                <ErrorMessage name="lastName"/>
                            </div>

                            <div className="col-6">
                                <Field className="form-control"
                                       name="username"
                                       placeholder="Username"/>
                                <ErrorMessage name="username"/>

                                <Field className="form-control"
                                       type="password"
                                       name="password"
                                       placeholder="Password"/>
                                <ErrorMessage name="password"/>
                            </div>
                            <button type="submit">Register</button>
                        </Form>
                    }
                }
            </Formik>
        </div>

    )
}


export default RegisterComponent