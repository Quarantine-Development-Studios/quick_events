import React, {useState} from 'react';
import './TitleBar.css';
import qds_Custom from '../resources/qds_Library/qds_custom.js';


const TitleBar = () => {
    const [rootName, ] = useState('TitleBar');

    return (
        <div className= {rootName + "-header"}>
            <h1 className={rootName + "-header-title"}>Quick Events</h1>
        </div>
    )
}

export default TitleBar;