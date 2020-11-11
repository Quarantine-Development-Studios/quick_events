import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';

export default class ClientDirectory extends ReactComponent_Custom {
    constructor(props){
        super(props)
        this.state = {

        }

        this.customBinds();
        this.selectLbl = this.selectLbl.bind(this)
    }
    

    selectLbl(event){
        const pointer = event.target.attributes['callbackpointer'].value;

        if(pointer === 'client'){
            const targetID = event.target.attributes['data-key'].value
            let value = ((this.props.selectedClient !== targetID) ? targetID : "");

            this.stateHandler('selectedClient', value)
        } else if(pointer === 'inquiry'){
            const targetID = event.target.attributes['data-key'].value
            let value = ((this.props.selectedInquiry !== targetID) ? targetID : "");

            this.stateHandler('selectedInquiry', value)

            console.log('testing inquiry')
            console.log(this.props)
        }
    }


    getClientAccessors(){
        const liveClients = this.props.clients;        
        const returnData = [];

        if(liveClients[0]){
            for(let i = 0; i < liveClients.length; i++){
                const rootName = "ClientDirectory";
                var {isPointer, clientLabel } = this.getClientLabel(i, liveClients, rootName);


                if(isPointer){
                    //check for linked inquiries
                    const linkedInquiriesIDs = liveClients[i].inquiries;
                    const relatedInquiries = this.props.inquiries.filter(inquiry => linkedInquiriesIDs.includes(inquiry.id) )
                    console.log('debug client object');
                    console.log(relatedInquiries);

                    const inquiryLabels = [];
                    
                    for(let i2 = 0; i2 < relatedInquiries.length; i2++){
                        const key = i2;
                        const text = '- ' + relatedInquiries[i2].name;
                        const dbID = relatedInquiries[i2].id;
                        let tagMod = '';
                        const isPointer = (dbID === this.props.selectedInquiry);

                        if (isPointer) {
                            tagMod = '-pointer';
                        }

                        inquiryLabels.push(this.NavLbl(key, rootName + '-nested', text, dbID, this.selectLbl, tagMod, 'inquiry'))
                    }
                    returnData[i] = this.ExpandedNavTree(rootName, clientLabel, inquiryLabels);
                } else {
                    returnData[i] = clientLabel;
                }
            }
            return returnData;

        } else {
            return (<label></label>);
        } 
    }

    getClientLabel(i, liveClients, rootName) {
        let key = i;
        let text = liveClients[i].name;
        let dbID = liveClients[i].id;
        let tagMod = '';
        let isPointer = (dbID === this.props.selectedClient);

        //if pointer establish extra class name for highlighting
        if (isPointer) {
            tagMod = '-pointer';
        }

        //establish root label
        const clientLabel = this.NavLbl(key, rootName, text, dbID, this.selectLbl, tagMod, 'client');
        return { isPointer, clientLabel };
    }

    render(){

        return (
            <div className="navpane-content">
                {
                    this.getClientAccessors()
                }
            </div>
        )
    }
}