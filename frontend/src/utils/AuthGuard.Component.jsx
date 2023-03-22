import {isUserLoggedIn} from "../services/auth.service";
import {Navigate} from "react-router-dom";


const AuthGuardComponent = ({children}) => isUserLoggedIn() ? children : <Navigate to="/login" />
// {
//     if (isUserLoggedIn())
//         return children
//
//     return <Navigate to="/login" />
// }

export default AuthGuardComponent