import React, { useState } from 'react';
import React_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './ClientPane.css';
import Inquiry from '../../Definitions/Inquiry.js';
import CC from '../../../CustomLibrary/Object_Custom.js';
import InquiryDisp from './InquiryDisp.js';


const ClientPane = (props) => {
    const [rootName, ] = useState('ClientPane');

    //#region Inquiry Handling
    const createInquiry = (e) => {
        if(props.selectedClient !== ''){
            let newInquiry = Inquiry.createInquiryByClient(props.client);
            React_Custom.dbInsertEntry('inquiries', newInquiry, linkInquiry)
        }
    }

    const removeInquiry = (e) => {
        if(this.props.selectedInquiry !== ''){
            const inquiryID = props.selectedInquiry;
            const clientID = props.client.id;
            
            let linkedInquiries = props.client.inquiries;
            let newLinkedInquiries = [];

            for(let i = 0; i < linkedInquiries.length; i++){
                if(linkedInquiries[i] !== inquiryID){ 
                    newLinkedInquiries.push(linkedInquiries[i]);
                }
            }
            
            //unlink from client
            React_Custom.dbSetValue('clients', clientID, 'inquiries', newLinkedInquiries);

            //remove from inquiries collection
            React_Custom.dbRemoveEntry('inquiries', inquiryID);
            props.setSelectedInquiry('');
        }
    }

    const linkInquiry = (id) => {
        if(props.selectedClient !== ''){
            const client = props.client;
            let newArray = (client.inquiries) ? client.inquiries : [];
            //push id to array
            newArray.push(id);
            //insert into db
            React_Custom.dbSetValue('clients', client.id, 'inquiries', newArray);
            //select the inquiry to auto display it
            props.setSelectedInquiry(id);
        }
    }
    //#endregion

    const getButtons = (buttonReqs) =>{
        const rItems = [];
        let i = 0;
        for(const [ , ButtonReq] of Object.entries(buttonReqs)){
            const btn = React_Custom.ReactButton(ButtonReq, rootName, rootName + '-button-' + i);
            rItems.push(btn)
            i++;
        }

        return (
            <div className="App-header-menu">
                {rItems}
            </div>   
        );
    }

    const getDisplayContents = () => {
        if(props.viewingInquiry && props.inquiries && 
            React_Custom.getEntry(props.inquiries, props.selectedInquiry)){

            return (
                <InquiryDisp 
                    inquiry = {React_Custom.getEntry(props.inquiries, props.selectedInquiry)}

                    selectedClient = {props.selectedClient}
                    selectedInquiry = {props.selectedInquiry}
                    
                    setValue = {setValue}

                />
            ) 

        } else {
            return (<div></div>);
        }
    }       


    
    const setValue = (event) => {
        // console.log('attempting to change db value')
        const cbPointer = event.target.attributes['callbackpointer'].value;
        const value = event.target.value;

        let dbKey;
        let dbRootKey;

        switch (cbPointer) {
            case 'client':
                dbKey = props.selectedClient;
                dbRootKey = 'clients';
                break;
            case 'inquiry':
                dbKey = props.selectedInquiry;
                dbRootKey = 'inquiries';
                break;
            default:
                console.log('unable to set dbRoot in "setValue()"');
                return undefined;
        }


        //parse id for fieldkey
        let fieldKey = event.target.attributes['id'].value.split('-');
        fieldKey = fieldKey[fieldKey.length - 1]; //grab last index of array
        fieldKey = fieldKey[0].toLowerCase() + fieldKey.slice(1);
        fieldKey = fieldKey.replace(' ', '');

        console.log('setValue')
        if(dbRootKey && dbKey && fieldKey){
            console.log({dbRootKey, dbKey, fieldKey, value})
            //lock name, email and phone to linked inquiries
            if(fieldKey === 'name' || fieldKey === 'email' || fieldKey === 'phone'){
                const dbCRootKey = 'clients';
                const dbCKey = props.selectedClient;


                React_Custom.dbSetValue(dbCRootKey, dbCKey, fieldKey, value); 
                console.log('client');
                const client = React_Custom.getEntry(props.clients, props.selectedClient);
                console.log(client);

                if(client){
                    React_Custom.dbUpdateLinkedInquiries(client, fieldKey, value); 
                }
            } else {

                React_Custom.dbSetValue(dbRootKey, dbKey, fieldKey, value)
            }
        } else {
            console.log('improper input')
            console.log({dbRootKey, dbKey, fieldKey, value})
        }
    }
    
    const buttonReqs = {
        'CreateInquiry': new CC.ButtonReq('CreateInquiry', 'Create Inquiry', createInquiry),
        'RemoveInquiry': new CC.ButtonReq('RemoveInquiry', 'Remove Inquiry', removeInquiry)
    }

    if(props.client !== undefined){
        return (
            <div className="ClientPane App-Window">
                {React_Custom.WindowControlBar("Client Information")}   
                <div className="ClientPane-content">
                    {React_Custom.InfoField('Name', 'ClientPane', props.client['name'], setValue, 'client')}
                    {React_Custom.InfoField('Email', 'ClientPane', props.client['email'], setValue, 'client')}
                    {React_Custom.InfoField('Phone', 'ClientPane', props.client['phone'], setValue, 'client')}
                    {getButtons(buttonReqs)}
                </div>

                {React_Custom.Divider()}
                {getDisplayContents()}
            </div>
        )
    } else {
        return (
            <div className="ClientPane App-Window">

            </div>  
        )
    }
    
}

export default ClientPane;