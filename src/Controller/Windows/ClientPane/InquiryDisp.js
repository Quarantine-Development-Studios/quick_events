import React, {useState} from 'react';
import React_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './InquiryDisp.css';
import Inquiry from '../../Definitions/Inquiry.js'

const InquiryPane = (props) => {
    const rootName = 'InquiryPane';
    const [processedInquiries, setProcessedInquiries] = useState({})

    const basicInquiry = new Inquiry(props.inquiry).basicInfo;

    const compressKey = (key) => {
        let _key = key.replace(/([A-Z])/g, ' $1').trim();
        return (_key.charAt(0).toUpperCase() + _key.slice(1));
    }

    const drawerHandle = (e) => {
        const inquiryID = e.target.attributes['callbackpointer'];
        const value = e.target;
    }

    const getInquiryFields = (inquiry) => { //returns array of InfoFields for provided inquiry
        const fields = [];

        if(inquiry){
            //get proper format and data alignment
            const _inquiry = new Inquiry(inquiry).basicInfo;
            for(const [key, value] of Object.entries(_inquiry)){
                if(key !== 'id'){
                    const cKey = compressKey(key);
                    let type = '';
                    if(cKey.includes('Date')) {
                        type = 'date';
                    } else if(cKey.includes('Time')){
                        type = 'time';
                    }

                    if(cKey !== 'Name' && cKey !== 'Email' && cKey !== 'Phone'){
                        fields.push( 
                            React_Custom.InfoField(
                                cKey, //key
                                rootName,           //rootName
                                value,              //default Value
                                props.setValue,     //callback
                                'inquiry',          //dbCallBackPointer
                                type                //fieldType
                            )
                        );
                    }
                }
            }
        }
        return fields;
    }

    const getInquiryDrawers = (inquiries) => {
        const drawers = [];

        if(inquiries && props.client.inquiries){
            for(let i = 0; i < inquiries.length; i++){
                const targetInquiry = inquiries[i];
                const targetInquiries = props.client.inquiries;

                console.log('inquiry ' + i)
                if(targetInquiries.includes(targetInquiry.id)){
                    const processedInquiryFields = getInquiryFields(targetInquiry);

                    drawers.push(
                        React_Custom.ReactDrawer(
                            'InquiryPane-entry', 
                            targetInquiry.eventTitle, 
                            processedInquiryFields,
                            (targetInquiry.id === props.selectedInquiry),
                            drawerHandle,
                            targetInquiry.id
                            )
                    )
                }
            }
        return drawers;
        }
    }

    const buildDresser = (inquiries) => {
        const drawers = getInquiryDrawers(inquiries);
        return React_Custom.ReactDresser(rootName, 'Inquiries', drawers);
    }



    return (
        <div className="InquiryPane" key="InquiryPane">
            {buildDresser(props.inquiries)}
        </div>
    )
}

export default InquiryPane;