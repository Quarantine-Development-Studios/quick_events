import React, {useState} from 'react';
import './TitleBar.css';
import ReactComponent_Custom from '../../CustomLibrary/ReactComponent_Custom.js';


const TitleBar = () => {
    const [rootName, ] = useState('TitleBar');


    const processButton = (e) => {
        console.log(e)
        //this.constants[e.target.attributes['callbackPointer']]();
    }

    return (
        <div className= {rootName + "-header"}>
            <h1 className={rootName + "-header-title"}>Quick Events</h1>
        </div>
    )
}

export default TitleBar;