import ReactComponent_Custom from '../ReactComponent_Custom.js';



export default class ClientDirectory extends ReactComponent_Custom {
    constructor(props){
        super(props)
        this.state = {
            rootName: 'ClientDirectory',

        }

        this.customBinds();
        this.selectLbl = this.selectLbl.bind(this)
    }
    

    selectLbl(event){
        let pointer = event.target.attributes['callbackpointer'].value;
        const targetID = event.target.attributes['data-key'].value;
        let value = ((this.props['selected' + pointer] !== targetID) ? targetID : "");

        //clear previsou value
        this.stateHandler('selected' + pointer, "")

        //assign new value after everything else has finished to do a proper update and data seperation
        setTimeout(() => {
            this.stateHandler('selected' + pointer, value)
        }, 0);

    }

    getClientAccessors(){
        const liveClients = this.props.clients;        
        const returnData = [];

        if(liveClients[0]){
            for(let ClientIndex = 0; ClientIndex < liveClients.length; ClientIndex++){
                const isSearching = this.props.isSearching;
                const searchQuery = this.props.searchQuery;
                let isQuery = false;

                if(isSearching && searchQuery !== ''){
                    isQuery = this.testQuery(liveClients[ClientIndex], searchQuery);
                }


                if(!isSearching || isQuery){
            
            
                    //get RootClient Label then build children if isPointer
            
                    let text = liveClients[ClientIndex].name;
                    let dbID = liveClients[ClientIndex].id;
                    let tagMod = '';
                    let isPointer = (dbID === this.props.selectedClient);
            
                    let clientLabel = this.NavLbl(ClientIndex, this.state.rootName, text, dbID, this.selectLbl, tagMod, 'Client');

                    //if pointer establish extra class name for highlighting
                    if (isPointer) {
                        tagMod = '-pointer';
                        //overwrite
                        clientLabel = this.NavLbl(ClientIndex, this.state.rootName, text, dbID, this.selectLbl, tagMod, 'Client');
                        //establish root label
                        const inquiryLabels = this.getInquiryLabels();

                        returnData.push(this.ExpandedNavTree(this.state.rootName, clientLabel, inquiryLabels));
                    } else {
                        returnData.push(clientLabel);
                    }
                }
            }
            return returnData;

        } else {
            return (<label></label>);
        } 
    }



    testQuery(dataObj, query){
        for(const [key, value] of Object.entries(dataObj)){
            if(value !== '' && value.includes(query)) {
                return true;
            }            
        }
        return false;
    }

    getInquiryLabels() {
        const inquiryLabels = [];
        const relatedInquiries = this.props.relatedInquiries;
        const selectedInquiry = this.props.selectedInquiry;

        if (relatedInquiries) {
            for (let riIndex = 0; riIndex < relatedInquiries.length; riIndex++) {
                const key = riIndex;
                const text = '- ' + relatedInquiries[riIndex].name;
                const dbID = relatedInquiries[riIndex].id;
                let tagMod = '';

                const isPointer = (dbID === selectedInquiry);

                if (isPointer) {
                    tagMod = '-pointer';
                }

                const newLabel = this.NavLbl(key, this.state.rootName + '-nested', text, dbID, this.selectLbl, tagMod, 'Inquiry');

                inquiryLabels.push(newLabel);
            }
        }
        return inquiryLabels;
    }

    render(){

        return (
            <div className="NavPane-content">
                {
                    this.getClientAccessors()
                }
            </div>
        )
    }
}