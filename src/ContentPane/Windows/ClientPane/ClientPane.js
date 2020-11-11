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

    getDisplayContents(){
        console.log('trying to get Display Contents')
        if(this.props.viewingInquiry && this.props.inquiry !== undefined){
            const dispItems = [];
            const inquiry = new Inquiry(this.props.inquiry)
            console.log(inquiry)

            for(const [key, value] of Object.entries(inquiry.basicInfo)){
                let _key = key.replace(/([A-Z])/g, ' $1').trim();
                _key = _key.charAt(0).toUpperCase() + _key.slice(1);

                dispItems.push(this.InfoField(_key, 'InquiryPane', value, this.setValue, 'inquiry'));
            }


            return (
                <div className="InquiryPane-content">
                    {dispItems}
                </div>
            ) 

        } else {
            return (<div></div>);
        }
    }





    render() {
        return (
            <div className="ClientPane App-Window">
                {this.WindowControlBar("Client Information")}   
                <div className="ClientPane-content">
                    {this.InfoField('Name', 'ClientPane', this.props.client['name'], this.setValue, 'client')}
                    {this.InfoField('Email', 'ClientPane', this.props.client['email'], this.setValue, 'client')}
                    {this.InfoField('Phone', 'ClientPane', this.props.client['phone'], this.setValue, 'client')}
                </div>
                {this.Divider()}
                {this.getDisplayContents()}
            </div>
        )
    }
}