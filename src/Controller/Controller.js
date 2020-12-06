import React, { useState, useEffect } from 'react';
import TitleBar from './TitleBar/TitleBar.js';
import ContentPane from './ContentPane/ContentPane.js';
import AuthPane from './Auth/AuthPane.js';
import {firebaseConfig} from './resources/firebase/firebase.js';

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
        if(!isLoggedIn){
            return(
                //render Authentication Layer
                <AuthPane />
            )
        } else {
            return(
                //User is logged in
                //allow pass to Content
                <ContentPane />
            )
        }
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setLoggedIn }}>
            <div className="App">
                <TitleBar />


                {getDisplay()}
            </div>
        </AuthContext.Provider>
    )
}

export default Controller;