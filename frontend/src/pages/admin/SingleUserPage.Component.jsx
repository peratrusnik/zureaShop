import {useParams,Link, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUserById} from "../../services/user.service";
import {useEffect,useState} from "react";

const SingleUserPageComponent = () => {
    const { id } = useParams()
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const getSingleUserById = useQuery(
        ["getUserById"],
        () => getUserById(id),
        {
            enabled: !!id,
            onSuccess: (response) => {
                setUser(response.data)
            },           
           onError: (error) => {
            console.log(error);
            },
            onSettled: () => {

            }
        }
    )
        
        // TODO: layout user info
        useEffect(() => {
            // console.log(getSingleUserById);
            // console.log(user);
        }, [getSingleUserById])
    
        const renderSingleUser = () => {
            return user.map((user, index) => {
                return <tbody key={index}>
                    <tr>
                        <td>User id:</td>
                        <td>{user._id}</td>
                    </tr>
                    <tr>
                        <td>Username:</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>First Name:</td>
                        <td>{user.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{user.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{user.address}</td>
                    </tr>
                    <tr>
                        <td>City:</td>
                        <td>{user.city}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>{user.gender}</td>
                    </tr>
                    <tr>
                        <td>Active:</td>
                        <td>{user?.isActive ? 'yes' : 'no'}</td>
                    </tr>
            </tbody>
        })
    }
        
    return (  
        <div className="userInfoWrapper">
            <div className="userInfo">
                <h2 className="title">User info:</h2>
                <table className="table table-striped">
                    {renderSingleUser()}
                </table>
                <div className="btnWrapper d-flex justify-content-center">
                    <button className="btn btn-primary back my-3" onClick={()=> navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default SingleUserPageComponent