import React, {useContext, useState} from 'react';
import './TitleBar.css';
import qds_Custom from '../resources/qds_Library/qds_custom.js';
import qds_Deps from '../resources/qds_Library/qds_deps.js';
import {AuthContext} from '../Controller.js';

const TitleBar = (props) => {
    const Auth = useContext(AuthContext);

    const [rootName, ] = useState('TitleBar');

    const tryGenerateLogoutButton = () => {
        

        if(Auth.isLoggedIn) {   
            return (
            <div className="TitleBar-button-container">
                {qds_Custom.ReactButton(
                    new qds_Deps.ButtonReq("Logout", "Log Out", props.triggerLogout, null),
                    "TitleBar-button AppLogout",
                    "AppLogout-Button"
                )}
            </div>
        )}
    }

    return (
        <div className= {rootName + "-header"}>
            <h1 className={rootName + "-header-title"}>Quick Events</h1>
            {/*use qds custom library to generate Buttons accross all app to unify styles automatically*/}
            {tryGenerateLogoutButton()}
        </div>
    )
}

export default TitleBar;