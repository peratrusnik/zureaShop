import {useEffect, useState} from "react";
import {ChangeUserActiveStatus, DeleteUser, getAllUsers, SearchUser} from "../../services/user.service";
import {useDispatch} from "react-redux";
import {toggleLoader} from "../../redux/loader.slicer";
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useSearchParams, Link, useParams} from "react-router-dom";
const perPageNums = [15, 30, 60, 90];

const UsersPageComponent = () => {
    // const [users, setUsers] = useState([])
    // const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [searchedValue, setSearchedValue] = useState([])
    const [queryParams, setQueryParams] = useSearchParams()
    const [paginationObject, setPaginationObject] = useState({
        page: queryParams.has('page') ? queryParams.get('page') -1 : 0,
        totalItems: 0,
        elPerPage: queryParams.has('limit') ? queryParams.get('limit') : 15,
    })
    const [total,setTotal] = useState('')
    const {data, isSuccess, isError, isLoading, error, refetch} = useQuery(
        ["getAllUsers"],
        () => getAllUsers(paginationObject.elPerPage, paginationObject.page),
        {
            enabled: false,
            // .then()
            onSuccess: (response) => {
                // console.log(response.data.elements);
                setPaginationObject(response.data.pagination)
                setTotal(response.data.pagination.totalItems)
                console.log(data);
            },
            // .catch()
            onError: (error) => {
                console.log(error);
            },
            // .finally()
            onSettled: () => {

            }
        }
    )

    // todo: add pagination
    useEffect(() => {
        refetch()
        // console.log(paginationObject);
        setQueryParams({
            limit: paginationObject.elPerPage,
            page: paginationObject.page +1,
        })
    }, [paginationObject.page, paginationObject.elPerPage])

    useEffect(() => {
        dispatch(toggleLoader(isLoading))
        // console.log(data);
    }, [isLoading,data])

    const renderErrorMsg = () => isError ? <p>{error.message}</p> : null

    const onChangeHandler = (id, isActive) => {
        ChangeUserActiveStatus({ id, isActive })
            .then((res) => {
                console.log(res.data);
                refetch()
            })
            .catch((err) => {
            console.log(err);
        })
    }

    const onDeleteHandler = (id) => {
        DeleteUser(id)
            .then((res) => {
                console.log(res.data);
                refetch()
            })
            .catch((err) => {
                console.log(err);
        })
    }

    const onSearchHandler = () => {
        if (searchValue) {
            // navigate(`/dashboard/${searchValue.replaceAll(' ', '-')}`)
            SearchUser({searchValue})
            .then((res) => {
                console.log(res.data);
                setSearchedValue(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    
    const renderUsers = () => {
        // console.log(searchValue);
        // console.log(searchedValue);
        if (searchValue != '') {

            // SearchUser({searchValue})
            return searchedValue.map((user, index) => {
                return <tr key={index}>
                    <td>
                        <Link to={"/dashboard/user/" + user?._id}>{user?.firstName} {user?.lastName}</Link>
                    </td>
                    <td>{user?.username}</td>
                    <td><Link to={"/dashboard/user/" + user?._id}>{user?.email}</Link></td>
                    {/*todo: switch for changing isActive status*/}
                    <td>{user?.isActive ? 'yes' : 'no'}</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                checked={user.isActive }
                                onChange={() => onChangeHandler(user._id, user.isActive)} />
                        </div>
                    </td>
                    <td>
                        <div
                            className="btn btn-danger btn-sm"
                            type="button"
                            onClick={() => { if (window.confirm(`Are you sure want to delete: \n ${user.firstName } ${user.lastName } \n ${user.email} ?`)) { onDeleteHandler(user._id) } }}
                        >Delete</div>
                    </td>
                </tr>
            })           
        } else {
            if (isSuccess && data.data.elements.length) {
                return data.data.elements.map((user, index) => {
                    <div>{ user.length}</div>
                    return <tr key={index} >
                        {/* onClick={e => navigate(`/dashboard/user/${user._id}`)} */}
                        {/* <th scope="row">{index++}</th> */}
                        <td>
                            <Link to={"/dashboard/user/" + user?._id}>{user?.firstName} {user?.lastName}</Link>
                        </td>
                        <td>{user?.username}</td>
                        <td><Link to={"/dashboard/user/" + user?._id}>{user?.email}</Link></td>
                        {/*todo: switch for changing isActive status*/}
                        <td>{user?.isActive ? 'yes' : 'no'}</td>
                        <td>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={user.isActive }
                                    onChange={() => onChangeHandler(user._id, user.isActive)} />
                            </div>
                        </td>
                        <td>
                            <div
                                className="btn btn-danger btn-sm"
                                type="button"
                                onClick={() => { if (window.confirm(`Are you sure want to delete: \n ${user.firstName } ${user.lastName } \n ${user.email} ?`)) { onDeleteHandler(user._id) } }}
                            >Delete</div>
                        </td>
                    </tr>
                })
            }         
        }
    } 
    

    const renderPaginationNums = () => {
        let pagesNum = Math.ceil(paginationObject.totalItems / paginationObject.elPerPage)
        // set new array with every number from 0 to pageNumber
        let pagesArray = [...Array(pagesNum).keys()]
        return pagesArray.map(number => <li className={(number+1==queryParams.get('page') ? "active " : "") + "page-item"} key={number} onClick={() => {
            setPaginationObject((prevState)=>({...prevState, page: number}))
        }}><p className="page-link" href="#">{ number + 1 }</p></li>)
    }

    const renderPerPageDropDown = () => 
        perPageNums.map((number, index) => 
            <p className="dropdown-item"
                key={index}
                onClick={() => setPaginationObject((prevState) => ({ ...prevState, elPerPage: number }))}>{number}
            </p>
        )

    return (
        <>
            <h1>Users</h1>
            <div className='searchPanel'>
                <input type="text" onChange={event => setSearchValue(event.target.value)}/>
                <button onClick={() => onSearchHandler(searchValue)}>Search</button>
            </div>
            <h4>Total users: {total}</h4>
            {renderErrorMsg()}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Full name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Active</th>
                    <th scope="col">Off / On</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {renderUsers()}
                </tbody>
            </table>
            <div className="row">
                <div className="col-12 d-flex justify-content-center my-5">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle border btn-light mx-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Per page: { paginationObject.elPerPage}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {renderPerPageDropDown()}
                        </div>
                    </div>
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className="page-item" onClick={() => {
                                    // if(paginatioinObjcet.page) //same code
                                    if (paginationObject.page > 0) {
                                        setPaginationObject((prevState) => ({ ...prevState, page: prevState.page -1 }))
                                    }
                                }}
                            >
                            <p className="page-link">Previous</p>
                            </li>
                            {renderPaginationNums()}
                            <li className="page-item" onClick={() => {
                                let pagesNum = Math.ceil(paginationObject.totalItems / paginationObject.elPerPage)
                                    if (paginationObject.page + 1 < pagesNum) {
                                        setPaginationObject((prevState) => ({ ...prevState, page: prevState.page + 1 }))
                                    }
                                }}
                            >
                            <p className="page-link">Next</p>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default UsersPageComponent
