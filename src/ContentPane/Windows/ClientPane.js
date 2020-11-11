import React from 'react';
import ReactComponent_Custom from '../../ReactComponent_Custom.js';
import './ClientPane.css';
import WindowCloseImg from '../../images/WindowClose.png';
import Client from '../Definitions/client.js';
import firebase from '../../firebase';
import Inquiry from '../Definitions/Inquiry.js'
import rxInquiries from '../../rxInquiries.js';


export default class ClientPane extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            editable: true,
        }   

        //bind functions
        this.customBinds();
        this.tryShowInquiryInfo = this.tryShowInquiryInfo.bind(this);
        
    }

    createInquiry(){
        let inquiry = new Inquiry();
        let entry = firebase.firestore().collection('inquiries').doc();
        entry.set(
            inquiry.BasicToJSON()
        )
        this.state.inquiries.push(inquiry);
    }



    tryShowInquiryInfo(){
        
        if(this.state.selectedInquiry !== undefined){
            console.log(this.state.selectedInquiry)
/*             return (
                <InquiryPane 
                    stateHandler = {this.stateHandler}
                    inquiry = {this.state.selectedInquiry}
                />
            ) */
        }
    }


    setValue(event){
        console.log("event test")
        console.log(event)
    }


    render() {
        console.log(this.tryShowInquiryInfo())
        return (
            <div className="ClientPane App-Window">
                {this.WindowControlBar("Client Information")}   
                <div className="ClientPane-content">
                    {this.InfoField('Name', 'ClientPane', this.props.client['name'], this.setValue)}
                    {this.InfoField('Email', 'ClientPane', this.props.client['email'], this.setValue)}
                    {this.InfoField('Phone', 'ClientPane', this.props.client['phone'], this.setValue)}
                </div>
                {this.Divider()}
            </div>
        )
    }
}