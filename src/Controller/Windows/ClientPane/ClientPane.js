import React, { useEffect, useState } from 'react';
import React_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './ClientPane.css';
import Inquiry from '../../Definitions/inquiry.js';
import CC from '../../../CustomLibrary/Object_Custom.js';
import InquiryInfo from './InquiryInfo.js';
import ClientInfo from './ClientInfo.js';

const ClientPane = (props) => {
    console.log('ClientPane Loaded')
    const rootName = 'ClientPane';

    const [client, setClient] = useState(null);
    const [inquiry, setInquiry] = useState(null);




    let inquiryDisp = null;

    useEffect(() => {
        setClient(props.client)
    }, [props.client])


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


    //check/set local inquiry if props.selectedInquiry is defined
    //set local inquiry to null if not
    if(props.selectedInquiry !== "") {
        const newInquiry = React_Custom.getEntry(props.inquiries, props.selectedInquiry);

        if(inquiry !== newInquiry){
            setInquiry(newInquiry);
        }
    } else {
        if(inquiryDisp){ inquiryDisp = null; }
        if(inquiry) { setInquiry(null) }
    }


    //#region Inquiry Handling
    const createInquiry = (e) => {
        let newInquiry = Inquiry.createInquiryByClient(props.client);
        React_Custom.dbInsertEntry('inquiries', newInquiry, linkInquiry)
    }

    const removeInquiry = (e) => {
        if(inquiry){
            const inquiryID = inquiry.id;
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
 
    
    
    //update inquiry Display if nescessary
    if(props.viewingInquiry && props.selectedInquiry){
        const newInquiry = React_Custom.getEntry(props.inquiries, props.selectedInquiry);
        if(!inquiry || inquiry !== newInquiry){
            //inquiryDisp = getDisplayContents(newInquiry)
            setInquiry(newInquiry);
        } else {
            //inquiryDisp = getDisplayContents(inquiry)
        }
    }


    
    const buttonReqs = {
        'CreateInquiry': new CC.ButtonReq('CreateInquiry', 'Create Inquiry', createInquiry),
        'RemoveInquiry': new CC.ButtonReq('RemoveInquiry', 'Remove Inquiry', removeInquiry)
    }

    return (
        <div className={rootName + " App-Window"}>
            {React_Custom.WindowControlBar("Client Information")}   

            <ClientInfo
                rootName = {rootName}

                selectedClient = {props.selectedClient}
                client = {props.client}

                setValue = {setValue}
            />
            {React_Custom.getButtons(buttonReqs, rootName)}

            {React_Custom.Divider()}

            <InquiryInfo
                rootName = {rootName}

                selectedClient = {props.selectedClient}
                client = {props.client}

                inquiries = {props.inquiries}
                selectedInquiry = {props.selectedInquiry}
                setSelectedInquiry = {props.setSelectedInquiry}
                
                setValue = {setValue}
            />

            {React_Custom.Divider()}
        </div>
    )
    
}

export default ClientPane;