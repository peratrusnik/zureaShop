import React from 'react';
import {AiOutlineSearch, AiOutlineUser} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {removeUser} from '../../../../redux/user.slicer';
import {removeUserFromLocalStorage} from '../../../../services/auth.service';

function NavProfileViewComponent() {
    const dispatch = useDispatch();
    const userStore = useSelector((store) => store.userStore.user);
    const navigate = useNavigate()

    const onLogOut = () => {
        removeUserFromLocalStorage();
        dispatch(removeUser());
        navigate('/')
    };
    return (
        <>
            <div className='dropdown'>
                <button
                    className='btn  dropdown-toggle'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    <AiOutlineUser/>
                </button>
                <ul className='dropdown-menu'>
                    <li>
                        <Link className='dropdown-item' to='/'>
                            Another action
                        </Link>
                    </li>
                    <li>
                        <Link className='dropdown-item' to='/'>
                            Something else here
                        </Link>
                    </li>
                    <li>
                        {!userStore?.email ? (
                            <>
                                <Link className='dropdown-item' to='/login'>
                                    Sign In
                                </Link>
                                <Link className='dropdown-item' to='/register'>
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className='dropdown-item' to='/user'>
                                    My profile
                                </Link>
                                <Link className='dropdown-item' to='/user/products'>
                                    My products
                                </Link>
                                <Link className='dropdown-item' to='/product/create'>
                                    Add product
                                </Link>
                                <button onClick={(e) => onLogOut()}>Log out</button>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavProfileViewComponent;
