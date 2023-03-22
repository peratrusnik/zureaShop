import React, {useEffect, useState} from 'react';
import loadingImg from "../../assets/loading.gif"
import {useSelector} from "react-redux";

function LoaderComponent() {
    const {loader} = useSelector(store => store.loaderStore)
    const [isMount, setIsMount] = useState()
    useEffect(()=>{
        if(loader){
            setIsMount(loader)
        }else{
            setTimeout(()=>{
                setIsMount(loader)
            },2000)
        }
    },[loader])

    return isMount && (
        <div className="loader">
            <img src={loadingImg} alt="loader"/>
        </div>
    );
}

export default LoaderComponent;