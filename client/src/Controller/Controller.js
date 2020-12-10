import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import TitleBar from './TitleBar/TitleBar.js';
import ContentPane from './ContentPane/ContentPane.js';
import AuthPane from './Auth/AuthPane.js';
import axios from 'axios';

export const AuthContext = React.createContext(null);

const Controller = () => {
    const[isLoggedIn, setLoggedIn] = useState(false);

    function readSession() {
        //grab api key
        axios.get('/api/v1/firebaseConfig-apiKey').then((res) => {
            const response = res.data;
            console.log(response)

            const user = window.sessionStorage.getItem(
                `firebase:authUser:${response.keys.firebaseApiKey}:[DEFAULT]`
            );
            if (user) {
                setLoggedIn(true) 
            } else {
                setLoggedIn(false)
            }
        })
      }

      console.log(window.sessionStorage)

      useEffect(() => {
        readSession()
      }, [])

    /**
     * Clear Session and setLoggedIn to false to refresh the component
     */
    const triggerLogout = () => {
        console.log(window.sessionStorage)
        firebase.auth().signOut().then(() => {
            //sign-out successful
        }).catch(() => {
            //an error happened
        });
        setLoggedIn(false);
    }


    return (
        <AuthContext.Provider value={{isLoggedIn, setLoggedIn }}>
            <div className="App">
                <TitleBar 
                    triggerLogout={triggerLogout}
                />

                {   //show AuthPane or ContentPane depending on whether user is logged in
                    (!isLoggedIn) ? 
                        (<AuthPane />) : (<ContentPane />)
                }

            </div>
        </AuthContext.Provider>
    )
}

export default Controller;