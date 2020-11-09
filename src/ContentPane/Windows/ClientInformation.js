import React from 'react';
import ReactComponent_Custom from '../../ReactComponent_Custom.js';
import './InquiryWindow.css';
import WindowCloseImg from '../../images/WindowClose.png';
import Client from '../Definitions/client.js';
import firebase from '../../firebase';
import Inquiry from '../Definitions/Inquiry.js'

export default class CientInformation extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            
        }   
        //bind functions
        this.customBinds();
    }

    render() {
        return (
            <div className="ClientInformation-window App-Window">
                {this.WindowControlBar("Client Information")}
                
            </div>
        )
    }
}