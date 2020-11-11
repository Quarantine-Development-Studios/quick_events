import React from 'react';
import ReactComponent_Custom from '../../../ReactComponent_Custom.js';
import './ClientPane.css';
import WindowCloseImg from '../../../images/WindowClose.png';
import Client from '../../Definitions/client.js';
import firebase from '../../../firebase';
import Inquiry from '../../Definitions/Inquiry.js';
import InquiryDisp from './InquiryDisp.js';
import rxInquiries from '../../../rxInquiries.js';


export default class ClientPane extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            editable: true,
        }   

        //bind functions
        this.customBinds();
        
    }

/*     createInquiry(){
        let inquiry = new Inquiry();
        let entry = firebase.firestore().collection('inquiries').doc();
        entry.set(
            inquiry.BasicToJSON()
        )
        this.state.inquiries.push(inquiry);
    } */



    tryShowInquiryInfo(){
        
        if(this.props.selectedInquiry !== '' && this.props.viewingInquiry === true){
            const inquiry = this.props.inquiries.filter(inquiry => inquiry.id = this.props.selectedInquiry);
            console.log('testing inquiry')
            console.log(inquiry)
            return (
                <InquiryDisp
                    stateHandler = {this.stateHandler}
                    inquiry = {inquiry}
                />
            )
        }
    }





    render() {
        console.log(this.tryShowInquiryInfo())
        return (
            <div className="ClientPane App-Window">
                {this.WindowControlBar("Client Information")}   
                <div className="ClientPane-content">
                    {this.InfoField('Name', 'ClientPane', this.props.client['name'], this.setValue, 'client')}
                    {this.InfoField('Email', 'ClientPane', this.props.client['email'], this.setValue, 'client')}
                    {this.InfoField('Phone', 'ClientPane', this.props.client['phone'], this.setValue, 'client')}
                </div>
                {this.Divider()}
            </div>
        )
    }
}