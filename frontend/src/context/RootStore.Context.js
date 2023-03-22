import {createContext, useState} from "react";
import {UserContext} from "./User.Context";

// state
const ContextRootState = createContext(null)
// setState
const ContextRootDispatch = createContext(null)
function RootStoreContext({children}) {
    const [rootState, setRootState] = useState({
        testValue: 'keyVelue',
        ...UserContext
    })

    return (
        // rootState
        <ContextRootState.Provider value={rootState}>
            {/*setRootState*/}
            <ContextRootDispatch.Provider value={setRootState}>
                {children}
            </ContextRootDispatch.Provider>
        </ContextRootState.Provider>
    )
}

export {RootStoreContext, ContextRootState, ContextRootDispatch}