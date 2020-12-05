import React_Custom from '../../../../CustomLibrary/ReactComponent_Custom.js';


const ClientDirectory = (props) => {

    const rootName = 'ClientDirectory';
    

    const getClientAccessors = () => {
        if(props.clients !== undefined && props.clients[0]){    
            const returnData = [];

            if(props.clients[0]){
                for(let ClientIndex = 0; ClientIndex < props.clients.length; ClientIndex++){
                    let isQuery = false;

                    if(props.isSearching && props.searchQuery !== ''){
                        isQuery = testQuery(props.clients[ClientIndex], props.searchQuery);
                    }

                    if(!props.isSearching || isQuery){
                        //get RootClient Label then build children if isPointer
                        let text = props.clients[ClientIndex].name;
                        let dbID = props.clients[ClientIndex].id;
                        let tagMod = '';
                        let isPointer = (dbID === props.selectedClient);
                

                        //if pointer establish extra class name for highlighting
                        if (isPointer) {
                            tagMod = '-pointer';
                            
                            //overwrite
                            const clientLabel = React_Custom.NavLbl(ClientIndex, rootName, text, dbID, selectLbl, tagMod, 'Client', isSelected);
                            
                            //establish root label
                            const inquiryLabels = getInquiryLabels(props.clients[ClientIndex]);
                            
                            //pass 
                            returnData.push(React_Custom.ExpandedNavTree(rootName, clientLabel, inquiryLabels));
                        } else {
                            
                            const clientLabel = React_Custom.NavLbl(ClientIndex, rootName, text, dbID, selectLbl, tagMod, 'Client', isSelected);
                            returnData.push(clientLabel);
                        }
                    }
                }
                return returnData;

            } else {
                return (<label></label>);
            } 
        }
    }

    const testQuery = (dataObj, query) => {
        if(dataObj){
            for(const [key, value] of Object.entries(dataObj)){
                if(value !== '' & typeof value === 'string'){
                    const _value = value.toLowerCase();
                    const _query = query.toLowerCase();

                    if(_value.includes(_query)) {
                        return true;
                    }            
                }
            }
        }
        return false;
    }

    const selectLbl = (event) => {
        let pointer = event.target.attributes['callbackpointer'].value;
        const targetID = event.target.attributes['data-key'].value;
        
        let value = ((props['selected' + pointer] !== targetID) ? targetID : "");

        props['setSelected' + pointer](value);
        if(pointer === 'Client'){
            props['setSelectedInquiry']('')
        }
    }

    const isSelected = (event) => {
        let callbackpointer = event.target.attributes['callbackpointer'].value;
        callbackpointer = callbackpointer.charAt(0).toUpperCase() + callbackpointer.slice(1);

        if(event.target.attributes['data-key'].value !== props['selected' + callbackpointer]){
            event.target.className.replace('-pointer', '');
        }
    }

    const getInquiryLabels = (client) => {
        const inquiryLabels = [];
        const relatedInquiries = React_Custom.getRelatedInquiries(client, props.inquiries);
        const selectedInquiry = props.selectedInquiry;

        if (relatedInquiries) {
            for (let riIndex = 0; riIndex < relatedInquiries.length; riIndex++) {
                const event = relatedInquiries[riIndex];
                const key = riIndex;
                const text = '- ' + event.eventTitle + ' ' +  event.eventDate;
                const dbID = event.id;
                let tagMod = '';

                const isPointer = (dbID === selectedInquiry);

                if (isPointer) {
                    tagMod = '-pointer';
                }

                const newLabel = React_Custom.NavLbl(key, rootName + '-nested', text, dbID, selectLbl, tagMod, 'Inquiry');

                inquiryLabels.push(newLabel);
            }
        }
        return inquiryLabels;
    }


    return (
        <div className="NavPane-content -AppContent">
            {getClientAccessors()}
        </div>
    )
}

export default ClientDirectory;