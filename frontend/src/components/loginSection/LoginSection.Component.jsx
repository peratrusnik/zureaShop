import {useState} from 'react';
import HeaderComponent from '../headerSection/Header.Component';
import {loginUser, setTokenToLocalStorage, setUserToLocalStorage} from "../../services/auth.service";
import {post} from "axios";
import {redirect, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveUser} from "../../redux/user.slicer";
import {toast} from "react-toastify";
import ButtonComponent from "../../UIkit/Button.Component";

const LoginSectionComponent = () => {
    const [signInObj, setSignInObj] = useState({
        email: '',
        password: ''
    })
    const [validationMsg, setValidationMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [inputType, setInputType] = useState('password');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignInObj = (e) => {
        let newStateObj = signInObj;
        newStateObj[e.target.name] = e.target.value;
        setSignInObj(newStateObj);
    };

    const onLoginSubmit = () => {
        if (!signInObj.password || !signInObj.email) {
            return setValidationMsg(`Required field: ${!signInObj.password ? 'password' : 'email'}`)
        }
        loginUser(signInObj)
            .then(response => {
                if (response.status === 215) {
                    toast.error(response.data)
                } else {
                    setUserToLocalStorage(response.data.user)
                    setTokenToLocalStorage(response.data.token)
                    dispatch(saveUser(response.data.user))
                    navigate(response.data.user.isAdmin ? '/dashboard' : '/')
                }
            })
            .catch(error => {
                console.log('error...', error);
                if (error) {
                    setErrorMsg('Something went wrong. Please try again.')
                }
            })
    };


    const changeViewPass = (inputType) => {
        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
    };

    return (
        <>
            <HeaderComponent title='Log in to your account'/>
            <div className='from-wrapper'>
                <div className='login-form'>
                    <div className='form-floating mb-3'>
                        <p>Email</p>
                        <input
                            type='email'
                            className='form-control shadow-none'
                            id='floatingInput'
                            name='email'
                            onChange={(e) => handleSignInObj(e)}
                            placeholder='name@example.com'
                        />
                    </div>
                    <div className='form-floating mb-3'>
                        <p>Password</p>
                        <input
                            type={inputType}
                            className='form-control shadow-none'
                            name='password'
                            onChange={(e) => handleSignInObj(e)}
                            id='floatingPassword'
                            placeholder='Password'
                        />
                        <button
                            className='btn-Password'
                            onClick={() => changeViewPass(inputType)}>
                            {inputType === 'password' ? 'SHOW' : 'HIDE'}
                        </button>
                    </div>
                    {
                        errorMsg ? <p>{errorMsg}</p> : null
                    }

                    <ButtonComponent btnText="Sign In" btnClick={() => onLoginSubmit()} />
                </div>
            </div>
        </>
    )
}


// 					{validationMsg ? (
// 						<p className='errorMsg'>{validationMsg}</p>
// 					) : null}
//
// 					<a href='/' className='forgotPassword'>
// 						Forgot your password?
// 					</a>
//
// 					<button className='btn-SignIn' onClick={onLoginSubmit}>
// 						Sign In
// 					</button>
// 					<div className='line'></div>
// 					<a href='/' className='noAcc'>
// 						No account? Create one here
// 					</a>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

export default LoginSectionComponent;
