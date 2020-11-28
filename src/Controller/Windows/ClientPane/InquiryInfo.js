import React, {useState, useEffect} from 'react';
import React_Custom, {ReactDresser, ReactDrawer, ReactField} from '../../../CustomLibrary/ReactComponent_Custom.js';
import Inquiry from '../../Definitions/inquiry.js'
import './InquiryInfo.css';

const InquiryInfo = (props) => {
    const rootName = 'InquiryInfo'

    const [displayActual, setDisplayActual] = useState(null);


    //expand/collapse drawer container
    const drawerHandle = (e) => {
        const inquiryID = e.target.attributes['callbackpointer'];
        const value = e.target.innerText;

        switch (value) {
            case '+':
                break;
            default:
                console.log('testing')
        }
        console.log(e)
    }

    const updateDB = (e) => {
        console.log(e)

        const fieldKey = e.target.attributes['callbackpointer'].value;


        React_Custom.dbSetValue('inquiries', props.selectedInquiry, fieldKey, e.target.value)
    }

    const compressKey = (key) => {
        let _key = key.replace(/([A-Z])/g, ' $1').trim();
        return (_key.charAt(0).toUpperCase() + _key.slice(1));
    }

    const filterRelatedInquiries = (inquiries, fieldArray, filterField) => {
        const rInquiries = [];

        if(inquiries && props.client.inquiries){
            for(let i = 0; i < inquiries.length; i++){
                const targetInquiry = inquiries[i];
                const targetInquiries = props.client.inquiries;

                if(targetInquiries.includes(targetInquiry[filterField])){
                    rInquiries.push(targetInquiry);
                }
            }
        }

        return rInquiries;
    }

    const getInquiryFields = (inquiry) => {
        const reactFields = [];
        const _inquiry = new Inquiry(inquiry);

        for(const [key, value] of Object.entries(_inquiry.toJSON())){
            let inputType = '';
            const cKey = compressKey(key);

            if(cKey.toLowerCase().includes('date')){
                inputType = 'date';
            } 
            else if(cKey.toLowerCase().includes('time')){
                inputType = 'time';
            }


            if (cKey !== 'Inquiries' && 
                cKey !== 'Id' && 
                cKey !== 'Name' && 
                cKey !== 'Phone' && 
                cKey !== 'Email') {

                reactFields.push(
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
        return reactFields;
    }

    const buildDrawer = (inquiry, index) => {
        const fields = getInquiryFields(inquiry);

        console.log()

        return (
            <ReactDrawer
                rootName = {rootName}
                labelText = {'Inquiries'}
                onExpand = {() => {}}
                callbackPointer = {inquiry.id}
                contentHtml = {fields}
                drawerNumber = {index}
                isExpanded = {(props.selectedInquiry === inquiry.id)}
            />
        )
    }


    const buildDresser = (inquiries) => {
        if(inquiries){
            const drawers = [];
            
            //push drawer for each inquiry
            for(let i = 0; i < inquiries.length; i++){
                drawers.push(buildDrawer(inquiries[i], i));
            }


            return (
                <ReactDresser
                    rootName = {rootName}
                    title = {'Inquiries'}
                    drawers = {drawers}

                />
            )
        }
    }


    useEffect(() => {
        if(props.inquiries 
            && props.client 
            && props.client.inquiries
            ) {
            const relatedInquiries = filterRelatedInquiries(props.inquiries, props.client.inquiries, 'id');
            const dresser = buildDresser(relatedInquiries);
            setDisplayActual(dresser);
        } else {
            setDisplayActual(null)
        }
    }, [props.selectedInquiry, props.client])



    return (
        <div className={rootName + "-content"}>
            {displayActual}
        </div>
    )
}

export default InquiryInfo;