import React from 'react';
import ReactComponent_Custom from '../../ReactComponent_Custom.js';
import './InquiryWindow.css';
import WindowCloseImg from '../../images/WindowClose.png';
import Client from '../Definitions/client.js';
import firebase from '../../firebase';
import Inquiry from '../Definitions/Inquiry.js'

export default class InquiryWindow extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            inquiry: this.props.inquiry,
            inquiryInfo: false,
            editable: true,
        }   
        //bind functions
        this.customBinds();
        this.getProperInfo = this.getProperInfo.bind(this);
        this.getDisplayContents = this.getDisplayContents.bind(this);
    }

    getProperInfo(){
        console.log(this.state.inquiry)

        if(this.state.inquiry instanceof Inquiry){
            console.log(this.state.inquiry);
            this.state.inquiryInfo = this.state.inquiry.getBaseProps();
            return this.state.inquiryInfo;
        } else {
            return false;
        }
    }

    getDisplayContents(){
        if(!this.state.inquiryInfo){ this.getProperInfo(); }

        const dispItems = [];
        if(this.state.inquiryInfo !== false){
            for(const [key,value] of Object.entries(this.state.inquiryInfo)){
                dispItems.push(this.InfoField(key, 'InquiryWindow', value));
            }
        }

        return (
            <div className="InquiryWindow-content">
                {dispItems}
            </div>
        )
    }


    render(){
        return (
            <div className="inquiry-window App-Window">
                {this.WindowControlBar("Inquiry Window")}
                {this.getDisplayContents()}
            </div>
        )
    }
}