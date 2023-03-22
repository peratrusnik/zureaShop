import {Outlet} from 'react-router-dom';
import NavComponent from './components/nav/Nav.Component';
import TopHeaderInfoComponent from './components/topHeaderInfo/TopHeaderInfo.Component';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveUser} from './redux/user.slicer';
import FooterComponent from './components/footer/Footer.Component';
import LoaderComponent from "./components/loader/LoaderComponent";
import CookieNotice from "./components/CookieNotice/CookieNotice.Component";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopComponent from './components/ScrollToTop/ScrollToTop.Component';

// axios.defaults.baseURL = "https://zurea-shop.herokuapp.com/api";
axios.defaults.baseURL = "http://localhost:5050/api";
axios.interceptors.request.use((config) => {
    if (localStorage.hasOwnProperty("zu_token")) {
        config.headers.Authorization = localStorage.getItem("zu_token")
    }
    return config
})

function App() {
    const dispatch = useDispatch();
    const [isFinish, setIsFinish] = useState(false);
    useEffect(() => {
        let userLocalStorageStr = localStorage.getItem('zu_user');
        if (userLocalStorageStr) {
            dispatch(saveUser(JSON.parse(userLocalStorageStr)));
        }
        setIsFinish(true)
    }, []);
    return isFinish && (
        <>
            <ToastContainer/>
            <LoaderComponent/>
            <TopHeaderInfoComponent/>
            <NavComponent/>
            <Outlet/>
            <ScrollToTopComponent/>
            <CookieNotice />
            <FooterComponent/>
        </>
    );
}

export default App;
