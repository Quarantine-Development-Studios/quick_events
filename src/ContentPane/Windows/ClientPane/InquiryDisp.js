import React from 'react';
import ReactComponent_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './InquiryDisp.css';
import WindowCloseImg from '../../../images/WindowClose.png';
import Client from '../../Definitions/client.js';
import firebase from '../../../firebase';
import Inquiry from '../../Definitions/Inquiry.js'
import { getByDisplayValue } from '@testing-library/react';

export default class InquiryPane extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            inquiryInfo: false,
            editable: true,
        }   
        //bind functions
        this.customBinds();
        this.getDisplayContents = this.getDisplayContents.bind(this);
        this.setValue = this.setValue.bind(this);
    }


    getDisplayContents(){
        const dispItems = [];
        const inquiry = new Inquiry(this.props.inquiry)
        for(const [key, value] of Object.entries(inquiry.basicInfo)){
            let _key = key.replace(/([A-Z])/g, ' $1').trim();
            _key = _key.charAt(0).toUpperCase() + _key.slice(1);
            dispItems.push(this.InfoField(_key, 'InquiryPane', value, this.setValue));
        }


        return (
            <div className="InquiryPane-content">
                {dispItems}
            </div>
        )
    }


    render(){

        return (
            <div className="InquiryPane">
                {this.getDisplayContents()}
            </div>
        )
    }
}