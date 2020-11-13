import React from 'react';
import ReactComponent_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
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



    getDisplayContents(){
        console.log('trying to get Display Contents')
        if(this.props.viewingInquiry && this.props.inquiry !== undefined){
            const dispItems = [];
            //translate into native format
            const inquiry = new Inquiry(this.props.inquiry)
            console.log(inquiry)

            for(const [key, value] of Object.entries(inquiry.basicInfo)){
                if(key !== 'id'){
                    let _key = key.replace(/([A-Z])/g, ' $1').trim();
                    _key = _key.charAt(0).toUpperCase() + _key.slice(1);
                    

                    dispItems.push(this.InfoField(_key, 'InquiryPane', value, this.setValue, 'inquiry'));
                }
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
        //TODO: add test to insert blank inquiry as linked to current Client when activated

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