import React from 'react';
import ReactComponent_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './InquiryDisp.css';
import Inquiry from '../../Definitions/Inquiry.js'

export default class InquiryPane extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {

        }   
        //bind functions
        this.customBinds();
        this.getDisplayContents = this.getDisplayContents.bind(this);
    }


    getDisplayContents(){
        const displayItems = [];
        const inquiry = new Inquiry(this.props.inquiry)
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
                    displayItems.push(this.InfoField(_key, 'InquiryPane', value, this.setValue, 'inquiry', type));
                }
            }
        }

        return (
            <div className="InquiryPane-content">
                {displayItems}
            </div>
        ) 
    }


    render(){
        return (
            <div className="InquiryPane" key="InquiryPane">
                {this.getDisplayContents()}
            </div>
        )
    }
}