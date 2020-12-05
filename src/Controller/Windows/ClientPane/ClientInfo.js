import React, {useState, useEffect} from 'react';
import React_Custom, {ReactField, Definitions} from '../../../CustomLibrary/ReactComponent_Custom.js';
import CC from '../../../CustomLibrary/Object_Custom.js';

const ClientInfo = (props) => {
    const rootName = 'ClientInfo'

    const [display, setDisplay] = useState(null);

    
    useEffect(() => {
        const newDisplay = [];
        const client = Definitions.Client.createClientByObj(props.client)

        //#region tools
        const decompressKey = (key) => {
            let _key = key.replace(/([A-Z])/g, ' $1').trim();
            return (_key.charAt(0).toUpperCase() + _key.slice(1));
        }
        const updateDB = (e) => {
            console.log(e)
    
            const fieldKey = e.target.attributes['callbackpointer'].value;
    
            React_Custom.dbSetValue('clients', props.selectedClient, fieldKey, e.target.value)
            React_Custom.dbUpdateLinkedInquiries(props.client, fieldKey, e.target.value);
        }
        //#endregion

        for(const [key, value] of Object.entries(client.toJSON())){
            let inputType = '';
            if(key.includes('date')){
                inputType = 'date';
            } else if(key.includes('time')){
                inputType = 'time';
            }

            if(key !== 'inquiries' && key !== 'id'){
                const cKey = decompressKey(key)
                newDisplay.push(
                    <ReactField
                        rootName = {rootName}
                        labelText = {cKey}
                        value = {value}
                        onSubmit = {updateDB}
                        callbackPointer = {cKey}
                        inputType = {inputType}

                    />
                )
            }
        }
        
        setDisplay(newDisplay);
    }, [props])

    //#region Inquiry Handling
    const createInquiry = (e) => {
        let newInquiry = Definitions.Inquiry.createInquiryByClient(props.client);
        React_Custom.dbInsertEntry('inquiries', newInquiry, linkInquiry)
    }

    const removeInquiry = (e) => {
        const inquiry = props.inquiry;
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

    /**
     * For linking inquiries symbolicaly to their parent Client
     * @param {String} id 
     * 
     */
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

    const buttonReqs = {
        'CreateInquiry': new CC.ButtonReq('CreateInquiry', 'Create Inquiry', createInquiry),
        'RemoveInquiry': new CC.ButtonReq('RemoveInquiry', 'Remove Inquiry', removeInquiry)
    }

    return (
        <div className={rootName + "-content -AppContent"}>
            {display}
            {React_Custom.getButtons(buttonReqs, rootName)}
        </div>
    )

}

export default ClientInfo;