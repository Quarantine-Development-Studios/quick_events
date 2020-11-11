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
        }
        
        if(pointer === 'inquiry'){
            const targetID = event.target.attributes['data-key'].value
            let value = (this.props.selectedInquiry !== targetID) ? targetID : "";

            this.stateHandler('selectedInquiry', value)

            console.log('testing inquiry')
            console.log(this.props)
        }
    }


    getClientAccessors(){
        const liveClients = this.props.clients;        
        const returnData = [];

        if(liveClients[0]){
            for(let ClientIndex = 0; ClientIndex < liveClients.length; ClientIndex++){
                const rootName = "ClientDirectory";

                //get RootClient Label then build children if isPointer
                let text = liveClients[ClientIndex].name;
                let dbID = liveClients[ClientIndex].id;
                let tagMod = '';
                let isPointer = (dbID === this.props.selectedClient);
        
                //if pointer establish extra class name for highlighting
                if (isPointer) {
                    tagMod = '-pointer';
                }
        
                //establish root label
                const clientLabel = this.NavLbl(ClientIndex, rootName, text, dbID, this.selectLbl, tagMod, 'client');
                const relatedInquiries = this.props.relatedInquiries;

                if(isPointer && relatedInquiries){
                    console.log('test 1')
                    console.log(relatedInquiries)

                    const inquiryLabels = [];

                    for (let i2 = 0; i2 < relatedInquiries.length; i2++) {
                        const key = i2;
                        const text = '- ' + relatedInquiries[key].name;
                        const dbID = relatedInquiries[key].id;
                        console.log(dbID)
                        let tagMod = '';
                        const isPointer = (dbID === this.props.selectedInquiry);
            
                        if (isPointer) {
                            tagMod = '-pointer';
                        }
            
                        const newLabel = this.NavLbl(key, rootName + '-nested', text, dbID, this.selectLbl, tagMod, 'inquiry');
            
                        inquiryLabels.push(newLabel);
                    }

                    returnData[ClientIndex] = this.ExpandedNavTree(rootName, clientLabel, inquiryLabels);
                } else {
                    returnData[ClientIndex] = clientLabel;
                }
            }
            return returnData;

        } else {
            return (<label></label>);
        } 
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