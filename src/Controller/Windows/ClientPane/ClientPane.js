import React, { useEffect, useState } from 'react';
import qds_Custom, { Definitions } from '../../resources/qds_Library/qds_custom.js';
import './ClientPane.css';
import CC from '../../resources/qds_Library/qds_deps.js';
import InquiryInfo from './InquiryInfo.js';
import ClientInfo from './ClientInfo.js';

const ClientPane = (props) => {
    const rootName = 'ClientPane';

    const [client, setClient] = useState(props.client);
    const [inquiry, setInquiry] = useState(null);


    

    let inquiryDisp = null;

    useEffect(() => {
        setClient(props.client)
    }, [props.client])

    //check inquiry accurately reflects selected Inquiry on "props.selectedInquiry" change/update
    useEffect(() => {
        if(props.selectedInquiry !== "") {
            const newInquiry = qds_Custom.getEntry(props.inquiries, props.selectedInquiry);
    
            if(inquiry !== newInquiry){
                setInquiry(newInquiry);
            }
        } else {
            if(inquiryDisp){ inquiryDisp = null; }
            if(inquiry) { setInquiry(null) }
        }
    }, [props.selectedInquiry])


    /**
     * this function requires callbackpointer to be set for proper database entry
     * @param {*} event 
     * @attribute callbackpointer {String} nested attribute of target element
     */
    const setValue = (event) => {

        if(event.target.attributes.callbackpointer){
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

            if(dbRootKey && dbKey && fieldKey){
                //lock name, email and phone to linked inquiries
                if(fieldKey === 'name' || fieldKey === 'email' || fieldKey === 'phone'){
                    const dbCRootKey = 'clients';
                    const dbCKey = props.selectedClient;


                    qds_Custom.dbSetValue(dbCRootKey, dbCKey, fieldKey, value); 
                    const client = qds_Custom.getEntry(props.clients, props.selectedClient);

                    if(client){
                        qds_Custom.dbUpdateLinkedInquiries(client, fieldKey, value); 
                    }
                } else {

                    qds_Custom.dbSetValue(dbRootKey, dbKey, fieldKey, value)
                }
            } else {
                console.log( ['improper input : ', {dbRootKey, dbKey, fieldKey, value}] )
            }
        } else {
            console.log('"setValue()" requires "callbackpointer" attribute of element to be set for proper database entry.')
        }
    }

    return (
        <div className={rootName + " App-Window"}>
            {qds_Custom.WindowControlBar("Client")}   

            <ClientInfo
                rootName = {rootName}

                client = {client}
                inquiry = {inquiry}

                selectedClient = {props.selectedClient}

                setValue = {setValue}
                setSelectedInquiry = {props.setSelectedInquiry}
            />
            

            {qds_Custom.Divider()}

            <InquiryInfo
                rootName = {rootName}

                selectedClient = {props.selectedClient}
                client = {props.client}

                inquiries = {props.inquiries}
                selectedInquiry = {props.selectedInquiry}
                
                setValue = {setValue}
            />

            {qds_Custom.Divider()}
        </div>
    )
    
}

export default ClientPane;