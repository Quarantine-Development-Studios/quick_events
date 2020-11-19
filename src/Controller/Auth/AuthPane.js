import React, {useState, useContext} from 'react';
import ReactComponent_Custom from '../../CustomLibrary/ReactComponent_Custom.js';
import firebase from 'firebase/app';
import {AuthContext} from '../Controller.js';
import './AuthPane.css';
import Controller from '../Controller.js';

const AuthPane = () => {

    const Auth = useContext(AuthContext);

    const handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                    console.log(result)
                    Auth.setLoggedIn(true)
                })
                .catch(e => console.log(e))
            })
    }


    return (
        <div className="App-Window AuthPane">
            <div className="AuthPane-titlebar">
                <label className="AuthPane-titlebar-label">Login:</label>
            </div>
            <form /* onSubmit={e => handleForm(e)} */>
                <hr />
                <button onClick={ () => handleGoogleLogin()} className="Btn" type="button" >

                </button>
            </form>
        </div>
    )

}

export default AuthPane;