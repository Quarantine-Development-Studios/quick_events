import React, { useState, useEffect } from 'react';
import React_Custom from '../CustomLibrary/ReactComponent_Custom.js';
import TitleBar from './TitleBar/TitleBar.js';
import ContentPane from './ContentPane/ContentPane.js';
import AuthPane from './Auth/AuthPane.js';
import {firebaseConfig} from '../firebase/firebase.js';

export const AuthContext = React.createContext(null);

const Controller = () => {
    const[isLoggedIn, setLoggedIn] = useState(false);

    function readSession() {
        const user = window.sessionStorage.getItem(
                `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
            );
            if (user) setLoggedIn(true)
      }
      useEffect(() => {
        readSession()
      }, [])


    const getDisplay = () => {
        if(isLoggedIn){
            return(
                <ContentPane
                    isLoggedIn = {isLoggedIn}
                />
            )
        } else {
            return(
                <AuthPane 
                    isLoggedIn = {isLoggedIn}
                />
            )
        }
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setLoggedIn }}>
            <div className="App">
                <TitleBar />


                {getDisplay()}
                {<li className="test-line">{'is logged in: ' + isLoggedIn}</li>
                }
            </div>
        </AuthContext.Provider>
    )
}

export default Controller;