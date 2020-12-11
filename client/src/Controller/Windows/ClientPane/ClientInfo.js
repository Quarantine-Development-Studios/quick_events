import React, {useState, useEffect} from 'react';
import qds_Custom, {ReactField, Definitions} from '../../resources/qds_Library/qds_custom.js';
import CC from '../../resources/qds_Library/qds_deps.js';

const ClientInfo = (props) => {
    const rootName = 'ClientInfo'

    const [display, setDisplay] = useState(null);

    
    useEffect(() => {
        if(props.client){
            const newDisplay = [];
            const client = Definitions.Client.createClientByObj(props.client)

            //#region tools
            const decompressKey = (key) => {
                let _key = key.replace(/([A-Z])/g, ' $1').trim();
                return (_key.charAt(0).toUpperCase() + _key.slice(1));
            }
            const updateDB = (e) => {    
                const fieldKey = e.target.attributes['callbackpointer'].value;

                qds_Custom.dbSetValue('clients', props.selectedClient, fieldKey, e.target.value)
                qds_Custom.dbUpdateLinkedInquiries(props.client, fieldKey, e.target.value);
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
                            callbackPointer = {key}
                            inputType = {inputType}

                        />
                    )
                }
            }
            
            setDisplay(newDisplay);
        }
    }, [props])

    //#region Inquiry Handling
    const createInquiry = (e) => {
        let newInquiry = Definitions.Inquiry.createInquiryByClient(props.client);
        qds_Custom.dbInsertEntry('inquiries', newInquiry, linkInquiry)
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
            qds_Custom.dbSetValue('clients', clientID, 'inquiries', newLinkedInquiries);

            //remove from inquiries collection
            qds_Custom.dbRemoveEntry('inquiries', inquiryID);
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
            qds_Custom.dbSetValue('clients', client.id, 'inquiries', newArray);
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
        <>
            {qds_Custom.Divider()}
            <div className={rootName + "-content -AppContent"}>
                <label className={rootName + "-header -header"}>Information:</label>
                <div className="-lightHighlight">
                    {display}
                    {qds_Custom.getButtons(buttonReqs, rootName)}
                </div>
            </div>
        </>
    )
}

export default ClientInfo;