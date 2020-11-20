import React from 'react';
import React_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './InquiryDisp.css';
import Inquiry from '../../Definitions/Inquiry.js'

const InquiryPane = (props) => {
    const getDisplayContents = () => {
        const displayItems = [];
        const inquiry = new Inquiry(props.inquiry)
        for(const [key, value] of Object.entries(inquiry.basicInfo)){
            //push a new field for each value !except id (id is the database identifier used internally)
            if(key !== 'id'){
                let _key = key.replace(/([A-Z])/g, ' $1').trim();
                _key = _key.charAt(0).toUpperCase() + _key.slice(1);
                let type = '';

                if(_key.includes('Date')) {
                    type = 'date';
                } else if(_key.includes('Time')){
                    type = 'time';
                }

                if(_key === 'Name' || _key === 'Email' || _key === 'Phone'){
                    
                }else {
                    //pull InfoField from ReactComponent_Custom 
                    displayItems.push(React_Custom.InfoField(_key, 'InquiryPane', value, props.setValue, 'inquiry', type));
                }
            }
        }

        return (
            <div className="InquiryPane-content">
                {displayItems}
            </div>
        ) 
    }


    return (
        <div className="InquiryPane" key="InquiryPane">
            {getDisplayContents()}
        </div>
    )
    
}

export default InquiryPane;